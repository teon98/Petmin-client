import axios from "axios";
import React, { useCallback, useRef, useState, useEffect } from "react";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { idtextAtom, nametextAtom } from "../atom/atoms";
import style from "../styles/PetSitterView.module.css";
import st from "../styles/chat.scss";
const Chat = () => {
  let { room } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const receiverId = decodeURI(
    location.pathname.split("/")[location.pathname.split("/").length - 1]
  );
  const [msg, setMsg] = useState("");
  const [chatCheck, setChatCheck] = useState(false);
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
  const aa = {
    marginLeft: "-60px",
    fontFamily: "Inter",
    fontSize: "12px",
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: "normal",
    width: "fit-content",
  };
  const bb = {
    marginLeft: "245px",
    fontFamily: "Inter",
    fontSize: "12px",
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: "normal",
    width: "fit-content",
  };
  const timeRegex = /(\S+\s)(\d{1,2}:\d{2})/;

  const msgBox = chatt.map((item, idx) => (
    <>
      <div
        key={idx}
        className={item.startId === startId ? "me" : "other"}
        style={{
          // overflow: "scroll",
          whiteSpace: "wrap",
          textOverflow: "ellipsis",
          // width: "400"
        }}
      >
        <span>
          <b>{item.name}</b>
        </span>
        <p
          style={{
            display: "block",
            padding: "8px 12px",
            borderRadius: "5px",
            fontWeight: "600",
            marginLeft: "5px",
            width: "fit-content",
          }}
        >
          {item.msg}
        </p>
        {item.startId === startId ? (
          <p style={aa}>
            {/* {console.log(item, "^^^^^^^^^^")} */}
            {/* {item.chatCheck === true ? "" : "1️⃣"} */}
            {item.chatCheck === true ? "" : ""}
            &nbsp;
            {item.date.match(timeRegex)[2]}
          </p>
        ) : (
          <p style={bb}>
            {item.date.match(timeRegex)[2]}
            &nbsp;
            {/* {item.chatCheck === true ? "" : "1️⃣"} */}
            {item.chatCheck === true ? "" : ""}
          </p>
        )}
      </div>
    </>
  ));
  const webSocketLogin = useCallback(() => {
    ws.current = new WebSocket(`ws://localhost:8888/socket/chatt/${room}`);
    // ws.current = new WebSocket(`ws://localhost:8888/socket/chatt`);
    console.log(ws.current, "ws.current");

    ws.current.onmessage = (message) => {
      const dataSet = JSON.parse(message?.data);
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
        if (
          res.data.message ===
          "상담 신청 내역이 있습니다. 이전 채팅방에 입장합니다."
        ) {
          let historylist = [];
          res.data.chatHistory.map((history) => {
            // const hName = history.myname;
            const hMsg = history.msg;
            const hRoom = res.data.chatroomId;
            const Sid = history.startId.userId;
            let hDate = history.chatDate;
            let chatCheck = history.chatCheck;
            hDate = new Date(hDate).toLocaleDateString();
            const historyChat = {
              msg: hMsg,
              // userName,
              startId: Sid,
              // receiverId: receiverId,
              chatroomId: hRoom,
              chatCheck: chatCheck,
              // chat,
              date: new Date().toLocaleString(),
              chatCheck: chatCheck,
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
    scrollRef.current.scrollIntoView({
      behavior: "auto",
      block: "end",
      inline: "nearest",
    });
    // console.log("hi");
  }, [msgBox]);

  // useEffect(() => {
  //   webSocketLogin();
  // }, []);

  useEffect(() => {
    // console.log(location.pathname);
    webSocketLogin();
    console.log(startId, receiverId, "startId, receiverIdstartId, receiverId");
    makeRoom(startId, receiverId);
    // makeRoom(receiverId, startId);
  }, []);

  useEffect(() => {
    console.log(chatt, startId.toString(), "chatt@@@");
    console.log(socketData, "socketData");
    if (socketData !== undefined) {
      const tempData = [...chatt, socketData];
      console.log(tempData, "tempData");
      setChatt(tempData);
    }
  }, [socketData]);

  useEffect(() => {
    console.log("chat변경됨");
    console.log(chatt);
    //  /window.location.reload();
  }, [chatt]);

  const GlobalStyle = createGlobalStyle`  //css 초기화가 된 component998
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
        // chatCheck: chatCheck,
        // chat,
        date: new Date().toLocaleString(),
      }; //전송 데이터(JSON)

      const temp = JSON.stringify(data);
      console.log(temp, "temp");
      console.log(data, "data");
      // if (data !== undefined) {
      //   const tempData = chatt.concat(data);
      //   console.log(tempData, "tempData");
      //   setChatt(tempData);
      // }

      console.log(ws.current.readyState, "ws.current.readyState");
      console.log(ws.current, "ws.current");
      if (ws.current.readyState === 0) {
        //readyState는 웹 소켓 연결 상태를 나타냄
        ws.current.onopen = () => {
          console.log("################################");
          //webSocket이 맺어지고 난 후, 실행
          console.log(ws.current.readyState);
          ws.current.send(temp, "@@@@@@");
          console.log(ws);
        };
      } else {
        console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@");

        ws.current.send(temp);
        // if (data !== undefined) {
        //   const tempData = chatt.concat(data);
        //   console.log(tempData, "tempData");
        //   setChatt(tempData);
        // }
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
      <div
        style={{
          width: "453px",
          height: "70px",
          flexShrink: "0",
          background: "#FFF",
          boxShadow: "0px 3px 5px 1px rgba(0, 0, 0, 0.25)",
          display: "flex",
          alignItems: "center", // Vertically center-align the content
          justifyContent: "center", // Horizontally center-align the content
          justifyContent: "space-between",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="17"
          height="23"
          viewBox="0 0 17 23"
          fill="none"
          onClick={() => navigate(-1)}
          style={{ marginLeft: "1.2rem" }}
        >
          <path
            d="M16.3461 2.35355L13.9728 0.362305L0.786133 11.4998L13.9861 22.6373L16.3461 20.6461L5.50613 11.4998L16.3461 2.35355Z"
            fill="black"
          />
        </svg>
        <span
          style={{
            color: "#000",
            textAlign: "center",
            fontFamily: "Inter",
            fontSize: "20px",
            fontStyle: "normal",
            fontWeight: "400",
            lineHeight: "normal",
          }}
        >
          {receiverId}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          style={{ marginRight: "1.2rem" }}
        >
          <path
            d="M4.47012 20.9997H19.5301C21.0701 20.9997 22.0301 19.3297 21.2601 17.9997L13.7301 4.98969C12.9601 3.65969 11.0401 3.65969 10.2701 4.98969L2.74012 17.9997C1.97012 19.3297 2.93012 20.9997 4.47012 20.9997ZM12.0001 13.9997C11.4501 13.9997 11.0001 13.5497 11.0001 12.9997V10.9997C11.0001 10.4497 11.4501 9.99969 12.0001 9.99969C12.5501 9.99969 13.0001 10.4497 13.0001 10.9997V12.9997C13.0001 13.5497 12.5501 13.9997 12.0001 13.9997ZM13.0001 17.9997H11.0001V15.9997H13.0001V17.9997Z"
            fill="#323232"
          />
        </svg>
      </div>

      {/* <div id="chat-wrap"> */}
      <div
        id="chatt"
        // style={{
        //   display: "flex",
        //   flexDirection: "column",
        //   alignItems: "center",
        //   justifyContent: "center",
        // }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "412px",
            height: "90px",
            flexShrink: "0",
            borderRadius: "10px",
            background: "#E9E9E9",
            margin: "20px auto",
            padding: "5px",
            marginLeft: "15px",
          }}
        >
          <p
            style={{
              color: "#5F5F5F",
              fontFamily: "Inter",
              fontSize: "13px",
              fontStyle: "normal",
              fontWeight: "400",
              lineHeight: "normal",
              textAlign: "center",
              margin: "0", // 추가
            }}
          >
            <p style={{ color: "#000", textAlign: "center" }}>
              {receiverId}님에게 돌봄 문의를 할 수 있습니다
            </p>
            <br />
            연락처 또는 SNS 요구, 과도한 신상 요구, 직거래 제안 그 외 부적절한
            언행 시 이용이 정지될 수 있습니다.
          </p>
        </div>
        <br />
        <div
          id="talk"
          style={{
            marginLeft: "30px",
            maxWidth: "600px",
            // overflowY: "scroll",
          }}
        >
          <div className="talk-shadow"></div>
          <span
            style={{
              display: "block",
              textAlign: "center",
              margin: "10px auto",
              width: "100%",
              fontWeight: "bold", // Optional: Add any additional styling you want
            }}
          >
            {chatt[0]?.date ? chatt[0]?.date : "대화를 시작하세요"}
          </span>
          {msgBox}
          <div ref={scrollRef}></div>
        </div>

        <div
          id="btm"
          style={{
            borderTop: "1px solid #B3B3B3",
            padding: "20px",
            width: "415px",
            height: "35px",
            // backgroundColor: "pink",
            // marginLeft: "10px",
            // maxWidth: "500px",
            display: "flex",
            alignItems: "center", // Vertically center-align the content
            justifyContent: "center", // Horizontally center-align the content
            justifyContent: "space-between",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="29"
            height="29"
            viewBox="0 0 29 29"
            fill="none"
          >
            <g clip-path="url(#clip0_86_1030)">
              <path
                d="M25.375 22.9583V6.04167C25.375 4.7125 24.2875 3.625 22.9583 3.625H6.04167C4.7125 3.625 3.625 4.7125 3.625 6.04167V22.9583C3.625 24.2875 4.7125 25.375 6.04167 25.375H22.9583C24.2875 25.375 25.375 24.2875 25.375 22.9583ZM10.7542 16.8925L13.2917 19.9496L17.0375 15.1283C17.2792 14.8142 17.7625 14.8142 18.0042 15.1404L22.2454 20.7954C22.5475 21.1942 22.2575 21.7621 21.7621 21.7621H7.27417C6.76667 21.7621 6.48875 21.1821 6.80292 20.7833L9.81167 16.9167C10.0413 16.6025 10.5004 16.5904 10.7542 16.8925Z"
                fill="#323232"
              />
            </g>
            <defs>
              <clipPath id="clip0_86_1030">
                <rect width="29" height="29" fill="white" />
              </clipPath>
            </defs>
          </svg>

          <label htmlFor="place">
            <div
              className={style.locationSearchBar}
              style={{
                backgroundColor: "white",
                justifyContent: "center",
                borderRadius: "20px",
                border: "2px solid #D2D2D2",

                width: "80%",
                maxWidth: "300px",
                display: "flex",
                alignItems: "center", // Vertically center-align the content
                justifyContent: "center", // Horizontally center-align the content
              }}
            >
              <input
                style={{ width: "100%", flex: "1", padding: "9px" }}
                id="msg"
                value={msg}
                onChange={onText}
                onKeyDown={(ev) => {
                  if (ev.keyCode === 13) {
                    send();
                    console.log("onKeyDown");
                  }
                }}
                // onChange={keywordChange}
                className={style.locationSearch}
              />
            </div>
          </label>
          <div
            style={{
              marginRight: "30px",
              width: "43px",
              height: "46px",
              flexShrink: "0",
              borderRadius: "10px",
              background: "#F66",
              boxShadow: "0px 2px 5px 0px rgba(0, 0, 0, 0.25)",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="38"
              viewBox="-4 -2 24 24"
              fill="none"
              onClick={() => send()}
            >
              <g clip-path="url(#clip0_86_1037)">
                <path
                  d="M18.7501 3.94046L4.07011 10.0805C3.24011 10.4305 3.26011 11.6105 4.09011 11.9305L9.43011 14.0005C9.69011 14.1005 9.90011 14.3105 10.0001 14.5705L12.0601 19.9005C12.3801 20.7405 13.5701 20.7605 13.9201 19.9305L20.0701 5.26046C20.4001 4.43046 19.5701 3.60046 18.7501 3.94046Z"
                  fill="white"
                />
              </g>
              <defs>
                <clipPath id="clip0_86_1037">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>

          {/* <div id="sendZone">
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
            </div> */}
        </div>
        {/* <input
            // disabled={chkLog}
            disabled={true}
            // className="ipt"
            placeholder="이름을 입력하세요."
            type="text"
            id="name"
            value={userName}
            // onChange={(event) => setName(event.target.value)}
          /> */}
      </div>
    </>
  );
};

export default Chat;
