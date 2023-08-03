import React from "react";
import style from "../../styles/PetSitterProfile.module.css";

const BasicInfoForm = () => {
  return (
    <div>
      <div className={style.subtitle}>자기소개</div>
      {/* 자기소개 textarea */}
      <div id={style.frame}>
        <textarea id={style.about} placeholder="펫시터 님을 소개해주세요!" />
      </div>
      <div className={style.subtitle}>거주형태</div>
      {/* 거주형태 radio */}
      <div id={style.frame}>
        <input id="option1" type="radio" name="place" value="마당있는집" />
        <label htmlFor="option1">마당있는집</label>

        <input id="option2" type="radio" name="place" value="아파트" />
        <label htmlFor="option2">아파트</label>

        <input id="option3" type="radio" name="place" value="단독주택" />
        <label htmlFor="option3">단독주택</label>
      </div>
      <div className={style.subtitle}>거주지 이미지</div>
      {/* 거주지 이미지 file input */}
      <div id={style.frame}>
        <input type="file" multiple />
      </div>

      <div className={style.saveBT} id={style.frame}>
        <input type="button" value="저장" />
      </div>
    </div>
  );
};

export default BasicInfoForm;
