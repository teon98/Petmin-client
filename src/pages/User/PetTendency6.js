import React, { useEffect, useState } from "react";
import BackTitleHeader2 from "../../components/BackTitleHeader2";
import QuestionComponent from "../../components/QuestionComponent";
import QuestionFooter from "../../components/QuestionFooter";
import { useRecoilState } from "recoil";
import {
  isTendencyLastButtonClickedAtom,
  petTendencyMsgAtom,
} from "../../atom/atoms";
import { useNavigate } from "react-router";

function PetTendency6(props) {
  const [petTendencyMsg, setPetTendencyMsg] =
    useRecoilState(petTendencyMsgAtom);

  const petTendencyMsgChange = (e) => {
    const value = e.target.value;
    setPetTendencyMsg(value);
  };

  const [btnState, setBtnState] = useState(false);
  useEffect(() => {
    if (petTendencyMsg !== "") {
      setBtnState(true);
    } else {
      setBtnState(false);
    }
  }, [petTendencyMsg]);

  const [isTendencyLastButtonClicked, setIsTendencyLastButtonClicked] =
    useRecoilState(isTendencyLastButtonClickedAtom);
  const navigate = useNavigate();
  const moveToPetProfile = () => {
    navigate("/petregistration");
    setIsTendencyLastButtonClicked(true);
  };

  return (
    <>
      <BackTitleHeader2
        title={"반려동물 성향 설문지"}
        subtitle={"6/6"}
        className="signupStep"
      />
      <div className="registerContainer">
        <QuestionComponent
          questionNumber={"Q6"}
          questionText1={"산책 관련 주의해야 할 점을 알려 주세요"}
          onChange={petTendencyMsgChange}
          value={petTendencyMsg}
          placeholder={"자유롭게 입력해주세요"}
        />
      </div>
      <QuestionFooter
        title="완료"
        active={btnState}
        onClick={moveToPetProfile}
      />
    </>
  );
}

export default PetTendency6;
