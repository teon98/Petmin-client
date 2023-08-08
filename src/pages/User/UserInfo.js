import React, { useEffect, useRef, useState } from "react";
import styles from "../../styles/MypageMenu.module.css";
import { styled } from "styled-components";
import BackTitleHeader from "../../components/BackTitleHeader";
import Post from "../../components/User/Post";
import TextInputComponent from "../../components/TextInputComponent";
import UserImg from "../../assets/images/person.png";
import PhotoCamera from "../../assets/images/photo_camera.png";
import PinkBtn from "../../components/User/PinkBtn";
import {
  detailaddresstextAtom,
  emailtextAtom,
  fullAddressAtom,
  idtextAtom,
  userAddrAtom,
  userDetailAddrAtom,
} from "../../atom/atoms";
import { useRecoilState } from "recoil";
import axios from "axios";

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
  const [userId, setUserId] = useRecoilState(idtextAtom);
  //화면에 띄울 img
  const [imgFile, setImgFile] = useState("");
  //img 경로? 인듯
  const [imgUrl, setImgUrl] = useState("");
  //DB에서 가져온 주소
  const [addr, setAddr] = useRecoilState(userAddrAtom);
  const [detailAddr, setDetailAddr] = useRecoilState(userDetailAddrAtom);
  //수정하지 않는다면 DB값으로 써야 함. 그러므로 Recoil을 함부로 변화시키지 않으려고 sub만듬
  const [subAddr, setSbuAddr] = useState(addr);
  const [subDetailAddr, setSubdetailAddr] = useState(detailAddr);
  //검색한 주소
  const [searchAddr, setSearchAddr] = useRecoilState(fullAddressAtom);

  const [email, setEmail] = useRecoilState(emailtextAtom);
  const imgRef = useRef();

  const onChange = (e) => {
    setSubdetailAddr(() => e.target.value);
  };

  //이미지 업로드 input의 onChange
  const saveImgFile = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgUrl(file);
      setImgFile(reader.result);
    };
  };

  const onClick = (e) => {
    var formdata = new FormData();
    formdata.append("userImg", imgUrl);
    formdata.append("userId", "adminID");
    formdata.append("userAddress", searchAddr);
    formdata.append("userDetailAddress", subDetailAddr);

    axios.put("/user/updateInfo", formdata, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  return (
    <div>
      <BackTitleHeader />
      <Info>
        <div id={styles.title} style={{ display: "inline-block" }}>
          {userId}님,
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
          <TextInputComponent lable="이메일" value={email} />
          <div className="inputAddr">
            <Post title="검색하기" placeholder={addr} />
          </div>
          <div className="detail">
            <TextInputComponent
              lable="상세 주소"
              value={subDetailAddr}
              onChange={onChange}
            />
          </div>
        </div>
        <PinkBtn title="수정하기" onClick={onClick} active={true} />
      </Info>
    </div>
  );
}

export default UserInfo;
