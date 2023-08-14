import React, { useEffect } from "react";

import style from "../styles/PSView.module.css";

import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router";
import { idtextAtom } from "../atom/atoms";
import { useRecoilState } from "recoil";
import axios from "axios";

const FooterPS = (props) => {
  const nav = useNavigate();
  const location = useLocation();

  const [startId, setStartId] = useRecoilState(idtextAtom);
  const receiver =
    location.pathname.split("/")[location.pathname.split("/").length - 1];

  async function makeRoom(s, r) {
    const url = "/chat/chatting";
    axios
      .get(url, {
        headers: {
          "Content-Type": `application/json`,
        },
        params: {
          sender: s,
          receiver: r,
        },
      })
      .then((res) => {
        console.log(res.data.chatroomId);
        nav(`/room/${res.data.chatroomId}/${receiver}`);
      })
      .catch((ex) => {
        console.log("requset fail : " + ex);
      });
  }

  console.log("profileName--------------");
  console.log(props.sitter);
  const [userId] = useRecoilState(idtextAtom);

  const dolbomchat = (sangdaeId) => {
    axios({
      url: "/chat/chatting",
      params: { sender: userId, receiver: props.sitterId },
      method: "get",
    })
      .then((res) => {
        nav("/room/" + res.data.chatroomId + "/" + props.sitterId);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className={style.buttonFooter}>
      <button id={style.a} onClick={() => makeRoom(startId, receiver)}>
        문의하기
      </button>
      <button
        id={style.b}
        onClick={() => {
          nav("/reserveForm", {
            state: { sitter: props.sitter, sitterId: props.sitterId },
          });
        }}
      >
        예약요청
      </button>
    </div>
  );
};

export default FooterPS;
