import React from "react";
import style from "../../styles/PetSitterProfile.module.css";
import BackTitleHeader from "../../components/BackTitleHeader";

const PSprofile = () => {
  return (
    <div>
      <BackTitleHeader title="펫시터 프로필" />
      <div className={style.title}>펫시터 기본 정보</div>
      <hr />
      <div className={style.title}>펫시터 기본 정보</div>
    </div>
  );
};

export default PSprofile;
