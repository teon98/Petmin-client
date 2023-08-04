import React from "react";
import DaumPostcode from "react-daum-postcode";
import { styled } from "styled-components";

const PostBtn = styled.button`
  margin: -225px 20px auto auto;
  padding: 3px 10px;
  display: block;
  border: 2px solid #b3b3b3;
  font-family: PreMedium;
  font-size: 18px;
  border-radius: 5px;
  color: #b3b3b3;
  background: #fff;
  transition: all 0.2s ease-in-out;

  &:hover {
    background: #b3b3b3;
    color: #fff;
    cursor: pointer;
  }
`;

const PopupPostCode = (props) => {
  // 우편번호 검색 후 주소 클릭 시 실행될 함수, data callback 용
  const handlePostCode = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    console.log(data);
    console.log(fullAddress);
    console.log(data.zonecode);
    props.onClose();
  };

  const postCodeStyle = {
    display: "block",
    position: "absolute",
    top: "10%",
    width: "412px",
    height: "600px",
    padding: "7px",
  };

  return (
    <div>
      <DaumPostcode style={postCodeStyle} onComplete={handlePostCode} />
      <PostBtn
        type="button"
        onClick={() => {
          props.onClose();
        }}
        className="postCode_btn"
      >
        닫기
      </PostBtn>
    </div>
  );
};

export default PopupPostCode;
