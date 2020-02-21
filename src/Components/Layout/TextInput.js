import React from "react";

const TextInput = props => {
  const {
    id,
    type,
    name,
    required,
    defaultValue,
    disabled,
    error,
    handleInputChange
  } = props;

  return (
    <div className='text-input-container'>
      <h6>
        <strong>
          {id} {required && <span className='text-danger'>*</span>}
        </strong>
      </h6>
      <input
        id={id}
        type={type}
        value={defaultValue}
        disabled={disabled}
        onChange={handleInputChange}
        placeholder={`Enter ${name}`}
        autoComplete='off'
        className='form-control'
      />
      <div className='text-input-error-message'>
        {error && <small className='text-danger'>{error}</small>}
      </div>
    </div>
  );
};
export default TextInput;
