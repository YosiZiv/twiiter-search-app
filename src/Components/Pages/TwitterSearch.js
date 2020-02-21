import React, { useState } from "react";
import "./TwitterSearch.css";
import TextInput from "../Layout/TextInput";
import DatePickerComponent from "../Layout/DatePicker";
import RegionSelect from "../Layout/RegionSelect";
const TwitterSearchPage = () => {
  const date = new Date();
  const [searchTwitterForm, setSearchTwitterForm] = useState({});
  // const [initDate, setInitDate] = useState(new Date());
  const {
    hashtags = "",
    startDate = date.setDate(date.getDate() - 7),
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
  console.log(searchTwitterForm["startDate"]);

  return (
    <div className='w-100 h-100'>
      <h4 className='m-2 text-center'>Twitter Search App</h4>
      <form>
        <TextInput
          handleInputChange={handleInputChange}
          id='hashtags'
          type='text'
          defaultValue={hashtags}
        />
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

        <RegionSelect />
      </form>
    </div>
  );
};
export default TwitterSearchPage;
