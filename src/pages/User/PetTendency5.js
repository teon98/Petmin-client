import React, { useEffect, useState } from "react";
import QuestionComponent from "../../components/QuestionComponent";
import { useRecoilState } from "recoil";
import { petTendency5Atom } from "../../atom/atoms";
import BackTitleHeader2 from "../../components/BackTitleHeader2";
import QuestionFooter from "../../components/QuestionFooter";
import { useNavigate } from "react-router";

function PetTendency5(props) {
  const [petTendency5, setPetTendency5] = useRecoilState(petTendency5Atom);
  const petTendency5Options = [
    {
      name: "petTendency5",
      value: "배변패드에 잘 가려요",
      label: "배변패드에 잘 가려요",
    },
    {
      name: "petTendency5",
      value: "아직 배변 실수가 있어요",
      label: "아직 배변 실수가 있어요",
    },
    {
      name: "petTendency5",
      value: "실외 배변만 해요",
      label: "실외 배변만 해요",
    },
  ];
  const petTendency5Change = (e) => {
    const value = e.target.value;
    setPetTendency5(value);
  };

  const navigate = useNavigate();
  const moveToNextPage = () => {
    navigate("/pettendency6");
  };

  const [btnState, setBtnState] = useState(false);
  useEffect(() => {
    if (petTendency5 !== "") {
      setBtnState(true);
    } else {
      setBtnState(false);
    }
  }, [petTendency5]);

  return (
    <>
      <BackTitleHeader2
        title={"반려동물 성향 설문지"}
        subtitle={"5/6"}
        className="signupStep"
      />
      <div className="registerContainer">
        <QuestionComponent
          questionNumber={"Q5"}
          questionText1={"배변 습관은 어떤 편인가요?"}
          options={petTendency5Options}
          onChange={petTendency5Change}
          selectedValue={petTendency5}
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

export default PetTendency5;
