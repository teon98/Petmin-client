import React from "react";
import DaumPostcode from "react-daum-postcode";
import { styled } from "styled-components";
import { useLocation } from "react-router";
import { fullAddressAtom } from "../../atom/atoms";
import { useRecoilState } from "recoil";

//myinfo일 때
const PostBtn = styled.button`
  margin: -405px -20px auto auto;
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

//signu3일때
const PostSignBtn = styled.button`
  margin: -95px -30px auto auto;
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
  const location = useLocation().pathname === "/myinfo";
  let [fullAddress, setFullAddress] = useRecoilState(fullAddressAtom);
  // 우편번호 검색 후 주소 클릭 시 실행될 함수, data callback 용
  const handlePostCode = (data) => {
    // let fullAddress = data.address;
    fullAddress = data.address;
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
    //console.log(data);
    //console.log(fullAddress);
    //console.log(data.zonecode);
    setFullAddress(fullAddress);
    props.setAddr(fullAddress);
    props.onClose();
  };

  const postCodeStyle = {
    display: "block",
    position: "absolute",
    top: "15%",
    width: "100%",
    height: "600px",
    padding: "7px",
    marginLeft: location ? "-47px" : "-268px",
  };

  return (
    <div>
      <DaumPostcode style={postCodeStyle} onComplete={handlePostCode} />
      {location ? (
        <PostBtn
          type="button"
          onClick={() => {
            props.onClose();
          }}
          className="postCode_btn"
        >
          닫기
        </PostBtn>
      ) : (
        <PostSignBtn
          type="button"
          onClick={() => {
            props.onClose();
          }}
          className="postCode_btn"
        >
          닫기
        </PostSignBtn>
      )}
    </div>
  );
};

export default PopupPostCode;
