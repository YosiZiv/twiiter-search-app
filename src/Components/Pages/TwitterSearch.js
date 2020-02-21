import React, { useState } from "react";
import "./TwitterSearch.css";
import TextInput from "../Layout/TextInput";
import DatePickerComponent from "../Layout/DatePicker";
const TwitterSearchPage = props => {
  const [searchTwitterForm, setSearchTwitterForm] = useState({});
  //   const [startDate, setStartDate] = useState(new Date());
  const {
    hashtags = "",
    startDate = null,
    endDate = null,
    lang = "en"
  } = searchTwitterForm;
  console.log(startDate);
  const handleInputChange = e => {
    const {
      target: { id, value }
    } = e;
    console.log("function work", e.target.id);
    return setSearchTwitterForm({ ...searchTwitterForm, [id]: value });
  };
  const handleTimeChange = (date, id) => {
    console.log("function work 2 ", date, id);

    setSearchTwitterForm({ ...searchTwitterForm, [id]: date });
  };
  console.log(searchTwitterForm);

  return (
    <div className='w-100'>
      <div className='row d-flex justify'>
        <div className='mt-5 d-flex '>
          <h1 className='text-center'>Twitter Search App</h1>
        </div>
      </div>
      <form>
        <div>
          <TextInput
            handleInputChange={handleInputChange}
            id='hashtags'
            type='text'
            defaultValue={hashtags}
          />
        </div>
        <div>
          <DatePickerComponent
            id='startDate'
            handleTimeChange={date => handleTimeChange(date, "startDate")}
          />
        </div>
        <div>
          <DatePickerComponent
            id='endDate'
            handleTimeChange={date => handleTimeChange(date, "endDate")}
          />
        </div>
      </form>
    </div>
  );
};
export default TwitterSearchPage;
