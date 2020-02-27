import React, { useState } from "react";
import Select from "react-select";

const SelectInput = ({ languages, languageChangeHandler, label }) => {
  return (
    <>
      <label className='textLabel'>{label} :</label>
      <Select onChange={languageChangeHandler} options={languages} />
    </>
  );
};

export default SelectInput;
