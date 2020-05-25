import React from 'react';

const FormGroup = ({
  className,
  htmlFor,
  label,
  type,
  placeholder = undefined,
  minlength = undefined,
  inputChange,
  value = undefined,
  name = undefined,
}) => {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="form__label">
        {label}
      </label>
      <input
        name={name}
        onChange={inputChange}
        type={type}
        className="form__input"
        placeholder={placeholder}
        minLength={minlength}
        value={value}
        required
      />
    </div>
  );
};

export default FormGroup;
