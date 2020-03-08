import React, { useState } from "react";
import "./TwitterSearch.css";
import TextInput from "../Layout/TextInput";
import DatePickerComponent from "../Layout/DatePicker";
import SelectInput from "../Layout/SelectInput";
import Button from "../Layout/Button";
import Table from "../Layout/Table";
import { api } from "../../httpConfig";
import twitterLogo from "../../assets/twitter-logo.png";
import { checkValidity, formatDateForQuery } from "../../shared/utility";
import Spinner from "../Layout/Spinner";
import EmbedTweet from "../Layout/EmbedTweet";

const TwitterSearchPage = ({ languages }) => {
  const dateRange = {
    minDate: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
    maxDate: new Date()
  };
  const [searchTwitterForm, setSearchTwitterForm] = useState({
    hashtag: {
      value: "",
      errorsMessage: null,
      validation: { isRequired: true, minLength: 1 },
      isTouch: false
    },
    startDate: dateRange.minDate,
    endDate: dateRange.maxDate,
    language: ""
  }); // init initialize form
  const [tweets, setTweets] = useState([]); // init return tweets from api defualt empty array
  const [noResult, setNoResult] = useState(false); // for ui boolean control
  const [loading, setLoading] = useState(false); // loading controller
  const [tweetSelect, setTweetSelect] = useState(false);
  const handleInputChange = (event, validation) => {
    const { id, value } = event.target;

    const errorsMessage = checkValidity(id, value, validation);
    return setSearchTwitterForm({
      ...searchTwitterForm,
      [id]: { errorsMessage, value, isTouch: true, validation }
    });
  };
  const handleTimeChange = (date, id) =>
    setSearchTwitterForm({ ...searchTwitterForm, [id]: date });

  const handleTweetSearch = async () => {
    const { hashtag, startDate, endDate, language } = searchTwitterForm;
    console.log(hashtag);

    const errorsMessage = checkValidity(
      "hashtag",
      hashtag.value,
      hashtag.validation
    );
    console.log(errorsMessage);
    if (errorsMessage) {
      return setSearchTwitterForm({
        ...searchTwitterForm,
        hashtag: { ...hashtag, errorsMessage }
      });
    }
    const params = {
      hashtag: hashtag.value,
      startDate: formatDateForQuery(startDate),
      endDate: formatDateForQuery(endDate),
      filters: ["id_str", "text", "user", "created_at", "retweet_count"]
    };
    if (language.length) {
      params.language = language;
    }
    const request = {
      url: "tweeter/hashtag",
      method: "GET",
      params
    };
    try {
      setLoading(true);
      setTweets([]);
      setNoResult(false);
      const response = await api(request);
      const { tweets } = response["data"];
      console.log("what is filter ", tweets);
      if (tweets.length) {
        setTweets(tweets);
        setLoading(false);
      } else {
        setTweets([]);
        setNoResult(true);
        setLoading(false);
      }
    } catch (err) {
      setTweets([]);
      setLoading(false);
      setNoResult(true);
      console.log(err);
      throw err;
    }
  };
  const handleTweetSelect = tweet => {
    const tweetDom = document.getElementById("embedTweet");
    if (typeof tweet["id_str"] === "string") {
      tweetDom.innerHTML = "";
      setTweetSelect(true);
      return window.twttr.widgets.createTweet(tweet["id_str"], tweetDom, {
        theme: "dark"
      });
    }
  };
  const handleTweetClose = () => {
    document.getElementById("embedTweet").innerHTML = "";
    setTweetSelect(false);
  };
  const languageChangeHandler = lang =>
    setSearchTwitterForm({ ...searchTwitterForm, language: lang.value });

  const createTweetsTable = tweets => {
    // CREATE AND ORDER TABLE ROW FUNCTION
    return tweets.map(tweet => {
      const tdArray = [];
      for (let key in tweet) {
        switch (key) {
          case "user":
            tdArray[0] = <td key={tweet[key]}>{tweet[key]}</td>;
            break;
          case "created_at":
            tdArray[1] = (
              <td key={tweet[key]}>{formatDateForQuery(tweet[key])}</td>
            );
            break;
          case "text":
            tdArray[2] = <td key={tweet[key]}>{tweet[key]}</td>;
            break;
          case "retweet_count":
            tdArray[3] = <td key={tweet[key]}>{tweet[key]}</td>;
            break;
          default:
            break;
        }
      }
      // RETURN EVERY TWEET AS A ROW OF DATA
      return (
        <tr key={tweet["id_str"]} onClick={() => handleTweetSelect(tweet)}>
          {[...tdArray]}
        </tr>
      );
    });
  };
  const { hashtag, startDate, endDate } = searchTwitterForm;
  return (
    <>
      <div className='twitterPageTitle'>
        <h4>Twitter Search App</h4>
        <div className='logoWrapper'>
          <img src={twitterLogo} alt='twitter-logo' />
        </div>
      </div>
      <div className='formContainer'>
        <form className='searchTweetsForm' onSubmit={e => e.preventDefault()}>
          <div className='hashtagInputContainer'>
            <TextInput
              errorsMessage={hashtag.errorsMessage}
              isTouch={hashtag ? hashtag.isTouch : false}
              validation={hashtag.validation}
              onChange={event =>
                handleInputChange(event, { isRequired: true, minLength: 1 })
              }
              label='Hashtag'
              placeholder='#'
              id='hashtag'
              type='text'
              value={hashtag && hashtag.value}
            />
          </div>
          <div className='dateContainer'>
            <DatePickerComponent
              minDate={dateRange.minDate}
              maxDate={endDate ? endDate : dateRange.maxDate}
              label='Start Date'
              id='startDate'
              handleTimeChange={date => handleTimeChange(date, "startDate")}
              date={startDate}
            />
            <DatePickerComponent
              minDate={startDate ? startDate : dateRange.minDate}
              maxDate={dateRange.maxDate}
              label='End Date'
              id='endDate'
              handleTimeChange={date => handleTimeChange(date, "endDate")}
              date={endDate}
            />
          </div>
          <div className='selectContainer'>
            <div className='selectLang'>
              <SelectInput
                label='Language'
                languageChangeHandler={languageChangeHandler}
                languages={languages}
              />
            </div>
            <div className='buttonContainer'>
              <Button
                loading={loading}
                onClick={handleTweetSearch}
                text='Search'
              />
            </div>
          </div>
        </form>
      </div>

      {tweets.length ? (
        <div className='tweetsContainer'>
          <EmbedTweet
            handleTweetClose={handleTweetClose}
            tweetSelect={tweetSelect}
          />
          <div className='tableContainer'>
            <Table
              formatDateForQuery={formatDateForQuery}
              createTweetsTable={createTweetsTable}
              onClick={handleTweetSelect}
              tweets={tweets}
            />
          </div>
        </div>
      ) : noResult ? (
        <div className='noTweets'>
          <p>No Tweets Found Try Use Other Tags And Remove Filters</p>
        </div>
      ) : null}
      {loading && (
        <div className='spinnerContainer'>
          <div className='spinnerWrapper'>
            <Spinner />
          </div>
        </div>
      )}
    </>
  );
};
export default TwitterSearchPage;
