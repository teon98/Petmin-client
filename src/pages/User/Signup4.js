import React, { useEffect, useState } from "react";
import BackTitleHeader from "../../components/BackTitleHeader";
import PreferenceRadioComponent from "../../components/RadioComponent";
import { useRecoilState, useResetRecoilState } from "recoil";
import {
  agetextAtom,
  detailaddresstextAtom,
  emailtextAtom,
  fullAddressAtom,
  gendertextAtom,
  idtextAtom,
  nametextAtom,
  passwordChecktextAtom,
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
  const [emailtext] = useRecoilState(emailtextAtom);
  const [idtext] = useRecoilState(idtextAtom);
  const [passwordtext] = useRecoilState(passwordtextAtom);
  const [nametext] = useRecoilState(nametextAtom);
  const [agetext] = useRecoilState(agetextAtom);
  const [gendertext] = useRecoilState(gendertextAtom);
  const [fullAddress] = useRecoilState(fullAddressAtom);
  const [detailAddress] = useRecoilState(detailaddresstextAtom);

  //회원가입 완료 후 값 리셋
  const resetEmail = useResetRecoilState(emailtextAtom);
  const resetId = useResetRecoilState(idtextAtom);
  const resetName = useResetRecoilState(nametextAtom);
  const resetAge = useResetRecoilState(agetextAtom);
  const resetGender = useResetRecoilState(gendertextAtom);
  const resetFullAddress = useResetRecoilState(fullAddressAtom);
  const resetDetailaddress = useResetRecoilState(detailaddresstextAtom);
  const resetPassword = useResetRecoilState(passwordtextAtom);
  const resetPasswordCheck = useResetRecoilState(passwordChecktextAtom);
  const resetPreference1 = useResetRecoilState(preference1Atom);
  const resetPreference2 = useResetRecoilState(preference2Atom);
  const resetPreference3 = useResetRecoilState(preference3Atom);
  const resetPreference4 = useResetRecoilState(preference4Atom);
  const resetPreference5 = useResetRecoilState(preference5Atom);

  const navigate = useNavigate();
  const SignUpBtn = () => {
    axios({
      url: "http://localhost:8888/signup",
      method: "post",
      data: {
        userId: idtext,
        userPass: passwordtext,
        userName: nametext,
        userAge: agetext,
        userAddress: fullAddress,
        userDetailAddress: detailAddress,
        userSex: gendertext,
        userEmail: emailtext,
      },
    })
      .then((res) => {
        //console.log(res.data);
        SavePreference();
      })
      .catch((err) => {
        //console.log(err);
      });
  };

  const SavePreference = () => {
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
        //console.log(res.data);
        resetEmail();
        resetId();
        resetName();
        resetAge();
        resetGender();
        resetFullAddress();
        resetDetailaddress();
        resetPassword();
        resetPasswordCheck();
        resetPreference1();
        resetPreference2();
        resetPreference3();
        resetPreference4();
        resetPreference5();
        navigate("/login");
      })
      .catch((err) => {
        //console.log(err);
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
        {/* 펫시터 성별 */}
        <PreferenceRadioComponent
          options={petSitterGenderOptions}
          selectedValue={preference1}
          onChange={petSitterGenderChange}
          lable={"선호하는 펫시터"}
        />
        {/* 연령대 */}
        <PreferenceRadioComponent
          options={petSitterAgeOptions}
          selectedValue={preference2}
          onChange={petSitterAgeChange}
        />

        {/* 주택유형*/}
        <PreferenceRadioComponent
          options={petSitterHouseOptions}
          selectedValue={preference3}
          onChange={petSitterHouseChange}
        />

        {/* 펫시터의 강아지 성별*/}
        <div style={{ marginTop: "30px", marginBottom: "30px" }}>
          <PreferenceRadioComponent
            options={petSitterDogGenderOptions}
            selectedValue={preference4}
            onChange={petSitterDogGenderChange}
            lable={"선호하는 펫시터의 펫"}
          />

          {/* 펫시터의 강아지 크기*/}
          <PreferenceRadioComponent
            options={petSitterDogSizeOptions}
            selectedValue={preference5}
            onChange={petSitterDogSizeChange}
          />
        </div>
        <PinkBtn title="완료하기" active={btnState} onClick={SignUpBtn} />
      </div>
    </>
  );
}

export default Signup4;
