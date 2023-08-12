import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { petVaccineValueList1Atom } from "../../atom/atoms";
import BackTitleHeader2 from "../../components/BackTitleHeader2";
import QuestionFooter from "../../components/QuestionFooter";
import { useNavigate } from "react-router";
import CheckBoxComponent from "../../components/CheckBoxComponent";

function PetVaccine1() {
  const petVaccine1Options = [
    {
      name: "petVaccine1",
      value: "광견병(1년 이내 접종완료)",
      label: "광견병(1년 이내 접종완료)",
    },
    {
      name: "petVaccine1",
      value: "종합백신(2년 이내 접종완료)",
      label: "종합백신(2년 이내 접종완료)",
    },
    {
      name: "petVaccine1",
      value: "코로나(2년 이내 접종완료)",
      label: "코로나(2년 이내 접종완료)",
    },
    {
      name: "petVaccine1",
      value: "켄넬코프(2년 이내 접종완료)",
      label: "켄넬코프(2년 이내 접종완료)",
    },
    {
      name: "petVaccine1",
      value: "접종을 하지 않았습니다.",
      label: "접종을 하지 않았습니다.",
    },
  ];

  const [checkValueList, setCheckValueList] = useRecoilState(
    petVaccineValueList1Atom
  );

  const navigate = useNavigate();
  const moveToNextPage = () => {
    navigate("/petvaccine2");
  };

  const [btnState, setBtnState] = useState(false);
  useEffect(() => {
    if (checkValueList.length > 0) {
      setBtnState(true);
    } else {
      setBtnState(false);
    }
  }, [checkValueList]);

  return (
    <>
      <BackTitleHeader2
        title={"반려동물 예방접종 설문지"}
        subtitle={"1/3"}
        className="signupStep"
      />
      <div className="registerContainer">
        <CheckBoxComponent
          questionNumber={"Q1"}
          questionText1={"지금까지 완료하신"}
          questionText2={"예방 접종 여부를 선택해주세요"}
          options={petVaccine1Options}
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

export default PetVaccine1;
