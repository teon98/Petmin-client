import React, { useState } from "react";
import TextInputComponent from "../components/TextInputComponent";
import "../styles/signup.css";
import BackTitleHeader from "../components/BackTitleHeader";

function Signup(props) {
  const [emailtext, setEmailtext] = useState("");
  const [idtext, setIdtext] = useState("");
  const [passwordtext, setPasswordtext] = useState("");
  return (
    <>
      <BackTitleHeader title={"1/4"} className="signupStep" />
      {/* 이거 왼쪽가는 걸로 바꿔주세요 */}
      <div className="signupContainer">
        <p className="signupLable">
          이메일과 비밀번호를
          <br />
          입력해주세요
        </p>
        <TextInputComponent
          lable={"이메일"}
          value={emailtext}
          onChange={setEmailtext}
          placeholder={"이메일 주소를 입력해주세요"}
        />
        <TextInputComponent
          lable={"아이디"}
          value={idtext}
          onChange={setIdtext}
          placeholder={"아이디를 입력해주세요"}
        />
        <TextInputComponent
          lable={"비밀번호"}
          value={passwordtext}
          onChange={setPasswordtext}
          placeholder={"영문, 숫자, 특수문자 조합 8~20자리"}
          type="password"
        />
      </div>
    </>
  );
}

export default Signup;
