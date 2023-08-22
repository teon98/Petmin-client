import React, { Fragment, useEffect, useState } from "react";
import style from "../styles/Main.module.css";
import "../styles/dotCustom.css";
import { FaBell } from "react-icons/fa6";
import { BiSolidMessageCheck } from "react-icons/bi";
import { Link } from "react-router-dom";
import MainHeader from "../components/MainHeader";
import PetSitterView from "../components/PetSitterMainView/PetSitterView";
import { FaArrowUp } from "react-icons/fa6";
import { useRecoilState } from "recoil";
import { idtextAtom } from "../atom/atoms";
import axios from "axios";

const Main = () => {
  const [userId] = useRecoilState(idtextAtom);
  const [notificationArrived, setNotificationArrived] = useState(true);
  //console.log(`현재 로그인한 유저는 ${userId} 입니다.`);

  useEffect(() => {
    axios({
      url: "/alarm/search2",
      params: { userId: userId },
      method: "get",
    })
      .then((res) => {
        for (let i = 0; i < res.data.length; i++) {
          const alarm = res.data[i].split(":");
          if (alarm[2] === "false") {
            setNotificationArrived(false);
          }
        }
        //console.log(notificationArrived);
      })
      .catch((error) => {
        //console.log(error);
      });
  }, []);

  return (
    <div className={style.mainbody}>
      {/* 알림 Header */}
      <div className={style.mainHeader}>
        <Link to="/alarm">
          {notificationArrived === true ? (
            <FaBell
              size="24"
              color="white"
              style={{
                marginRight: "15px",
                marginTop: "15px",
                cursor: "pointer",
              }}
            />
          ) : (
            <Fragment>
              <FaBell
                size="24"
                color="white"
                style={{
                  marginTop: "15px",
                  cursor: "pointer",
                }}
              />
              <BiSolidMessageCheck
                size="20"
                color="red"
                style={{
                  marginBottom: "15px",
                  cursor: "pointer",
                }}
              />
            </Fragment>
          )}
        </Link>
      </div>
      {/* 이미지 배너 슬라이더 */}
      <MainHeader />
      {/* main content 영역  */}
      <PetSitterView />
      {/* 상단 이동 버튼 */}
      {/* <div
        className={style.flexBT}
        onClick={() => {
          //console.log("클릭중");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        <FaArrowUp size="30" id={style.plusIcon} color="white" />
      </div> */}
    </div>
  );
};

export default Main;
