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
    <div className="textInputContainer2">
      <div id={isAge || isWeight ? "formargin2" : "formargin3"}>
        <p className="textInputLable">{lable}</p>
        <input
          className="textInputValue2"
          onChange={(e) => onChange(e)}
          value={value}
          placeholder={placeholder}
          type={type}
        />
        {isAge && <p className="textInputLable2">살</p>}
        {isWeight && <p className="textInputLable2">KG</p>}
      </div>
      <p className="emailValidText2">{message}</p>
    </div>
  );
}

export default TextInputComponentForPet;
