import React, { useEffect, useState } from "react";
import BackTitleHeader from "../components/BackTitleHeader";
import axios from "axios";
import { useRecoilState } from "recoil";
import { idtextAtom, licenceAtom } from "../atom/atoms";
import styles2 from "../styles/Alarm.module.css";
import { useNavigate } from "react-router";
import style from "../styles/Alarm.module.css";
import { FaArrowUp, FaArrowsRotate } from "react-icons/fa6";
import Swal from "sweetalert2";
//제출시 알람
const Toast = Swal.mixin({
  toast: true,
  position: "center",
  showConfirmButton: false,
  timer: 1000,
  timerProgressBar: true,
});
const Checkuser = () => {
  const [userId] = useRecoilState(idtextAtom);
  const [userLicence] = useRecoilState(licenceAtom);
  const [msg, setMsg] = useState("");
  const nav = useNavigate();
  console.log(userLicence);
  useEffect(() => {
    //로그인 안되어있으면 로그인으로
    if (userId === "") {
      nav("/login");
    }

    axios({
      url: "/dolbom/checkUser",
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

  const dolbomchat = (sangdaeId) => {
    axios({
      url: "/chat/chatting",
      params: { sender: userId, receiver: sangdaeId },
      method: "get",
    })
      .then((res) => {
        nav("/room/" + res.data.chatroomId + "/" + sangdaeId);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const dolbomdel = (no) => {
    axios({
      url: "/dolbom/delete",
      params: { dolbomNo: no },
      method: "delete",
    })
      .then((res) => {
        Toast.fire({
          icon: "success",
          title: res.data,
        });
        setTimeout(() => {}, 1000);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const dolbomreview = (no) => {
    //userId:userId sitterId:sangdaeId
  };
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
                  <button onClick={() => dolbomdel(msg[i].no)}>취소</button>
                  <button
                    className="yobtn"
                    onClick={() => dolbomchat(msg[i].sangdaeId)}
                  >
                    문의하기
                  </button>
                </span>
              ) : msg[i].state === "수락완료" ? (
                <span>
                  <button onClick={() => dolbomdel(msg[i].no)}>취소</button>
                  <button onClick={() => dolbomchat(msg[i].sangdaeId)}>
                    채팅하기
                  </button>
                </span>
              ) : msg[i].state === "진행중" ? (
                <span>
                  <button onClick={() => dolbomdel(msg[i].no)}>취소</button>
                  <button onClick={() => dolbomchat(msg[i].sangdaeId)}>
                    채팅하기
                  </button>
                </span>
              ) : msg[i].state === "종료" ? (
                <span>
                  <button onClick={() => dolbomdel(msg[i].no)}>취소</button>
                  <button onClick={() => dolbomreview(msg[i].sangdaeId)}>
                    리뷰
                  </button>
                </span>
              ) : (
                <span>
                  <button onClick={() => dolbomdel(msg[i].no)}>취소</button>
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
      {/* 화면변경  버튼 */}
      {userLicence === "일반" ? (
        <br></br>
      ) : (
        <div
          className={style.flexBT}
          onClick={() => {
            nav("/CheckSitter");
          }}
        >
          <FaArrowsRotate size="30" id={style.plusIcon} color="white" />
        </div>
      )}{" "}
    </div>
  );
};

export default Checkuser;
