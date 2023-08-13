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
    const url = `/chat/chatlist/?userId=${startId}`;

    await axios
      .get(url, {
        headers: {
          "Content-Type": `application/json`,
        },
      })
      .then((res) => {
        console.log(res.data.map((el) => console.log(el)));
        setChatList(res.data);
        console.log(res.data.length);
      })
      .catch((ex) => {
        console.log(ex.length);
        console.log("requset fail : " + ex);
      });
  }

  //userID 없으면 로그인 화면으로
  const [userId] = useRecoilState(idtextAtom);
  useEffect(() => {
    if (userId === "") {
      navigate("/login");
    }
  });

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
    <>
      <div
        style={{
          height: "70px",
          flexShrink: "0",
          background: "#FFF",
          boxShadow: "0px 3px 5px 1px rgba(0, 0, 0, 0.25)",
          display: "flex",
          alignItems: "center", // Vertically center-align the content
          justifyContent: "center", // Horizontally center-align the content
        }}
      >
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
          채팅
        </span>
      </div>
      <ul>
        {chatList?.map((data, idx) => {
          return (
            <li
              onClick={() => {
                // navigate(`/${userNick}`);
                //   navigate(`/room/${data.chatroomNo}/${data.sender.userId}`);
                navigate(
                  `/room/${data.chatroomId}/${
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
                borderBottom: "2px solid #FCAEAE",
                padding: "31px 25px 18px",
                position: "relative",
                // backgroundColor: "pink",
                display: "flex", // Use flex display to align items vertically
                alignItems: "center", // Center-align items vertically
              }}
            >
              <div
                style={{
                  flexShrink: "0",
                  borderRadius: "50px",
                  marginLeft: "15px",
                }}
              >
                {data.sender.userImg === null ? (
                  <img width={35} height={35} src={defaut} />
                ) : (
                  <img width={35} height={35} src={data.sender.userImg} />
                )}
              </div>
              <div
                style={{
                  display: "flex", // Use flex display for centering vertically
                  flexDirection: "column", // Arrange items in a column
                  marginRight: "auto", // Adjust spacing
                }}
              >
                <div
                  style={{
                    fontWeight: "400",
                    letterSpacing: "-1px",
                    marginLeft: "1rem",
                    fontSize: "1.1rem",
                    textAlign: "center",
                    fontFamily: "Inter",
                    fontStyle: "normal",
                    lineHeight: "normal",
                  }}
                >
                  {userName === data.sender.userName
                    ? data.receiver.userName
                    : data.sender.userName}
                </div>
                <div
                  style={{
                    fontWeight: "400",
                    letterSpacing: "-1px",
                    marginLeft: "1rem",
                    fontSize: "1.1rem",
                    fontFamily: "Inter",
                    fontStyle: "normal",
                    lineHeight: "normal",
                    // color: "#FF8989",
                  }}
                >
                  {data.chatroomNo}
                </div>
              </div>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <g clip-path="url(#clip0_89_875)">
                  <path
                    d="M18.3002 5.70973C17.9102 5.31973 17.2802 5.31973 16.8902 5.70973L12.0002 10.5897L7.11022 5.69973C6.72022 5.30973 6.09021 5.30973 5.70021 5.69973C5.31021 6.08973 5.31021 6.71973 5.70021 7.10973L10.5902 11.9997L5.70021 16.8897C5.31021 17.2797 5.31021 17.9097 5.70021 18.2997C6.09021 18.6897 6.72022 18.6897 7.11022 18.2997L12.0002 13.4097L16.8902 18.2997C17.2802 18.6897 17.9102 18.6897 18.3002 18.2997C18.6902 17.9097 18.6902 17.2797 18.3002 16.8897L13.4102 11.9997L18.3002 7.10973C18.6802 6.72973 18.6802 6.08973 18.3002 5.70973Z"
                    fill="#323232"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_89_875">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </li>
            // FCAEAE
          );
        })}
      </ul>
    </>
  );
};

export default ChatList;
