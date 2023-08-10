import React from "react";
import BackTitleHeader from "../../components/BackTitleHeader";
import QuestionComponent from "../../components/QuestionComponent";
import { useRecoilState } from "recoil";
import { petTendency1Atom } from "../../atom/atoms";

function PetTendency1() {
  const [petTendency1, setPetTendency1] = useRecoilState(petTendency1Atom);
  const petTendency1Options = [
    {
      name: "petTendency1",
      value: "거부감 없이 금세 적응해요",
      label: "거부감 없이 금세 적응해요",
    },
    {
      name: "petTendency1",
      value: "처음엔 낯을 가리지만, 1-2일이 지나면 괜찮아요",
      label: "처음엔 낯을 가리지만, 1-2일이 지나면 괜찮아요",
    },
    {
      name: "petTendency1",
      value: "계속 불안해하거나 스트레스를 받아요",
      label: "계속 불안해하거나 스트레스를 받아요",
    },
    { name: "petTendency1", value: "잘 모르겠어요", label: "잘 모르겠어요" },
  ];
  const petTendency1Change = (e) => {
    const value = e.target.value;
    setPetTendency1(value);
  };
  return (
    <>
      <BackTitleHeader title={"반려동물 성향 설문지"} className="signupStep" />
      <div className="registerContainer">
        <QuestionComponent
          questionNumber={"Q1"}
          questionText1={"호텔 등 낯선 공간에 맡겨지면,"}
          questionText2={"어떤 반응을 보이나요"}
          options={petTendency1Options}
          onChange={petTendency1Change}
          selectedValue={petTendency1}
        />
      </div>
    </>
  );
}

export default PetTendency1;
