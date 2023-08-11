import React, { useEffect, useState } from "react";
import QuestionComponent from "../../components/QuestionComponent";
import { useRecoilState } from "recoil";
import { petTendency3Atom } from "../../atom/atoms";
import BackTitleHeader2 from "../../components/BackTitleHeader2";
import QuestionFooter from "../../components/QuestionFooter";
import { useNavigate } from "react-router";

function PetTendency3(props) {
  const [petTendency3, setPetTendency3] = useRecoilState(petTendency3Atom);
  const petTendency3Options = [
    {
      name: "petTendency3",
      value: "거부감 없이 좋아해요",
      label: "거부감 없이 좋아해요",
    },
    {
      name: "petTendency3",
      value: "초반에 낯가림은 있지만 물지는 않아요",
      label: "초반에 낯가림은 있지만 물지는 않아요",
    },
    {
      name: "petTendency3",
      value: "오랫동안 만지면 으르렁대거나 물 수도 있어요",
      label: "오랫동안 만지면 으르렁대거나 물 수도 있어요",
    },
    {
      name: "petTendency3",
      value: "겁이 많아서 만지면 물 수도 있어요",
      label: "겁이 많아서 만지면 물 수도 있어요",
    },
  ];
  const petTendency3Change = (e) => {
    const value = e.target.value;
    setPetTendency3(value);
  };

  const navigate = useNavigate();
  const moveToNextPage = () => {
    navigate("/pettendency4");
  };

  const [btnState, setBtnState] = useState(false);
  useEffect(() => {
    if (petTendency3 !== "") {
      setBtnState(true);
    } else {
      setBtnState(false);
    }
  }, [petTendency3]);

  return (
    <>
      <BackTitleHeader2
        title={"반려동물 성향 설문지"}
        subtitle={"3/6"}
        className="signupStep"
      />
      <div className="registerContainer">
        <QuestionComponent
          questionNumber={"Q3"}
          questionText1={"낯선 사람이 스킨십하면,"}
          questionText2={"어떤 반응을 보이나요"}
          options={petTendency3Options}
          onChange={petTendency3Change}
          selectedValue={petTendency3}
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

export default PetTendency3;
