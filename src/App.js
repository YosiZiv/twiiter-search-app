import React, { useState, useEffect } from "react";
import TwitterSearhPage from "./Components/Pages/TwitterSearch";
import languageJson from "./assets/leng.json";
import "./App.css";

function App() {
  const [languages, setLanguages] = useState(null); // languages for select component

  useEffect(() => {
    const languagesObject = JSON.parse(JSON.stringify(languageJson));
    const languageArray = Object.values(languagesObject); // select component expect Array as input this method return array
    setLanguages(languageArray);
  }, []);

  return (
    <div className='appContainer'>
      <TwitterSearhPage languages={languages} />
    </div>
  );
}

export default App;
