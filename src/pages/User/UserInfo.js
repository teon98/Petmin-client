import React from "react";
import styles from "../../styles/MypageMenu.module.css";
import { styled } from "styled-components";
import BackTitleHeader from "../../components/BackTitleHeader";
import Post from "../../components/User/Post";
import TextInputComponent from "../../components/TextInputComponent";

const Info = styled.div`
  div {
    line-height: 35px;
  }
  .inputContainer {
    margin-left: 40px;
    margin-right: 40px;

    input {
      pointer-events: none;
    }

    .inputAddr {
      display: flex;
      justify-content: space-around;

      input {
        display: inline-block;
        margin-left: 0;
      }
    }
  }
  .inputContainer .detail {
    input {
      pointer-events: auto;
    }
  }
`;

function UserInfo(props) {
  return (
    <div>
      <BackTitleHeader />
      <Info>
        <div id={styles.title}>
          태민님,
          <br />
          안녕하세요!
        </div>
        <div className="inputContainer">
          <TextInputComponent lable="이메일" value="ltm0718@shinee.com" />
          <div className="inputAddr">
            <TextInputComponent lable="내 주소" value="ltm0718@shinee.com" />
            <Post title="수정하기" />
          </div>
          <div className="detail">
            <TextInputComponent lable="상세 주소" value="ltm0718@shinee.com" />
          </div>
          <TextInputComponent lable="선호 동네" value="ltm0718@shinee.com" />
        </div>
      </Info>
    </div>
  );
}

export default UserInfo;
