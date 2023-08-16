import React, { useEffect, useState } from "react";
import BackTitleHeader from "../components/BackTitleHeader";
import styles from "../styles/banner/layout.module.css";
import { useRecoilState } from "recoil";
import { idtextAtom } from "../atom/atoms";
import axios from "axios";
import styles2 from "../styles/Alarm.module.css";
import { GoBellFill, IconName } from "react-icons/go";
import { FaArrowUp } from "react-icons/fa6";
import style from "../styles/Alarm.module.css";

const Alarm = () => {
  const [userId] = useRecoilState(idtextAtom);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    axios({
      url: "/alarm/search",
      params: { userId: userId },
      method: "get",
    })
      .then((res) => {
        setMsg(res.data);
      })
      .catch((error) => {
        //console.log(error);
      });
  }, []);

  // 문자열 배열의 내용을 출력하는 함수
  const renderMessages = () => {
    const messageElements = [];
    for (let i = 0; i < msg.length; i++) {
      const nae = msg[i].split(":");
      const isFalse = nae[2] === "false" ? false : true; // 문자열 "false"를 불리언으로 변환
      const minutes = parseInt(nae[1]);
      messageElements.push(
        <div key={i} className={styles2.aldiv}>
          <span className={styles2.alspan}>
            {nae[0]}
            {isFalse ? null : (
              <GoBellFill style={{ color: "#fcaeae", marginLeft: "10px" }} />
            )}
          </span>
          <p className={styles2.alp}>
            {minutes >= 60
              ? minutes >= 1440
                ? `${Math.floor(minutes / 60 / 24)}일`
                : `${Math.floor(minutes / 60)}시간`
              : `${nae[1]}분`}
            전
          </p>
        </div>
      );
    }
    return messageElements;
  };

  return (
    <div className={styles.frame}>
      <BackTitleHeader title="알림" />
      <div>{renderMessages()}</div>
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

export default Alarm;
