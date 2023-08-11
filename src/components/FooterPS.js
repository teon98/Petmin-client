import React from "react";
import style from "../styles/PSView.module.css";

const FooterPS = () => {
  return (
    <div className={style.buttonFooter}>
      <button id={style.a}>문의하기</button>
      <button id={style.b}>예약요청</button>
    </div>
  );
};

export default FooterPS;
