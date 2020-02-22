import React, { useState } from "react";
import "./TwitterSearch.css";
import TextInput from "../Layout/TextInput";
import DatePickerComponent from "../Layout/DatePicker";
import SelectInput from "../Layout/SelectInput";
import Button from "../Layout/Button";
import Table from "../Layout/Table";
import { api } from "../../api";
const TwitterSearchPage = ({ languages }) => {
  const date = new Date();
  const [searchTwitterForm, setSearchTwitterForm] = useState({});
  const [tweets, setTweets] = useState(null);
  // const [initDate, setInitDate] = useState(new Date());
  const {
    hashtags = "",
    startDate = date.setDate(date.getDate() - 7),
    endDate = null,
    lang = null
  } = searchTwitterForm;
  const handleInputChange = e => {
    const {
      target: { id, value }
    } = e;
    return setSearchTwitterForm({ ...searchTwitterForm, [id]: value });
  };
  const handleTimeChange = (date, id) => {
    console.log("function work 2 ", date, id);

    setSearchTwitterForm({ ...searchTwitterForm, [id]: date });
  };
  console.log(hashtags);
  const handleTweetSearch = async () => {
    const method = "POST";
    const url = `tweeter/tweets`;
    const request = {
      url,
      method,
      payload: searchTwitterForm
    };
    try {
      const response = await api(request);
      console.log(response.data);
      const { filteredTweets } = response["data"];
      if (filteredTweets.length) {
        return setTweets(filteredTweets);
      } else {
        return setTweets("Couldnt found any tweets");
      }
    } catch (err) {
      console.log(err);
    }
  };
  console.log(tweets);

  return (
    <div className='twitterPageContainer'>
      <div className='twitterPageTitle'>
        <h4 className='m-2 text-center'>Twitter Search App</h4>
      </div>

      <form className='formContainer' onSubmit={e => e.preventDefault()}>
        <div>
          <TextInput
            handleInputChange={handleInputChange}
            id='hashtags'
            type='text'
            defaultValue={hashtags}
          />
        </div>

        <div className='d-flex'>
          <DatePickerComponent
            id='startDate'
            handleTimeChange={date => handleTimeChange(date, "startDate")}
            date={startDate}
          />
          <DatePickerComponent
            id='endDate'
            handleTimeChange={date => handleTimeChange(date, "startDate")}
            date={endDate}
          />
        </div>
        <div>
          <SelectInput languages={languages} />
        </div>
        <div className='buttonContainer'>
          <Button onClick={handleTweetSearch} text='Search' />
        </div>
      </form>

      {tweets && (
        <div className='tableContainer'>
          <Table />
        </div>
      )}
    </div>
  );
};
export default TwitterSearchPage;
