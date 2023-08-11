import React from "react";
import "../styles/QuestionFooter.css";

function QuestionFooter(props) {
  const onClick = () => {
    props.onClick();
  };

  const btnActive = {
    margin: "15px",
    width: "137px",
    height: "46px",
    background: !props.active ? "#B3B3B3" : "#f66",
    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.25)",
    borderRadius: "5px",
    color: " #ffffff",
    fontFamily: "PreMedium",
    border: "none",
  };

  return (
    <div className="topLine">
      <button style={btnActive} onClick={onClick} disabled={!props.active}>
        {props.title}
      </button>
    </div>
  );
}

export default QuestionFooter;
