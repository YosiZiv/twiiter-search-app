import React, { useState, useEffect } from "react";
import TwitterSearhPage from "./Components/Pages/TwitterSearch";
import languageJson from "./assets/leng.json";
import "./App.css";

function App() {
  const [languages, setLanguages] = useState([]); // languages for select component

  useEffect(() => {
    const languagesParsh = JSON.parse(JSON.stringify(languageJson));
    console.log(languagesParsh);
    setLanguages(languagesParsh);
  }, []);
  console.log(languages);
  return (
    <div className='appContainer'>
      <TwitterSearhPage languages={languages} />
    </div>
  );
}

export default App;

// const languageArray = JSON.parse(JSON.stringify(languageJson));
// // select component expect Array as input this method return array
// // console.log(languagesObject);
// // const languageArray = Object.values(languagesObject);
// setLanguages(languageArray);
