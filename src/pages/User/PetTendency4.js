import React, { useEffect, useState } from "react";
import QuestionComponent from "../../components/QuestionComponent";
import { useRecoilState } from "recoil";
import { petTendency4Atom } from "../../atom/atoms";
import BackTitleHeader2 from "../../components/BackTitleHeader2";
import QuestionFooter from "../../components/QuestionFooter";
import { useNavigate } from "react-router";

function PetTendency4(props) {
  const [petTendency4, setPetTendency4] = useRecoilState(petTendency4Atom);
  const petTendency4Options = [
    {
      name: "petTendency4",
      value: "거의 짖지 않아요",
      label: "거의 짖지 않아요",
    },
    {
      name: "petTendency4",
      value: "상황에 따라 가끔 짖어요",
      label: "상황에 따라 가끔 짖어요",
    },
    {
      name: "petTendency4",
      value: "외부 소음에 꽤 짖는 편이에요 / 헛짖음이 있어요",
      label: "외부 소음에 꽤 짖는 편이에요 / 헛짖음이 있어요",
    },
  ];
  const petTendency4Change = (e) => {
    const value = e.target.value;
    setPetTendency4(value);
  };

  const navigate = useNavigate();
  const moveToNextPage = () => {
    navigate("/pettendency5");
  };

  const [btnState, setBtnState] = useState(false);
  useEffect(() => {
    if (petTendency4 !== "") {
      setBtnState(true);
    } else {
      setBtnState(false);
    }
  }, [petTendency4]);

  return (
    <>
      <BackTitleHeader2
        title={"반려동물 성향 설문지"}
        subtitle={"4/6"}
        className="signupStep"
      />
      <div className="registerContainer">
        <QuestionComponent
          questionNumber={"Q4"}
          questionText1={"평소 집에서 짖음은 어느 정도인가요"}
          options={petTendency4Options}
          onChange={petTendency4Change}
          selectedValue={petTendency4}
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

export default PetTendency4;
