import React, { useState } from "react";
import Select from "react-select";
import languageJson from "../../assets/leng.json";
const SelectInput = () => {
  const language = JSON.parse(JSON.stringify(languageJson));
  const test = Object.values(language);
  console.log(test);

  const selectCountry = val => {
    this.setState({ country: val });
  };

  const selectRegion = val => {
    this.setState({ region: val });
  };
  return (
    <div>
      <Select options={test} />
    </div>
  );
};
export default SelectInput;
