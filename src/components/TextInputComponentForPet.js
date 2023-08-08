import React from "react";
import "../styles/common/TextInputStyleForPet.css";

function TextInputComponentForPet({
  lable = {},
  value = {},
  onChange = {},
  placeholder = {},
  type = {},
  message = "",
}) {
  return (
    <div className="textInputContainer">
      <div id="formargin">
        <p className="textInputLable">{lable}</p>
        <input
          className="textInputValue"
          onChange={(e) => onChange(e)}
          value={value}
          placeholder={placeholder}
          type={type}
        />
      </div>
      <p className="emailValidText">{message}</p>
    </div>
  );
}

export default TextInputComponentForPet;
