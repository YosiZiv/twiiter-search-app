import React, { useState } from "react";
import "./TwitterSearch.css";
import TextInput from "../Layout/TextInput";
const TwitterSearchPage = props => {
  const [searchTwitterForm, setSearchTwitterForm] = useState({});
  const {
    hashtags = "",
    startDate = null,
    endDate = null,
    lang = "en"
  } = searchTwitterForm;
  const handleInputChange = e => {
    const {
      target: { id, value }
    } = e;
    console.log("function work", e.target.id);
    return setSearchTwitterForm({ ...searchTwitterForm, [id]: value });
  };

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
      </form>
    </div>
  );
};
export default TwitterSearchPage;
