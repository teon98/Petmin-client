import axios from "axios";
import React, { useCallback, useRef, useState, useEffect } from "react";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import "../styles/chat.scss";
import { useLocation, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { idtextAtom, nametextAtom } from "../atom/atoms";
const Chat = () => {
  let { room } = useParams();

  const location = useLocation();
  const receiverId = decodeURI(
    location.pathname.split("/")[location.pathname.split("/").length - 1]
  );
  const [msg, setMsg] = useState("");
  const [name, setName] = useState("");
  const [chatt, setChatt] = useState([]);
  const [chkLog, setChkLog] = useState(false);
  const [socketData, setSocketData] = useState();
  const [startId, setStartId] = useRecoilState(idtextAtom);
  const [userName, setUserName] = useRecoilState(nametextAtom);

  const ws = useRef(null); //webSocket을 담는 변수,
  //컴포넌트가 변경될 때 객체가 유지되어야하므로 'ref'로 저장

  //스크롤
  const scrollRef = useRef();

  const msgBox = chatt.map((item, idx) => (
    <div
      key={idx}
      className={item.startId === startId.toString() ? "other" : "me"}
    >
      <span>
        <b>{item.name}</b>
      </span>{" "}
      [ {item.date} ]<br />
      <span>{item.msg}</span>
    </div>
  ));
  const webSocketLogin = useCallback(() => {
    console.log("test");
    ws.current = new WebSocket(`ws://localhost:8888/socket/chatt/${room}`);
    // ws.current = new WebSocket(`ws://localhost:8888/socket/chatt`);

    ws.current.onmessage = (message) => {
      const dataSet = JSON.parse(message.data);
      setSocketData(dataSet);
    };
  }, [room]);

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
        console.log(res);
        if (
          res.data.message ===
          "상담 신청 내역이 있습니다. 이전 채팅방에 입장합니다."
        ) {
          let historylist = [];
          res.data.chatHistory.map((history) => {
            // const hName = history.myname;
            const hMsg = history.msg;
            const hRoom = res.data.chatroomId;
            let hDate = history.chatDate;
            hDate = new Date(hDate).toLocaleDateString();
            const historyChat = {
              msg: hMsg,
              // userName,
              startId: "ckdrua12",
              // receiverId: receiverId,
              chatroomId: hRoom,
              // chat,
              date: new Date().toLocaleString(),
            };
            historylist.push(historyChat);
          });
          console.log(historylist, "historylist##");
          setChatt(historylist);
        }
        // setRoom(res.data.room);
        // setMyname(res.data.myname);
      })
      .catch((ex) => {
        console.log("requset fail : " + ex);
      });
  }

  useEffect(() => {
    scrollRef.current.scrollIntoView({ behavior: "smooth" });
  }, [msgBox]);

  useEffect(() => {
    webSocketLogin();
    // makeRoom(startId, receiverId);
    // makeRoom(receiverId, startId);
  }, [webSocketLogin]);

  useEffect(() => {
    console.log(
      startId,
      userName,
      receiverId,
      "startId, userName, receiverId,"
    );
    console.log(chatt, startId.toString(), "chatt@@@");
    console.log(socketData, "socketData");
    if (socketData !== undefined) {
      const tempData = chatt.concat(socketData);
      console.log(tempData, "tempData");
      setChatt(tempData);
    }
  }, [socketData]);

  const GlobalStyle = createGlobalStyle`  //css 초기화가 된 component
        ${reset}
    `;

  const onText = (event) => {
    // console.log(event.target.value);
    setMsg(event.target.value);
  };

  const send = useCallback(() => {
    // webSocketLogin();

    // if (!chkLog) {
    //   if (name === "") {
    //     alert("이름을 입력하세요.");
    //     document.getElementById("name").focus();
    //     return;
    //   }
    //   webSocketLogin();
    //   setChkLog(true);
    // }

    // webSocketLogin();

    if (msg !== "") {
      const data = {
        msg: msg,
        // userName,
        startId: startId,
        receiverId: receiverId,
        chatroomId: room,
        // chat,
        date: new Date().toLocaleString(),
      }; //전송 데이터(JSON)

      const temp = JSON.stringify(data);
      console.log(temp, "temp");

      if (ws.current.readyState === 0) {
        //readyState는 웹 소켓 연결 상태를 나타냄
        ws.current.onopen = () => {
          //webSocket이 맺어지고 난 후, 실행
          console.log(ws.current.readyState);
          ws.current.send(temp);
          console.log(ws);
        };
      } else {
        ws.current.send(temp);
      }
    } else {
      alert("메세지를 입력하세요.");
      document.getElementById("msg").focus();
      return;
    }
    setMsg("");
  }, [msg, startId, receiverId, room]);

  return (
    <>
      <GlobalStyle />
      <div id="AllComponents">
        {/* <div id="chat-wrap"> */}
        <div id="chatt">
          <h1 id="title">WebSocket Chatting</h1>
          <br />
          <div id="talk">
            <div className="talk-shadow"></div>
            {msgBox}
            <div ref={scrollRef}></div>
          </div>
          {/* <input
            disabled={chkLog}
            placeholder="이름을 입력하세요."
            type="text"
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          /> */}
          <input
            // disabled={chkLog}
            disabled={true}
            // className="ipt"
            placeholder="이름을 입력하세요."
            type="text"
            id="name"
            value={userName}
            // onChange={(event) => setName(event.target.value)}
          />
          <div id="sendZone">
            <textarea
              id="msg"
              value={msg}
              onChange={onText}
              onKeyDown={(ev) => {
                if (ev.keyCode === 13) {
                  send();
                  console.log("onKeyDown");
                }
              }}
            ></textarea>
            <input
              // className="ipt"
              type="button"
              value="전송"
              id="btnSend"
              onClick={() => {
                send();
                console.log("onClick");
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
