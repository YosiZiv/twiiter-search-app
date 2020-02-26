import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./DatePicker.css";
const DatePickerComponent = ({
  handleTimeChange,
  date,
  minDate,
  maxDate,
  id,
  label
}) => (
  <div className='datePickerContainer'>
    <label className='textLabel'>{label} :</label>
    <div className='datePicker'>
      <DatePicker
        minDate={minDate}
        maxDate={maxDate}
        dateFormat='yyyy/MM/dd'
        id={id}
        selected={date}
        onChange={handleTimeChange}
      />
    </div>
  </div>
);
export default DatePickerComponent;
