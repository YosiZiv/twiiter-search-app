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
    <div className='mb-1'>
      <h6>
        <label className='m-0'>
          {id}: {required && <span className='text-danger'>*</span>}
        </label>
      </h6>
      <input
        id={id}
        type={type}
        value={defaultValue}
        disabled={disabled}
        onChange={handleInputChange}
        placeholder={`Enter ${id}`}
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
