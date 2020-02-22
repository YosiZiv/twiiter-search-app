import React from "react";
import "./Button.css";
const Button = ({ color, text, onClickHandler }) => (
  <button style={color} className='button' onClick={onClickHandler}>
    {text}
  </button>
);
export default Button;
