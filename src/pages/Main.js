import React from "react";
import style from "../styles/Main.module.css";
import "../styles/dotCustom.css";
import { FaBell } from "react-icons/fa6";
import { Link } from "react-router-dom";
import MainHeader from "../components/MainHeader";
import PetSitterView from "../components/PetSitterMainView/PetSitterView";
import { FaArrowUp } from "react-icons/fa6";
import { useRecoilState } from "recoil";
import { idtextAtom } from "../atom/atoms";

const Main = () => {
  const [userId] = useRecoilState(idtextAtom);
  console.log(`현재 로그인한 유저는 ${userId} 입니다.`);

  return (
    <div className={style.mainbody}>
      {/* 알림 Header */}
      <div className={style.mainHeader}>
        <Link to="/alarm">
          <FaBell
            size="24"
            color="white"
            style={{
              marginRight: "15px",
              marginTop: "15px",
              cursor: "pointer",
            }}
          />
        </Link>
      </div>
      {/* 이미지 배너 슬라이더 */}
      <MainHeader />
      {/* main content 영역  */}
      <PetSitterView />
      {/* 상단 이동 버튼 */}
      <div
        className={style.flexBT}
        onClick={() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        <FaArrowUp size="30" id={style.plusIcon} color="white" />
      </div>
    </div>
  );
};

export default Main;
