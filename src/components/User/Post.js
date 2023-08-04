import React, { useState } from "react";
import PopupDom from "./PopupDom";
import PopupPostCode from "./PopupPostCode";
import { styled } from "styled-components";
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
      <PostBtn type="button" onClick={openPostCode}>
        {props.title}
      </PostBtn>

      <div id="popupDom">
        {isPopupOpen && (
          <PopupDom>
            <PopupPostCode onClose={closePostCode} />
          </PopupDom>
        )}
      </div>
    </div>
  );
};

export default Post;
