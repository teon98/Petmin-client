import React from "react";
import "../styles/common/TextInputStyleForPet.css";

function TextInputComponentForPet({
  lable = {},
  value = {},
  onChange = {},
  placeholder = "",
  type = {},
  message = "",
}) {
  const isAge = lable === "나이";
  const isWeight = lable === "몸무게";
  return (
    <div className="textInputContainer">
      <div id={isAge || isWeight ? "formargin2" : "formargin"}>
        <p className="textInputLable">{lable}</p>
        <input
          className="textInputValue"
          onChange={(e) => onChange(e)}
          value={value}
          placeholder={placeholder}
          type={type}
        />
        {isAge && <p className="textInputLable">살</p>}
        {isWeight && <p className="textInputLable">KG</p>}
      </div>
      <p className="emailValidText">{message}</p>
    </div>
  );
}

export default TextInputComponentForPet;
