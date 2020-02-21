import React, { useState } from "react";

// note that you can also export the source data via CountryRegionData. It's in a deliberately concise format to
// keep file size down
import {
  CountryDropdown,
  RegionDropdown,
  CountryRegionData
} from "react-country-region-selector";
const RegionSelect = () => {
  const [country, setCountry] = useState();
  const [region, setRegion] = useState();

  const selectCountry = val => {
    this.setState({ country: val });
  };

  const selectRegion = val => {
    this.setState({ region: val });
  };
  return (
    <div>
      <CountryDropdown
        value={country}
        onChange={val => this.selectCountry(val)}
      />
      <RegionDropdown
        country={country}
        value={region}
        onChange={val => this.selectRegion(val)}
      />
    </div>
  );
};
export default RegionSelect;
