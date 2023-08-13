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
  nametextAtom,
  userAddrAtom,
  userDetailAddrAtom,
  userImgAtom,
} from "../../atom/atoms";
import { useRecoilState } from "recoil";
import axios from "axios";

const Msg = styled.p`
  font-size: 12px;
  font-family: PreMedium;
  text-align: center;
  margin-top: 20px;
  display: none;

  &.successMsg {
    display: block;
    color: red;
  }
`;
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

    &.inputAddr {
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
  const userName = useRecoilState(nametextAtom);
  //화면에 띄울 img
  const [imgFile, setImgFile] = useRecoilState(userImgAtom);
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
  const [successMsg, setSuccessMsg] = useState(false);
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

  //정보 수정완료 메시지 띄우고, 2초 후에 다시 안보이게
  const changeSuccessMsg = useEffect(() => {
    if (successMsg) {
      setTimeout(() => {
        setSuccessMsg(false);
      }, 2000);
    }
  }, [successMsg]);

  const onClick = (e) => {
    var formdata = new FormData();
    if(searchAddr === "" && imgUrl === ""){
      //아무것도 수정하지 않았을 경우
      return
    } 
    //주소만 수정 했을 경우
    else if (imgUrl === "") {
      axios({
        method: "put",
        url: "/user/updateInfo",
        data: {
          userId: userId,
          userAddress: searchAddr,
          userDetailAddress: subDetailAddr,
        },
      }).then((res) => {
        setAddr(searchAddr);
        setDetailAddr(subDetailAddr);
        setSuccessMsg(true);
      });
    } 
    else {
      //이미지만 수정했을 경우
      if(searchAddr === ""){
        formdata.append("userImg", imgUrl);
        formdata.append("userId", userId);
        formdata.append("userAddress", addr);
        formdata.append("userDetailAddress", detailAddr);
  
        axios
          .put("/user/updateInfoAll", formdata, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            setImgFile(res.data.userImg);
            setSuccessMsg(true);
          });
      }else {
            //이미지, 주소 수정 했을 경우
            formdata.append("userImg", imgUrl);
            formdata.append("userId", userId);
            formdata.append("userAddress", searchAddr);
            formdata.append("userDetailAddress", subDetailAddr);

            axios
              .put("/user/updateInfoAll", formdata, {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              })
              .then((res) => {

                // setAddr(searchAddr ? searchAddr : subAddr);
                setAddr(searchAddr);
                setDetailAddr(subDetailAddr);
                setImgFile(res.data.userImg);
                setSuccessMsg(true);
              });
            }
      }
     
  };

  return (
    <div>
      <BackTitleHeader />
      <Info>
        <div id={styles.title} style={{ display: "inline-block" }}>
          {userName}님,
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
        <Msg className={successMsg ? "successMsg" : ""}>
          정보수정이 완료되었습니다.
        </Msg>
      </Info>
    </div>
  );
}

export default UserInfo;
