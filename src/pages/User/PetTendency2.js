import React, { useEffect, useState } from "react";
import QuestionComponent from "../../components/QuestionComponent";
import { useRecoilState } from "recoil";
import { petTendency2Atom } from "../../atom/atoms";
import BackTitleHeader2 from "../../components/BackTitleHeader2";
import QuestionFooter from "../../components/QuestionFooter";
import { useNavigate } from "react-router";

function PetTendency2(props) {
  const [petTendency2, setPetTendency2] = useRecoilState(petTendency2Atom);
  const petTendency2Options = [
    {
      name: "petTendency2",
      value: "좋아하며 적극적으로 어울려요",
      label: "좋아하며 적극적으로 어울려요",
    },
    {
      name: "petTendency2",
      value: "처음엔 낯을 가리는 편이에요",
      label: "처음엔 낯을 가리는 편이에요",
    },
    {
      name: "petTendency2",
      value: "짖거나 으르렁대며 경계를 해요",
      label: "짖거나 으르렁대며 경계를 해요",
    },
    {
      name: "petTendency2",
      value: "무서워하며 피하려고 해요",
      label: "무서워하며 피하려고 해요",
    },
    {
      name: "petTendency2",
      value: "별로 관심이 없어요",
      label: "별로 관심이 없어요",
    },
  ];
  const petTendency2Change = (e) => {
    const value = e.target.value;
    setPetTendency2(value);
  };

  const navigate = useNavigate();
  const moveToNextPage = () => {
    navigate("/pettendency3");
  };

  const [btnState, setBtnState] = useState(false);
  useEffect(() => {
    if (petTendency2 !== "") {
      setBtnState(true);
    } else {
      setBtnState(false);
    }
  }, [petTendency2]);

  return (
    <>
      <BackTitleHeader2
        title={"반려동물 성향 설문지"}
        subtitle={"2/6"}
        className="signupStep"
      />
      <div className="registerContainer">
        <QuestionComponent
          questionNumber={"Q2"}
          questionText1={"다른 낯선 강아지를 만나면,"}
          questionText2={"어떤 반응을 보이나요"}
          options={petTendency2Options}
          onChange={petTendency2Change}
          selectedValue={petTendency2}
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

export default PetTendency2;
