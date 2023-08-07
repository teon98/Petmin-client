import React from "react";
import { dummy } from "./banner/dummy";
import defaut from "../assets/images/Main/default.png";
import { useNavigate } from "react-router-dom";

const ChatList = () => {
  const navigate = useNavigate();

  return (
    <ul>
      {dummy?.map((data, idx) => {
        return (
          <li
            onClick={() => {
              // navigate(`/${userNick}`);
              navigate(`/room/${data.chatroomNo}`);
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
                {data.sender.userName}
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
