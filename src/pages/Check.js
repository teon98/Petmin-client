import React, { useEffect, useState } from "react";
import BackTitleHeader from "../components/BackTitleHeader";
import axios from "axios";
import { useRecoilState } from "recoil";
import { idtextAtom } from "../atom/atoms";
import styles2 from "../styles/Alarm.module.css";

const Check = () => {
  const [userId] = useRecoilState(idtextAtom);
  const [msg, setMsg] = useState("");
  useEffect(() => {
    axios({
      url: "/dolbom/checkSitter",
      params: { userId: "test11" },
      method: "get",
    })
      .then((res) => {
        console.log(res.data);
        setMsg(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // 리스트 출력
  const renderMessages = () => {
    const messageElements = [];
    for (let i = 0; i < msg.length; i++) {
      messageElements.push(
        <div key={i} className={styles2.aldiv}>
          <span className={styles2.chspan}>
            <img src={msg[i].map.sangdaeImg} className={styles2.chImg}></img>
            <div>
              <p>{msg[i].map.sangdaeName}</p>
              <p>
                {msg[i].map.StartDay} {msg[i].map.StartHour} ~
              </p>
              <p>
                {msg[i].map.EndDay} {msg[i].map.EndHour}{" "}
              </p>
            </div>
          </span>
          <p>안녕</p>
        </div>
      );
    }
    return messageElements;
  };

  return (
    <div>
      <BackTitleHeader title="예약확인" />
      <div>{renderMessages()}</div>
    </div>
  );
};

export default Check;
