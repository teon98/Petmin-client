import React from "react";
import "../styles/common/TextInputStyle.css";

function TextInputComponent({
  lable = {},
  value = {},
  onChange = {},
  placeholder = {},
}) {
  return (
    <div className="textInputContainer">
      <p className="textInputLable">{lable}</p>
      <input
        className="textInputValue"
        onChange={(e) => onChange(e.target.value)}
        value={value}
        placeholder={placeholder}
      />
    </div>
  );
}

export default TextInputComponent;
