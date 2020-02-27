import React from "react";
import "./Button.css";
const Button = ({ color, text, onClick, loading }) => (
  <button disabled={loading} style={color} className='button' onClick={onClick}>
    {text}
  </button>
);
export default Button;
