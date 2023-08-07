import React from "react";
import BackTitleHeader from "../../components/BackTitleHeader";

function Signup4(props) {
  return (
    <>
      <BackTitleHeader title={"4/4"} className="signupStep" />
      <div className="signupContainer">
        <p className="signupLable">
          선호하는 펫시터를
          <br />
          선택해주세요
        </p>
        <p>선호하는 펫시터</p>
      </div>
    </>
  );
}

export default Signup4;
