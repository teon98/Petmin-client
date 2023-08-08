import React from "react";
import "../styles/RadioComponentStyle.css";

function RadioComponent({ options, selectedValue, onChange, lable }) {
  return (
    <div>
      <p className="textInputLable">{lable}</p>
      {options.map((option) => (
        <label
          key={option.value}
          className={`radioBox ${
            selectedValue === option.value ? "active" : ""
          }`}
        >
          <input
            type="radio"
            name={option.name}
            value={option.value}
            checked={selectedValue === option.value}
            onChange={onChange}
          />
          {option.label}
        </label>
      ))}
    </div>
  );
}

export default RadioComponent;
