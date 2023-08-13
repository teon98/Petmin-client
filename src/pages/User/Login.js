import React, { useEffect, useState } from "react";
import PinkBtn from "../../components/User/PinkBtn";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import logoImg from "../../assets/images/logo.png";
import { useRecoilState } from "recoil";
import {
  idtextAtom,
  nametextAtom,
  agetextAtom,
  emailtextAtom,
  gendertextAtom,
  userDetailAddrAtom,
  userAddrAtom,
  userImgAtom,
  licenceAtom,
  userCardNumber,
} from "../../atom/atoms";

const LoginForm = styled.div`
  margin-top: 50%;

  img {
    display: block;
    margin: auto;
    margin-bottom: 50px;
  }

  input {
    display: block;
    margin: 10px auto;
    width: 313px;
    height: 40px;
    border: 2px solid #b3b3b3;
    border-radius: 10px;
    padding-left: 10px;
    padding-right: 10px;
    box-sizing: border-box;
    font-family: PreMedium;
  }

  :nth-child(3) {
    margin-bottom: 50px;
  }

  p {
    font-size: 12px;
    color: #b3b3b3;
    font-family: PreMedium;
    text-align: center;
    margin-top: 20px;

    a {
      color: #ff8989;
      text-decoration: none;
    }

    &.errMsg {
      color: red;
    }
  }
`;

function Login(props) {
  //recoil로 저장
  const [userId, setUserId] = useRecoilState(idtextAtom);
  const [userName, setUserName] = useRecoilState(nametextAtom);
  const [userAge, setUserAge] = useRecoilState(agetextAtom);
  const [gender, setGender] = useRecoilState(gendertextAtom);
  const [detailAddr, setDetailAddr] = useRecoilState(userDetailAddrAtom);
  const [fullAddr, setFullAddr] = useRecoilState(userAddrAtom);
  const [email, setEmail] = useRecoilState(emailtextAtom);
  const [licence, setLicence] = useRecoilState(licenceAtom);
  const [img, setImg] = useRecoilState(userImgAtom);
  const [cardNumber, setCardNumber] = useRecoilState(userCardNumber);

  const [pwd, setPwd] = useState("");
  const [btnState, setBtnState] = useState(false);
  const [msg, setMsg] = useState("");
  const nav = useNavigate();

  //userId,pwd 값
  const onChangeInput = (e) => {
    const value = e.target.value.trim();

    if (e.target.name === "userId") {
      setUserId(() => value);
      changeBtnState(value, pwd);
    } else {
      setPwd(() => value);
      changeBtnState(userId, value);
    }
  };

  //id, pwd 모두 값이 있어야만 로그인하기 활성화
  const changeBtnState = (val1, val2) => {
    if (val1 !== "" && val2 !== "") {
      setBtnState(() => true);
    } else {
      setBtnState(() => false);
    }
  };

  //로그인 요청
  const onLogin = () => {
    axios({
      url: "/login",
      method: "post",
      data: {
        userId: userId,
        userPass: pwd,
      },
    })
      .then((res) => {
        if (res.data === "") {
          setMsg(() => "아이디 혹은 비밀번호를 확인해주세요.");
        } else {
          setUserId(() => res.data.userId);
          setUserName(() => res.data.userName);
          setUserAge(() => res.data.userAge);
          setGender(() => res.data.userSex);
          setDetailAddr(() => res.data.userDetailAddress);
          setFullAddr(() => res.data.userAddress);
          setEmail(() => res.data.userEmail);
          setLicence(() => res.data.userLicence);
          setPwd(() => "");
          setImg(() => res.data.userImg);
          setCardNumber(() => res.data.userCardNumber);
          console.log(res.data);
          nav("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <LoginForm>
      <img src={logoImg} alt="로고" />
      <input
        name="userId"
        type="text"
        placeholder="아이디"
        value={userId}
        onChange={onChangeInput}
      />
      <input
        name="userPwd"
        type="password"
        placeholder="비밀번호"
        value={pwd}
        onChange={onChangeInput}
      />
      <PinkBtn title="로그인 하기" onClick={onLogin} active={btnState} />
      <p>
        아직 계정이 없으신가요? <Link to="/signup1">회원가입하기</Link>
      </p>
      <p className="errMsg">{msg}</p>
    </LoginForm>
  );
}

export default Login;
