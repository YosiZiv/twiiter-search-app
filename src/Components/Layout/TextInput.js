import React from "react";
import "./TextInput.css";
const TextInput = ({
  id,
  label,
  placeholder,
  value,
  onChange,
  errorsMessage = null,
  required = false,
  isTouch = false
}) => {
  let className;
  className = `form-control`.concat(errorsMessage && isTouch ? ` invalid` : ``);
  console.log(className, errorsMessage, isTouch);

  return (
    <div className='inputwrapper'>
      <label className='textLabel'>
        {required && <span className='text-danger'>*</span>} {label} :
      </label>
      <input
        autoComplete='off'
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={className}
      />
      <div className='text-input-error-message'>
        {errorsMessage && (
          <small className='text-danger'>{errorsMessage}</small>
        )}
      </div>
    </div>
  );
};
export default TextInput;
