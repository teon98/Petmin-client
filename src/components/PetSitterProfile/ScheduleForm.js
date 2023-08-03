import React from "react";
import style from "../../styles/PetSitterProfile.module.css";
import { DayPicker } from "react-day-picker";

const ScheduleForm = () => {
  return (
    <div>
      <div id={style.frame}>
        <span style={{ color: "#FF6666" }}>■선택 </span>
        <span style={{ color: "#17A1FA" }}>■예약완료</span>
      </div>
      <div id={style.frame}></div>
      <div id={style.frame} style={{ textAlign: "right" }}>
        <input id="allday" type="checkbox" />
        <label htmlFor="allday">종일 가능</label>
      </div>
    </div>
  );
};

export default ScheduleForm;
