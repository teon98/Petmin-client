import React, { useEffect, useState } from "react";
import BackTitleHeader2 from "../../components/BackTitleHeader2";
import QuestionComponent from "../../components/QuestionComponent";
import QuestionFooter from "../../components/QuestionFooter";
import { useRecoilState } from "recoil";
import {
  isVaccineLastButtonClickedAtom,
  petVaccineMsgAtom,
} from "../../atom/atoms";
import { useNavigate } from "react-router";

function PetVaccine3(props) {
  const [petVaccineMsg, setPetVaccineMsg] = useRecoilState(petVaccineMsgAtom);

  const petVaccineMsgChange = (e) => {
    const value = e.target.value;
    setPetVaccineMsg(value);
  };

  const [btnState, setBtnState] = useState(false);
  useEffect(() => {
    if (petVaccineMsg !== "") {
      setBtnState(true);
    } else {
      setBtnState(false);
    }
  }, [petVaccineMsg]);

  const [isVaccinLastButtonClicked, setIsVaccinLastButtonClicked] =
    useRecoilState(isVaccineLastButtonClickedAtom);
  const navigate = useNavigate();
  const moveToPetProfile = () => {
    setIsVaccinLastButtonClicked(true);
    navigate("/petregistration");
  };

  return (
    <>
      <BackTitleHeader2
        title={"반려동물 예방접종 설문지"}
        subtitle={"3/3"}
        className="signupStep"
      />
      <div className="registerContainer">
        <QuestionComponent
          questionNumber={"Q3"}
          questionText1={"건강 관련한 주의사항을 알려주세요"}
          onChange={petVaccineMsgChange}
          value={petVaccineMsg}
          placeholder={"*전염병이 있는 경우, 돌봄이 불가합니다."}
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

export default PetVaccine3;
