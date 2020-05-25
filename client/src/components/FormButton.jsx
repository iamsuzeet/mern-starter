import React from 'react';

const FormButton = ({ className, buttonText, btnClass }) => {
  return (
    <div className={className}>
      <button className={btnClass}>{buttonText}</button>
    </div>
  );
};

export default FormButton;
