import React, { useState } from "react";
import Select from "react-select";

const SelectInput = ({ languages }) => {
  const selectCountry = val => {
    this.setState({ country: val });
  };

  const selectRegion = val => {
    this.setState({ region: val });
  };
  return <Select options={languages} />;
};
export default SelectInput;
