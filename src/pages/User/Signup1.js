import React, { useEffect, useState } from "react";
import TextInputComponent from "../../components/TextInputComponent";
import "../../styles/signup.css";
import BackTitleHeader from "../../components/BackTitleHeader";
import PinkBtn from "../../components/User/PinkBtn";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useRecoilState } from "recoil";
import {
  emailtextAtom,
  idtextAtom,
  passwordtextAtom,
  passwordChecktextAtom,
} from "../../atom/atoms";

function Signup1(props) {
  // 이메일
  const [emailtext, setEmailtext] = useRecoilState(emailtextAtom);
  const [emailValid, setEmailValid] = useState(false);
  const [emailMessage, setEmailMessage] = useState("");

  const handleEmailChange = (e) => {
    setEmailtext(e.target.value);
    validateEmail(e.target.value);
  };

  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    setEmailValid(emailPattern.test(email));
  };
  useEffect(() => {
    if (emailValid && emailtext !== "") {
      setEmailMessage("올바른 이메일 형식입니다");
    } else if (!emailValid && emailtext !== "") {
      setEmailMessage("올바르지 않은 이메일 형식입니다");
    } else {
      setEmailMessage("");
    }
  }, [emailValid, emailtext]);

  // 아이디
  const [idtext, setIdtext] = useRecoilState(idtextAtom);
  const [idValid, setIdVaild] = useState(false);
  const [idCheckClicked, setIdCheckClicked] = useState(false);
  const [idMessage, setIdMessage] = useState("");

  const handleIdCheckClick = () => {
    setIdCheckClicked(true);
    IdDuplicateCheck();
  };

  useEffect(() => {
    if (idValid && idCheckClicked && idtext !== "") {
      setIdMessage("중복된 아이디입니다");
    } else if (!idValid && idCheckClicked && idtext !== "") {
      setIdMessage("사용 가능한 아이디입니다");
    } else {
      setIdMessage("");
    }
  }, [idCheckClicked, idValid, idtext]);

  const IdDuplicateCheck = () => {
    axios({
      url: `http://localhost:8888/checkDuplicateId/${idtext}`,
      method: "get",
    })
      .then((response) => {
        setIdVaild(response.data);
      })
      .catch((error) => {
        //console.log(error);
      });
  };

  const handelIdChange = (e) => {
    setIdCheckClicked(false);
    setIdtext(e.target.value);
  };

  //비밀번호
  const [passwordtext, setPasswordtext] = useRecoilState(passwordtextAtom);
  const [passwordType, setPasswordType] = useState("password");
  const [passwordValid, setPasswordValid] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState("");

  const handlePasswordChange = (e) => {
    setPasswordtext(e.target.value);
    validatePassword(e.target.value);
  };

  const validatePassword = (password) => {
    const passwordPattern =
      /^.*(?=^.{8,20}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
    setPasswordValid(passwordPattern.test(password));
  };

  useEffect(() => {
    if (passwordValid && passwordtext !== "") {
      setPasswordMessage("올바른 비밀번호 형식입니다");
    } else if (!passwordValid && passwordtext !== "") {
      setPasswordMessage("올바르지 않은 비밀번호 형식입니다");
    } else {
      setPasswordMessage("");
    }
  }, [passwordValid, passwordtext]);

  const passwordTypeImageClick = () => {
    setPasswordType((preType) => (preType === "password" ? "" : "password"));
  };

  //비밀번호 체크
  const [passwordChecktext, setPasswordChecktext] = useRecoilState(
    passwordChecktextAtom
  );
  const [passwordCheckType, setPasswordCheckType] = useState("password");
  const [passwordCheckValid, setPasswordCheckValid] = useState(false);
  const [passwordCheckMessage, setPasswordCheckMessage] = useState("");

  const handlePasswordCheckChange = (e) => {
    setPasswordChecktext(e.target.value);
    validatePasswordCheck(e.target.value);
  };

  const validatePasswordCheck = (passwordcheck) => {
    setPasswordCheckValid(passwordcheck === passwordtext);
  };

  useEffect(() => {
    if (passwordCheckValid && passwordChecktext !== "") {
      setPasswordCheckMessage("비밀번호와 일치합니다");
    } else if (!passwordCheckValid && passwordChecktext !== "") {
      setPasswordCheckMessage("비밀번호와 일치하지 않습니다");
    } else {
      setPasswordCheckMessage("");
    }
  }, [passwordCheckValid, passwordChecktext]);

  const passwordCheckTypeImageClick = () => {
    setPasswordCheckType((preType) =>
      preType === "password" ? "" : "password"
    );
  };

  //다음페이지로 이동
  const navigate = useNavigate();
  const signupNextPage = () => {
    navigate("/signup2");
  };

  const [btnState, setBtnState] = useState(false);

  useEffect(() => {
    if (
      emailValid &&
      emailtext !== "" &&
      !idValid &&
      idtext !== "" &&
      passwordValid &&
      passwordtext !== "" &&
      passwordCheckValid &&
      passwordChecktext !== "" &&
      idCheckClicked
    ) {
      setBtnState(true);
    } else {
      setBtnState(false);
    }
  }, [
    emailValid,
    emailtext,
    idValid,
    idtext,
    passwordValid,
    passwordtext,
    passwordCheckValid,
    passwordChecktext,
    idCheckClicked,
  ]);

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
          onChange={handleEmailChange}
          placeholder={"이메일 주소를 입력해주세요"}
          type="email"
          message={emailMessage}
        />
        <TextInputComponent
          lable={"아이디"}
          value={idtext}
          onChange={handelIdChange}
          placeholder={"아이디를 입력해주세요"}
          onClick={handleIdCheckClick}
          message={idMessage}
        />
        <TextInputComponent
          lable={"비밀번호"}
          value={passwordtext}
          onChange={handlePasswordChange}
          placeholder={"영문, 숫자, 특수문자 조합 8~20자리"}
          type={passwordType}
          passwordTypeImageClick={passwordTypeImageClick}
          message={passwordMessage}
        />
        <TextInputComponent
          lable={"비밀번호 확인"}
          value={passwordChecktext}
          onChange={handlePasswordCheckChange}
          placeholder={"비밀번호를 다시 입력해주세요"}
          type={passwordCheckType}
          passwordCheckTypeImageClick={passwordCheckTypeImageClick}
          message={passwordCheckMessage}
        />

        {/* 트루일때만 버튼 클릭됨 */}
        {/* 모든 항목이 작성되어야 핑크색 되고 다음으로 넘어갈 수 있도록 */}
        <PinkBtn title="다음으로" onClick={signupNextPage} active={btnState} />
      </div>
    </>
  );
}

export default Signup1;
