import React from "react";
import BackTitleHeader from "../../components/BackTitleHeader";
import "../../styles/signup.css";
import Post from "../../components/User/Post";
import TextInputComponent from "../../components/TextInputComponent";

function Signup3(props) {
  return (
    <>
      <BackTitleHeader title={"3/4"} className="signupStep" />
      <div className="signupContainer">
        <p className="signupLable">거주지를 선택해주세요</p>
        <TextInputComponent
          lable={"주소"}
          placeholder={"주소를 입력해주세요"}
        />
        <TextInputComponent
          lable={"상세주소"}
          placeholder={"상세주소를 입력해주세요"}
        />
        <Post />
      </div>
    </>
  );
}

export default Signup3;
