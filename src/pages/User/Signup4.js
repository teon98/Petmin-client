import React, { useEffect, useState } from "react";
import BackTitleHeader from "../../components/BackTitleHeader";
import RadioComponent from "../../components/RadioComponent";
import { useRecoilState } from "recoil";
import {
  agetextAtom,
  emailtextAtom,
  gendertextAtom,
  idtextAtom,
  nametextAtom,
  passwordtextAtom,
  preference1Atom,
  preference2Atom,
  preference3Atom,
  preference4Atom,
  preference5Atom,
} from "../../atom/atoms";
import PinkBtn from "../../components/User/PinkBtn";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup4(props) {
  //펫시터 성별
  const [preference1, setPreference1] = useRecoilState(preference1Atom);
  const petSitterGenderChange = (e) => {
    const value = e.target.value;
    setPreference1(value);
  };
  const petSitterGenderOptions = [
    { name: "preference1", value: "남", label: "남" },
    { name: "preference1", value: "여", label: "여" },
  ];

  //연령대
  const [preference2, setPreference2] = useRecoilState(preference2Atom);
  const petSitterAgeChange = (e) => {
    const value = e.target.value;
    setPreference2(value);
  };
  const petSitterAgeOptions = [
    { name: "preference2", value: "20", label: "20+" },
    { name: "preference2", value: "30", label: "30+" },
    { name: "preference2", value: "40", label: "40+" },
    { name: "preference2", value: "50", label: "50+" },
    { name: "preference2", value: "60", label: "60+" },
  ];

  //주택유형
  const [preference3, setPreference3] = useRecoilState(preference3Atom);
  const petSitterHouseChange = (e) => {
    const value = e.target.value;
    setPreference3(value);
  };
  const petSitterHouseOptions = [
    { name: "preference3", value: "마당있는집", label: "마당있는집" },
    { name: "preference3", value: "아파트", label: "아파트" },
    { name: "preference3", value: "단독주택", label: "단독주택" },
  ];

  //펫시터의 강아지 성별
  const [preference4, setPreference4] = useRecoilState(preference4Atom);
  const petSitterDogGenderChange = (e) => {
    const value = e.target.value;
    setPreference4(value);
  };
  const petSitterDogGenderOptions = [
    { name: "preference4", value: "남아", label: "남아" },
    { name: "preference4", value: "여아", label: "여아" },
    { name: "preference4", value: "중성화", label: "중성화" },
  ];

  //펫시터의 강아지 크기
  const [preference5, setPreference5] = useRecoilState(preference5Atom);
  const petSitterDogSizeChange = (e) => {
    const value = e.target.value;
    setPreference5(value);
  };
  const petSitterDogSizeOptions = [
    { name: "preference5", value: "소형견", label: "소형견" },
    { name: "preference5", value: "중형견", label: "중형견" },
    { name: "preference5", value: "대형견", label: "대형견" },
  ];

  //회원가입 완료 버튼
  const [emailtext, setEmailtext] = useRecoilState(emailtextAtom);
  const [idtext, setIdtext] = useRecoilState(idtextAtom);
  const [passwordtext, setPasswordtext] = useRecoilState(passwordtextAtom);
  const [nametext, setNametext] = useRecoilState(nametextAtom);
  const [agetext, setAgetext] = useRecoilState(agetextAtom);
  const [gendertext, setGendertext] = useRecoilState(gendertextAtom);
  //주소는 아직 보류

  const navigate = useNavigate();
  const SignUpBtn = () => {
    axios({
      url: "http://localhost:8888/signup",
      method: "post",
      data: {
        //메일은 테이블에 없는데 왜 받은겨
        userId: idtext,
        userPass: passwordtext,
        userName: nametext,
        userAge: agetext,
        //userAddress: "부천",
        userSex: gendertext,
      },
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios({
      url: `http://localhost:8888/preferenceSave/${idtext}`,
      method: "post",
      data: {
        preference1: preference1,
        preference2: preference2,
        preference3: preference3,
        preference4: preference4,
        preference5: preference5,
      },
    })
      .then((res) => {
        console.log(res.data);
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [btnState, setBtnState] = useState(false);
  useEffect(() => {
    if (
      preference1 !== "" &&
      preference2 !== "" &&
      preference3 !== "" &&
      preference4 !== "" &&
      preference5 !== ""
    ) {
      setBtnState(true);
    } else {
      setBtnState(false);
    }
  }, [preference1, preference2, preference3, preference4, preference5]);

  return (
    <>
      <BackTitleHeader title={"4/4"} className="signupStep" />
      <div className="signupContainer">
        <p className="signupLable">
          선호하는 펫시터를
          <br />
          선택해주세요
        </p>
        <p className="smallLable">선호하는 펫시터</p>
        {/* 펫시터 성별 */}
        <RadioComponent
          options={petSitterGenderOptions}
          selectedValue={preference1}
          onChange={petSitterGenderChange}
        />
        {/* 연령대 */}
        <RadioComponent
          options={petSitterAgeOptions}
          selectedValue={preference2}
          onChange={petSitterAgeChange}
        />

        {/* 주택유형*/}
        <RadioComponent
          options={petSitterHouseOptions}
          selectedValue={preference3}
          onChange={petSitterHouseChange}
        />

        <p className="smallLable">선호하는 펫시터의 펫</p>
        {/* 펫시터의 강아지 성별*/}
        <RadioComponent
          options={petSitterDogGenderOptions}
          selectedValue={preference4}
          onChange={petSitterDogGenderChange}
        />

        {/* 펫시터의 강아지 크기*/}
        <RadioComponent
          options={petSitterDogSizeOptions}
          selectedValue={preference5}
          onChange={petSitterDogSizeChange}
        />
        <p>{emailtext}</p>
        <p>{idtext}</p>
        <p>{passwordtext}</p>
        <p>{nametext}</p>
        <p>{agetext}</p>
        <p>{gendertext}</p>
        <PinkBtn title="완료하기" active={btnState} onClick={SignUpBtn} />
      </div>
    </>
  );
}

export default Signup4;
