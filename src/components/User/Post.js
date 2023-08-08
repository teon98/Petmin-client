import React, { useState } from "react";
import PopupDom from "./PopupDom";
import PopupPostCode from "./PopupPostCode";
import { styled } from "styled-components";
import { useLocation } from "react-router-dom";
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
  margin-top: 25px;
  margin-left: 10px;

  &:hover {
    background: #ff8989;
    border-color: #ff8989;
    color: #fff;
    cursor: pointer;
  }
`;
const Post = (props) => {
  // 팝업창 상태 관리
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [addr, setAddr] = useState("");
  const nav = useLocation();

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
      {nav.pathname === "/myinfo" && (
        <input readOnly value={addr} placeholder={props.placeholder} />
      )}
      <PostBtn type="button" onClick={openPostCode}>
        {props.title}
      </PostBtn>

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
