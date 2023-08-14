import React, { useState } from "react";
import BackTitleHeader from "../components/BackTitleHeader";
import style2 from "../styles/RFBT.module.css";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import style from "../styles/PSView.module.css";

const ReserveForm = () => {
  const [caretype, setCaretype] = useState("산책");

  const handleChange = (e) => {
    //산책과 돌봄 여부 선택
    setCaretype(e.target.value);
  };

  const [selectedDay, setSelectedDay] = useState();
  const handleSelect = (e) => {
    console.log("응애");
  };
  return (
    <div>
      <BackTitleHeader title="돌봄요청서" />

      <p className={style.subtitle2}>돌봄 유형</p>
      <div className={style.caretypeButton}>
        <input
          type="radio"
          value="산책"
          name="caretype"
          id="산책"
          onChange={handleChange}
          checked={caretype === "산책"}
        />
        <label htmlFor="산책">산책</label>
        <input
          type="radio"
          value="돌봄"
          name="caretype"
          id="돌봄"
          onChange={handleChange}
          checked={caretype === "돌봄"}
        />
        <label htmlFor="돌봄">돌봄</label>
      </div>
      <p className={style.subtitle2}>일자</p>
      <div className={style.daypickerStyle}>
        <DayPicker
          mode="single"
          selected={selectedDay}
          onSelect={handleSelect}
        />
      </div>

      <div className={style2.bottom}>
        <button type="button">요청하기</button>
      </div>
    </div>
  );
};

export default ReserveForm;
