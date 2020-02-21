import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./DatePicker.css";
const DatePickerComponent = ({ handleTimeChange, date, id }) => (
  <div>
    <h6>
      <label className='m-0'>{id}</label>
    </h6>
    <div className='datePicker'>
      <DatePicker
        dateFormat='yyyy/MM/dd'
        id={id}
        selected={date}
        onChange={handleTimeChange}
      />
    </div>
  </div>
);
export default DatePickerComponent;
