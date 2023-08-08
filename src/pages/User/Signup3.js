import React, { useState } from "react";
import BackTitleHeader from "../../components/BackTitleHeader";
import "../../styles/signup.css";
import "../../styles/AddressStyle.css";
import Post from "../../components/User/Post";
import TextInputComponent from "../../components/TextInputComponent";
import { useRecoilState } from "recoil";
import {
  addresstextAtom,
  detailaddresstextAtom,
  fullAddressAtom,
} from "../../atom/atoms";
import PinkBtn from "../../components/User/PinkBtn";
import { useNavigate } from "react-router-dom";

function Signup3(props) {
  //지번주소
  const [addresstext] = useRecoilState(fullAddressAtom);

  //상세주소
  const [detailaddresstext, setDetailaddresstext] = useRecoilState(
    detailaddresstextAtom
  );
  const handleDetailAddressChange = (e) => {
    setDetailaddresstext(e.target.value);
  };

  //다음 페이지 이동
  const navigate = useNavigate();
  const signupNextPage = () => {
    navigate("/signup4");
  };

  return (
    <>
      <BackTitleHeader title={"3/4"} className="signupStep" />
      <div className="signupContainer">
        <p className="signupLable">거주지를 선택해주세요</p>

        <div className="inputAddr">
          <TextInputComponent
            lable={"주소"}
            placeholder={"주소를 입력해주세요"}
            value={addresstext}
          />
          <Post title="검색하기" />
        </div>

        <TextInputComponent
          lable={"상세주소"}
          placeholder={"상세주소를 입력해주세요"}
          value={detailaddresstext}
          onChange={handleDetailAddressChange}
        />
        <PinkBtn title="다음으로" onClick={signupNextPage} active={true} />
      </div>
    </>
  );
}

export default Signup3;
