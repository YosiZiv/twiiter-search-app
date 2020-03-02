import React, { useState, useEffect } from "react";
import TwitterSearhPage from "./Components/Pages/TwitterSearch";
import languageJson from "./assets/leng.json";
import "./App.css";

function App() {
  const [languages, setLanguages] = useState([]); // languages for select component

  // THIS USE EFFECT RUN ONCE ON APP BOOTSTRAP FOR PARSE LANG
  useEffect(() => {
    const languagesParse = JSON.parse(JSON.stringify(languageJson));
    setLanguages(languagesParse);
  }, []);
  return (
    <div className='appContainer'>
      <TwitterSearhPage languages={languages} />
    </div>
  );
}

export default App;
