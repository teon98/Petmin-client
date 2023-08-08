import React, { useRef, useState } from "react";
import styles from "../../styles/MypageMenu.module.css";
import { styled } from "styled-components";
import BackTitleHeader from "../../components/BackTitleHeader";
import Post from "../../components/User/Post";
import TextInputComponent from "../../components/TextInputComponent";
import UserImg from "../../assets/images/person.png";
import PhotoCamera from "../../assets/images/photo_camera.png";
import PinkBtn from "../../components/User/PinkBtn";

const Info = styled.div`
  div {
    line-height: 35px;
  }
  .inputContainer {
    margin-left: 40px;
    margin-right: 40px;

    input {
      pointer-events: none;

      &: {
        pointer-events: auto;
      }
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

  form {
    display: inline-block;
    padding-top: 105px;
    margin-bottom: 35px;
    vertical-align: middle;
    padding-left: 80px;

    label {
      display: inline-block;
      width: 30px;
      height: 30px;
      margin-left: -20px;
      background-image: url(${PhotoCamera});
      background-repeat: no-repeat;
      background-size: cover;
      cursor: pointer;
    }

    input {
      display: none;
    }

    img {
      width: 72px;
      height: 72px;
      object-fit: cover;
      background: #ccc;
      border-radius: 50%;
    }
  }
  .inputContainer .detail {
    input {
      pointer-events: auto;
    }
  }
`;

function UserInfo(props) {
  const [imgFile, setImgFile] = useState("");
  const imgRef = useRef();

  const [detailAddr, setDetailAddr] = useState("");
  const onChange = (e) => {
    setDetailAddr(e.target.value);
  };

  //이미지 업로드 input의 onChange
  const saveImgFile = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgFile(reader.result);
    };
  };

  const onClick = (e) => {
    console.log();
  };

  return (
    <div>
      <BackTitleHeader />
      <Info>
        <div id={styles.title} style={{ display: "inline-block" }}>
          태민님,
          <br />
          안녕하세요!
        </div>
        <form>
          <img src={imgFile ? imgFile : UserImg} alt="프로필 이미지" />
          <label htmlFor="profileImg" />
          <input
            type="file"
            accept="image/*"
            id="profileImg"
            onChange={saveImgFile}
            ref={imgRef}
          />
        </form>
        <div className="inputContainer">
          <TextInputComponent lable="이메일" value="ltm0718@shinee.com" />
          <div className="inputAddr">
            <TextInputComponent lable="내 주소" value="ltm0718@shinee.com" />
            <Post title="검색하기" />
          </div>
          <div className="detail">
            <TextInputComponent
              lable="상세 주소"
              placeholder={"홍대"}
              value={detailAddr}
              onChange={onChange}
            />
          </div>
          <TextInputComponent lable="선호 동네" value="ltm0718@shinee.com" />
        </div>
        <PinkBtn title="수정하기" onClick={onClick} active={true} />
      </Info>
    </div>
  );
}

export default UserInfo;
