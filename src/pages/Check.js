import React, { useEffect, useState } from "react";
import BackTitleHeader from "../components/BackTitleHeader";
import axios from "axios";
import { useRecoilState } from "recoil";
import { idtextAtom } from "../atom/atoms";
import styles2 from "../styles/Alarm.module.css";
import { useNavigate } from "react-router";

const Check = () => {
  const [userId] = useRecoilState(idtextAtom);
  const [msg, setMsg] = useState("");
  const nav = useNavigate();

  useEffect(() => {
    //로그인 안되어있으면 로그인으로
    if (userId === "") {
      nav("/login");
    }

    axios({
      url: "/dolbom/checkSitter",
      params: { userId: userId },
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

  const dolbomok = (no) => {
    axios({
      url: "/dolbom/surack",
      params: { dolbomNo: no },
      method: "put",
    })
      .then((res) => {
        console.log(res.data);
        //nav();보험 페이지로 이동
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const dolbomdel = () => {};
  // 리스트 출력
  const renderMessages = () => {
    const messageElements = [];
    for (let i = 0; i < msg.length; i++) {
      messageElements.push(
        <div key={i} className={styles2.aldiv}>
          <span className={styles2.chspan}>
            <div>
              <p>
                {msg[i].sangdaeName} 예약 시작 시간 {msg[i].startday} ~
              </p>
              <p> 끝나는 시간 {msg[i].endday}</p>
              <p>
                상태 :{msg[i].state}
                {"     "} 펫: {msg[i].pet.petName} {msg[i].pet.petAge}{" "}
                {msg[i].petW}
              </p>
              {msg[i].state === "대기중" ? (
                <span>
                  <button>취소</button>
                  <button className="yobtn" onClick={() => dolbomok(msg[i].no)}>
                    요청수락
                  </button>
                </span>
              ) : msg[i].state === "수락완료" ? (
                <span>
                  <button>취소</button>
                  <button>채팅하기</button>
                </span>
              ) : msg[i].state === "진행중" ? (
                <span>
                  <button>취소</button>
                  <button>채팅하기</button>
                </span>
              ) : (
                <span>
                  <button>삭제</button>
                </span>
              )}
            </div>
          </span>
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
