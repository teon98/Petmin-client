import React, { useEffect, useState } from "react";
import BackTitleHeader from "../../components/BackTitleHeader";
import "../../styles/signup.css";
import TextInputComponent from "../../components/TextInputComponent";
import { useRecoilState } from "recoil";
import { nametextAtom, agetextAtom, gendertextAtom } from "../../atom/atoms";
import PinkBtn from "../../components/User/PinkBtn";
import { useNavigate } from "react-router-dom";
import RadioComponent from "../../components/RadioComponent";

function Signup2(props) {
  //이름
  const [nametext, setNametext] = useRecoilState(nametextAtom);
  const handleNameChange = (e) => {
    setNametext(e.target.value);
  };

  //나이
  const [agetext, setAgetext] = useRecoilState(agetextAtom);
  const [ageValid, setAgeValid] = useState(false);
  const [ageMessage, setAgeMessage] = useState("");
  const handleAgeChange = (e) => {
    setAgetext(e.target.value);
    validateAge(e.target.value);
  };

  const validateAge = (age) => {
    const agePattern = /^(?:[1-9][0-9]?|100)$/;
    setAgeValid(agePattern.test(age));
  };

  useEffect(() => {
    if (!ageValid && agetext !== "") {
      setAgeMessage("1~100 사이로 입력해주세요");
    } else {
      setAgeMessage("");
    }
  }, [ageValid, agetext]);

  //성별
  const [gender, setGender] = useRecoilState(gendertextAtom);
  const handleRadioChange = (e) => {
    const value = e.target.value;
    setGender(value);
  };

  const genderOptions = [
    { name: "gender", value: "남", label: "남" },
    { name: "gender", value: "여", label: "여" },
  ];

  //다음 페이지 이동
  const navigate = useNavigate();
  const signupNextPage = () => {
    navigate("/signup3");
  };

  const [btnState, setBtnState] = useState(false);
  useEffect(() => {
    if (ageValid && agetext !== "" && nametext !== "" && gender !== "") {
      setBtnState(true);
    } else {
      setBtnState(false);
    }
  }, [ageValid, agetext, nametext, gender]);

  return (
    <>
      <BackTitleHeader title={"2/4"} className="signupStep" />
      <div className="signupContainer">
        <p className="signupLable">개인정보를 입력해주세요</p>
        <TextInputComponent
          lable={"이름"}
          placeholder={"이름을 입력해주세요"}
          onChange={handleNameChange}
          value={nametext}
        />
        <TextInputComponent
          lable={"나이"}
          placeholder={"나이를 입력해주세요"}
          onChange={handleAgeChange}
          value={agetext}
          message={ageMessage}
          type="number"
        />

        <div style={{ marginBottom: "30px" }}>
          <RadioComponent
            lable={"성별"}
            options={genderOptions}
            selectedValue={gender}
            onChange={handleRadioChange}
          />
        </div>

        <PinkBtn title="다음으로" onClick={signupNextPage} active={btnState} />
      </div>
    </>
  );
}

export default Signup2;
