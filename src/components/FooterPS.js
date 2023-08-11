import React from "react";
import style from "../styles/PSView.module.css";
import { useNavigate } from "react-router";

const FooterPS = (props) => {
  const nav = useNavigate();
  console.log("profileName--------------");
  console.log(props.userId);
  return (
    <div className={style.buttonFooter}>
      <button id={style.a}>문의하기</button>
      <button
        id={style.b}
        onClick={() => {
          nav("/reservation2", { state: { sitter: props.userId } });
        }}
      >
        예약요청
      </button>
    </div>
  );
};

export default FooterPS;
