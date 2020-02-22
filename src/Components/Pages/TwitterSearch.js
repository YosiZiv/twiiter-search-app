import React, { useState } from "react";
import "./TwitterSearch.css";
import TextInput from "../Layout/TextInput";
import DatePickerComponent from "../Layout/DatePicker";
import SelectInput from "../Layout/SelectInput";
import Button from "../Layout/Button";

const TwitterSearchPage = ({ languages }) => {
  const date = new Date();
  const [searchTwitterForm, setSearchTwitterForm] = useState({});
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
  console.log(searchTwitterForm);

  return (
    <div className='twitterPageContainer'>
      <div className='twitterPageTitle'>
        <h4 className='m-2 text-center'>Twitter Search App</h4>
      </div>

      <form className='formContainer'>
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
          <Button text='Search' />
        </div>
      </form>
    </div>
  );
};
export default TwitterSearchPage;
