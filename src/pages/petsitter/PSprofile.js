import React from "react";
import style from "../../styles/PetSitterProfile.module.css";
import BackTitleHeader from "../../components/BackTitleHeader";
import layout from "../../styles/default.module.css";
import BasicInfoForm from "../../components/PetSitterProfile/BasicInfoForm";
import ScheduleForm from "../../components/PetSitterProfile/ScheduleForm";

const PSprofile = () => {
  return (
    <div>
      <BackTitleHeader title="펫시터 프로필" />
      <div className={layout.layout}>
        <div className={style.title}>펫시터 기본 정보</div>
        <BasicInfoForm />
        <hr />
        <div className={style.title}>펫시터 일정 등록</div>
        <ScheduleForm />
      </div>
    </div>
  );
};

export default PSprofile;
