import React from "react";
import "./Button.css";
const Button = ({ text, onClick, loading }) => (
  <button disabled={loading} className='button' onClick={onClick}>
    {text}
  </button>
);
export default Button;
