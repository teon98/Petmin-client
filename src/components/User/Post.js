import React, { useState } from "react";
import PopupDom from "./PopupDom";
import PopupPostCode from "./PopupPostCode";
import { styled } from "styled-components";
import { useLocation } from "react-router-dom";
import TextInputComponent from "../TextInputComponent";
/* Rectangle 24 */

const PostBtn = styled.button`
  padding: 5px 10px;
  font-family: PreMedium;
  font-size: 18px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  color: #fff;
  background: #b3b3b3;
  border: none;
  transition: all 0.2s ease-in-out;
  width: 100px;
  margin-top: 20px;
  margin-left: 10px;
  .my {
    margin-top: 0;
  }

  &:hover {
    background: #ff8989;
    border-color: #ff8989;
    color: #fff;
    cursor: pointer;
  }
`;

const PostInput = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 40px;
  align-items: center;

  p {
    width: 100%;
    font-family: PreMedium;
    font-size: 15px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }

  input {
    height: 50px;
    display: inline-block;
    width: 60%;
    border-style: none;
    border-bottom: 1px solid #b3b3b3;
    font-family: PreMedium;
    font-weight: 500px;
    font-size: 17px;
    box-sizing: border-box;
    margin-right: 10px;
  }
`;
const Post = (props) => {
  // 팝업창 상태 관리
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [addr, setAddr] = useState("");
  const nav = useLocation();
  const myinfo = nav.pathname === "/myinfo";

  // 팝업창 열기
  const openPostCode = () => {
    setIsPopupOpen(true);
  };

  // 팝업창 닫기
  const closePostCode = () => {
    setIsPopupOpen(false);
  };

  return (
    <div>
      {/* /myinfo일때만 input 창 보이기 */}
      {myinfo && (
        <PostInput>
          <p className="textInputLable">주소</p>{" "}
          <input readOnly value={addr} placeholder={props.placeholder} />
          <PostBtn type="button" onClick={openPostCode}>
            {props.title}
          </PostBtn>
        </PostInput>
      )}
      {nav.pathname !== "/myinfo" && (
        <PostBtn
          type="button"
          onClick={openPostCode}
          className={myinfo ? "my" : ""}
        >
          {props.title}
        </PostBtn>
      )}

      <div id="popupDom">
        {isPopupOpen && (
          <PopupDom>
            <PopupPostCode onClose={closePostCode} setAddr={setAddr} />
          </PopupDom>
        )}
      </div>
    </div>
  );
};

export default Post;
