import React from "react";
import "../styles/QuestionComponentStyle.css";

function QuestionComponent({
  options,
  selectedValue,
  onChange,
  questionNumber,
  questionText1,
  questionText2,
}) {
  return (
    <div>
      <p className="questionNumber">{questionNumber}</p>
      <p className="questionText">
        {questionText1}
        <br />
        {questionText2}
      </p>
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

export default QuestionComponent;
