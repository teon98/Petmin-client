import React from "react";
import "../styles/BackTitleHeader2.css";
import BackButton from "./BackButton";

const BackTitleHeader2 = (props) => {
  const firstChar = parseFloat(props.subtitle); // 문자열을 숫자로 변환
  const lastChar = props.subtitle.slice(-1);
  const percent = (firstChar / lastChar) * 100;

  const StatusBar = {
    position: "absolute",
    backgroundColor: "#f66",
    height: "3px",
    width: `${percent}%`,
    zIndex: 1,
  };

  return (
    <>
      <div className="NavBody">
        <div className="goback">
          <BackButton />
        </div>
        <div className="title">{props.title} </div>
        <p className="subtitle">{props.subtitle}</p>
      </div>

      <div style={StatusBar}></div>
      <div className="BackgroundBar"></div>
    </>
  );
};

export default BackTitleHeader2;
