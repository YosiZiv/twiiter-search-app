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
const TwitterSearchPage = ({ languages }) => {
  const dateRange = {
    minDate: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
    maxDate: new Date()
  };
  const [searchTwitterForm, setSearchTwitterForm] = useState({
    startDate: dateRange.minDate
  }); // init initialize form
  const [tweets, setTweets] = useState([]);
  const [noResult, setNoResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleInputChange = (event, validation) => {
    const { id, value } = event.target;

    const errorsMessage = checkValidity(id, value, validation);
    return setSearchTwitterForm({
      ...searchTwitterForm,
      [id]: { errorsMessage, value, isTouch: true }
    });
  };
  const handleTimeChange = (date, id) =>
    setSearchTwitterForm({ ...searchTwitterForm, [id]: date });

  const handleTweetSearch = async () => {
    const payload = {
      hashtag: searchTwitterForm.hashtag,
      startDate: formatDateForQuery(searchTwitterForm.startDate),
      endDate: searchTwitterForm["endDate"]
        ? formatDateForQuery(searchTwitterForm.endDate)
        : null,
      reqData: ["id_str", "text", "user", "created_at", "retweet_count"],
      language: searchTwitterForm.language
    };
    const request = {
      url: "tweeter/tweets",
      method: "POST",
      payload
    };
    try {
      setLoading(true);
      const response = await api(request);
      const { filteredTweets } = response["data"];
      if (filteredTweets.length) {
        setLoading(false);
        return setTweets(filteredTweets);
      } else {
        setLoading(false);
        setTweets([]);
        return setNoResult(true);
      }
    } catch (err) {
      throw err;
    }
  };
  const handleTweetSelect = tweet => {
    const tweetDom = document.getElementById("embedTweet");
    if (typeof tweet["id_str"] === "string") {
      tweetDom.innerHTML = "";
      return window.twttr.widgets.createTweet(tweet["id_str"], tweetDom, {
        theme: "dark"
      });
    }
    return;
  };
  const languageChangeHandler = lang => {
    console.log(lang);

    setSearchTwitterForm({ ...searchTwitterForm, ["language"]: lang.value });
  };
  const createTweetsTable = tweets => {
    return tweets.map(tweet => {
      const tdArray = []; // IMPORTENT  CODE LINE 19 -40 NEED REFACTORED OUTSIDE OF THE VIEW
      for (let key in tweet) {
        switch (key) {
          case "user":
            tdArray[0] = <td key={tweet[key]}>{tweet[key]}</td>;
            break;
          case "created_at":
            tdArray[1] = (
              <td key={tweet[key]}>{formatDateForQuery(tweet[key])}</td>
            );
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
      return (
        <tr key={tweet["id_str"]} onClick={() => handleTweetSelect(tweet)}>
          {[...tdArray]}
        </tr>
      );
    });
  };
  const {
    hashtag = "",
    startDate,
    endDate = null,
    language = null
  } = searchTwitterForm;

  return (
    <div className='twitterPageContainer'>
      <div className='twitterPageTitle'>
        <h4>Twitter Search App</h4>
        <div className='logoWrapper'>
          <img src={twitterLogo} />
        </div>
      </div>
      <div className='formContainer'>
        <form className='searchTweetsForm' onSubmit={e => e.preventDefault()}>
          <div className='hashtagInputContainer'>
            <TextInput
              errorsMessage={hashtag.errorsMessage}
              isTouch={hashtag ? hashtag.isTouch : false}
              validation={{ isRequired: true, minLength: 1 }}
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
          <div className='tableContainer'>
            <Table
              formatDateForQuery={formatDateForQuery}
              createTweetsTable={createTweetsTable}
              onClick={handleTweetSelect}
              tweets={tweets}
            />
          </div>
          <div className='embedTweetWrapper'>
            <div className='embedTweet' id='embedTweet'></div>
          </div>
        </div>
      ) : noResult ? (
        <div className='noTweets'>
          <p>
            Sorry no Tweets found try use other tags or remove date and language
            filter{" "}
          </p>
        </div>
      ) : null}
      {loading && (
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <h1>LOADING..... PLEASE WAIT</h1>
        </div>
      )}
    </div>
  );
};
export default TwitterSearchPage;
