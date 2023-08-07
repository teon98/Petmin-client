import React, { useState } from "react";
import BackTitleHeader from "../../components/BackTitleHeader";
import "../../styles/signup.css";
import Post from "../../components/User/Post";
import TextInputComponent from "../../components/TextInputComponent";
import { useRecoilState } from "recoil";
import { addresstextAtom, detailaddresstextAtom } from "../../atom/atoms";

function Signup3(props) {
  //지번주소
  const [addresstext, setAddresstext] = useRecoilState(addresstextAtom);

  //상세주소
  const [detailaddresstext, setDetailaddresstext] = useRecoilState(
    detailaddresstextAtom
  );
  const handleDetailAddressChange = (e) => {
    setDetailaddresstext(e.target.value);
  };
  return (
    <>
      <BackTitleHeader title={"3/4"} className="signupStep" />
      <div className="signupContainer">
        <p className="signupLable">거주지를 선택해주세요</p>
        <TextInputComponent
          lable={"주소"}
          placeholder={"주소를 입력해주세요"}
          value={addresstext}
        />
        {/* <Post title="주소검색" /> */}
      </div>
    </>
  );
}

export default Signup3;
