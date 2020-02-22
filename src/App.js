import React, { useState, useEffect } from "react";
import TwitterSearhPage from "./Components/Pages/TwitterSearch";
import languageJson from "./assets/leng.json";
import "./App.css";

function App() {
  const [languages, setLanguages] = useState(null);

  useEffect(() => {
    console.log("TEST FOR GIT");
    const languageObject = JSON.parse(JSON.stringify(languageJson));
    const languageArray = Object.values(languageObject);
    setLanguages(languageArray);
  }, []);

  return (
    <div className='container'>
      <TwitterSearhPage languages={languages} />
    </div>
  );
}

export default App;
