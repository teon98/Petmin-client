import React, { useEffect, useState } from "react";
import { dummy } from "./banner/dummy";
import defaut from "../assets/images/Main/default.png";
import { useNavigate } from "react-router-dom";
import { idtextAtom, nametextAtom } from "../atom/atoms";
import { useRecoilState } from "recoil";
import axios from "axios";

const ChatList = () => {
  const navigate = useNavigate();
  const [startId, setStartId] = useRecoilState(idtextAtom);
  const [userName, setUserName] = useRecoilState(nametextAtom);
  let [chatList, setChatList] = useState([]);

  async function getRoomList() {
    const url = `/chat/chatlist/${startId}`;

    await axios
      .get(url, {
        headers: {
          "Content-Type": `application/json`,
        },
      })
      .then((res) => {
        console.log(res.data.map((el) => console.log(el)));
        setChatList(res.data);
      })
      .catch((ex) => {
        console.log("requset fail : " + ex);
      });
  }

  useEffect(() => {
    console.log(userName);
    getRoomList();
  }, []);

  return (
    // <ul>
    //   {chatList?.map((data, idx) => {
    //     console.log(data);
    //     return (
    //       <li
    //         onClick={() => {
    //           // navigate(`/${userNick}`);
    //           navigate(`/room/${data.chatroomId}/${data.receiver.userId}`);
    //           //   console.log(data.chatroomNo);
    //         }}
    //         key={idx}
    //         style={{
    //           borderBottom: "1px solid #FF6666",
    //           padding: "21px 25px 18px",
    //           background: "#fafcff",
    //           position: "relative",
    //         }}
    //       >
    //         <div
    //           style={{
    //             float: "right",
    //             marginLeft: "15px",
    //           }}
    //         >
    //           {data.sender.userImg === null ? (
    //             <img width={24} height={35} src={defaut} />
    //           ) : (
    //             <img width={24} height={35} src={data.sender.userImg} />
    //           )}
    //         </div>
    //         <div style={{ display: "flex" }}>
    //           <div
    //             style={{
    //               // paddingLeft: "45px",
    //               fontWeight: "700",
    //               letterSpacing: "-1px",
    //               marginRight: "6px",
    //               fontSize: "1.4rem",
    //             }}
    //           >
    //             {data.chatroomId}
    //           </div>
    //           <div
    //             style={{
    //               // paddingLeft: "45px",
    //               fontWeight: "700",
    //               letterSpacing: "-1px",
    //               marginRight: "6px",
    //               fontSize: "1.4rem",
    //               // color: "#FF8989",
    //             }}
    //           >
    //             {data.sender.userName}
    //           </div>
    //         </div>
    //       </li>
    //       // FCAEAE
    //     );
    //   })}
    // </ul>
    <ul>
      {dummy?.map((data, idx) => {
        return (
          <li
            onClick={() => {
              // navigate(`/${userNick}`);
              //   navigate(`/room/${data.chatroomNo}/${data.sender.userId}`);
              navigate(
                `/room/${data.chatroomNo}/${
                  userName === data.sender.userName
                    ? data.receiver.userId
                    : data.sender.userId
                }`
              );
              //   navigate(`/room/${data.chatroomNo}`);
              console.log(data.chatroomNo);
            }}
            key={idx}
            style={{
              borderBottom: "1px solid #FF6666",
              padding: "21px 25px 18px",
              background: "#fafcff",
              position: "relative",
            }}
          >
            <div
              style={{
                float: "right",
                marginLeft: "15px",
              }}
            >
              {data.sender.userImg === null ? (
                <img width={24} height={35} src={defaut} />
              ) : (
                <img width={24} height={35} src={data.sender.userImg} />
              )}
            </div>
            <div style={{ display: "flex" }}>
              <div
                style={{
                  // paddingLeft: "45px",
                  fontWeight: "700",
                  letterSpacing: "-1px",
                  marginRight: "6px",
                  fontSize: "1.4rem",
                }}
              >
                {data.chatroomNo}
              </div>
              <div
                style={{
                  // paddingLeft: "45px",
                  fontWeight: "700",
                  letterSpacing: "-1px",
                  marginRight: "6px",
                  fontSize: "1.4rem",
                  // color: "#FF8989",
                }}
              >
                {userName === data.sender.userName
                  ? data.receiver.userName
                  : data.sender.userName}
              </div>
            </div>
          </li>
          // FCAEAE
        );
      })}
    </ul>
  );
};

export default ChatList;
