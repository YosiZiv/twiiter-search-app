import React from "react";

import "./EmbedTweet.css";
const EmbedTweet = ({ handleTweetClose, tweetSelect }) => {
  return (
    <div onClick={handleTweetClose} className='embedTweetWrapper'>
      <button
        onClick={handleTweetClose}
        style={{ opacity: tweetSelect ? 1 : 0 }}
        type='button'
        className='close closeTweet'
        aria-label='Close'
      >
        <span aria-hidden='true'>&times;</span>
      </button>
      <div className='embedTweet' id='embedTweet'></div>
    </div>
  );
};
export default EmbedTweet;
