import React from "react";

import "./EmbedTweet.css";
const EmbedTweet = ({ selectedTweet }) => {
  return (
    <div className='embedTweetWrapper'>
      <div className='embedTweet' id='embedTweet'></div>
    </div>
  );
};
export default EmbedTweet;
