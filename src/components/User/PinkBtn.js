import React, { useEffect } from "react";

function PinkBtn(props) {
  const { title, active } = props;

  //버튼 누르면 부모 함수 실행됨
  const onClick = () => {
    props.onClick();
  };

  const btnActive = {
    display: "block",
    margin: "10px auto",
    width: "100%",
    height: "40px",
    background: !active ? "#B3B3B3" : "#ff8989",
    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.25)",
    borderRadius: "10px",
    color: " #ffffff",
    fontFamily: "PreMedium",
    border: "none",
    cursor: "pointer",
  };

  return (
    <button style={btnActive} onClick={onClick} disabled={!active}>
      {title}
    </button>
  );
}

export default PinkBtn;
