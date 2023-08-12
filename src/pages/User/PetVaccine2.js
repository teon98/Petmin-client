import React, { useEffect, useState } from "react";
import QuestionComponent from "../../components/QuestionComponent";
import { useRecoilState } from "recoil";
import { petVaccine2Atom, petVaccineValueList2Atom } from "../../atom/atoms";
import BackTitleHeader2 from "../../components/BackTitleHeader2";
import QuestionFooter from "../../components/QuestionFooter";
import { useNavigate } from "react-router";
import CheckBoxComponent from "../../components/CheckBoxComponent";

function PetVaccine2(props) {
  const [petVaccine2, setPetVaccine2] = useRecoilState(petVaccine2Atom);
  const petVaccine2Options = [
    {
      name: "petVaccine2",
      value: "심장사상충(매월 1회 접종완료)",
      label: "심장사상충(매월 1회 접종완료)",
    },
    {
      name: "petVaccine2",
      value: "외부기생충(매월 1회 접종완료)",
      label: "외부기생충(매월 1회 접종완료)",
    },
  ];
  const petVaccine2Change = (e) => {
    const value = e.target.value;
    setPetVaccine2(value);
  };

  const navigate = useNavigate();
  const moveToNextPage = () => {
    navigate("/petvaccine3");
  };

  const [btnState, setBtnState] = useState(false);
  useEffect(() => {
    if (petVaccine2 !== "") {
      setBtnState(true);
    } else {
      setBtnState(false);
    }
  }, [petVaccine2]);

  const [checkValueList, setCheckValueList] = useRecoilState(
    petVaccineValueList2Atom
  );

  return (
    <>
      <BackTitleHeader2
        title={"반려동물 예방접종 설문지"}
        subtitle={"2/3"}
        className="signupStep"
      />
      <div className="registerContainer">
        <CheckBoxComponent
          questionNumber={"Q2"}
          questionText1={"내/외부 기생충 관련"}
          questionText2={"예방 접종 여부를 선택해주세요"}
          options={petVaccine2Options}
          checkValueList={checkValueList}
          setCheckValueList={setCheckValueList}
        />
      </div>
      <QuestionFooter
        title="다음으로"
        active={btnState}
        onClick={moveToNextPage}
      />
    </>
  );
}

export default PetVaccine2;
