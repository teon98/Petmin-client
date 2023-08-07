import React from "react";
import DaumPostcode from "react-daum-postcode";
import { styled } from "styled-components";
import { useLocation } from "react-router";

const PostBtn = styled.button`
  margin: ${
    useLocation.pathname === "/signup3"
      ? " -85px 0px auto auto;"
      : "-335px -20px auto auto;"
  }
  padding: 5px 10px;
  display: block;
  font-family: PreMedium;
  font-size: 18px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  background: #b3b3b3;
  border: none;
  color: #fff;
  transition: all 0.2s ease-in-out;

  &:hover {
    background: #ff8989;
    border-color: #ff8989;
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
    top: "15%",
    width: "412px",
    height: "600px",
    padding: "7px",
    marginLeft: "-268px",
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
