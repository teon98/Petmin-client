import React from "react";
import style from "../styles/PSView.module.css";
import { useNavigate } from "react-router";
import { idtextAtom } from "../atom/atoms";
import { useRecoilState } from "recoil";
import axios from "axios";

const FooterPS = (props) => {
  const nav = useNavigate();
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
      <button id={style.a} onClick={dolbomchat}>
        문의하기
      </button>
      <button
        id={style.b}
        onClick={() => {
          nav("/careRequest1", {
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
