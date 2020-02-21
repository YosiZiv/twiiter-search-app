import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DatePickerComponent = ({ startDate, handleTimeChange, id }) => (
  <div>
    <DatePicker id={id} selected={startDate} onChange={handleTimeChange} />
  </div>
);
export default DatePickerComponent;
