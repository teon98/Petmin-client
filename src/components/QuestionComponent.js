import React from "react";
import "../styles/QuestionComponentStyle.css";
import { useLocation } from "react-router";

function QuestionComponent({
  options,
  selectedValue,
  onChange,
  questionNumber,
  questionText1,
  questionText2,
  value,
  placeholder,
  fullAddress,
  userName,
}) {
  const location = useLocation();
  const pathname = location.pathname;

  const isCare =
    pathname === "/careRequest1" ||
    pathname === "/careRequest2" ||
    pathname === "/careRequest3";
  const isTextArea =
    pathname === "/petvaccine3" || pathname === "/pettendency6";
  return (
    <div>
      <p className="questionNumber">{questionNumber}</p>
      {isCare ? (
        <p className="careInfoText">
          {fullAddress}
          <span className="pinkColor">{userName}</span> 돌보미님
        </p>
      ) : (
        <p className="questionText1">{questionText1}</p>
      )}

      <p className="questionText2">{questionText2}</p>
      {isTextArea ? (
        <div>
          <textarea
            className="petIntro"
            placeholder={placeholder}
            rows={4}
            value={value}
            onChange={onChange}
          />
        </div>
      ) : (
        options.map((option) => (
          <label
            key={option.value}
            className={`radioBox2 ${
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
        ))
      )}
    </div>
  );
}

export default QuestionComponent;
