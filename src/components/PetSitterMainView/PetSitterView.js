import React from "react";
import SearchAndFillter from "./SearchAndFillter";
import PetSitterCardList from "./PetSitterCardList";

import style from "../../styles/PetSitterView.module.css";

const PetSitterView = () => {
  // 펫시터 정보 get
  return (
    <div className={style.petsitterview}>
      <SearchAndFillter />
      <PetSitterCardList />
    </div>
  );
};

export default PetSitterView;
