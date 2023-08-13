import React, { useEffect, useState } from "react";
import BackTitleHeader2 from "../components/BackTitleHeader2";
import { useRecoilState } from "recoil";
import { careTypeAtom, nametextAtom, userAddrAtom } from "../atom/atoms";
import QuestionFooter from "../components/QuestionFooter";
import QuestionComponent from "../components/QuestionComponent";
import { useNavigate, useLocation } from "react-router";

function CareRequest1(props) {
  const location = useLocation();
  const sitter = location.state.sitter;
  const sitterId = location.state.sitterId;
  const address = location.state.address;

  console.log(sitter);
  console.log(address);

  // const [address] = useRecoilState(userAddrAtom);
  // const frontAdress = address.substring(0, 6);
  // function backAddressFind(address) {
  //   const openParenIndex = address.indexOf("(");

  //   if (openParenIndex !== -1 && openParenIndex + 4 <= address.length) {
  //     const threeCharsAfterOpenParen = address.substring(
  //       openParenIndex + 1,
  //       openParenIndex + 4
  //     );
  //     return threeCharsAfterOpenParen;
  //   }

  //   return ""; // "(" 문자를 찾지 못하거나 뒤에 세 글자가 없을 경우 빈 문자열 반환
  // }
  // const backAddress = backAddressFind(address);
  const [userName] = useRecoilState(nametextAtom);
  // const fullAddress = frontAdress + " " + backAddress + " · ";

  const [careType, setCareType] = useRecoilState(careTypeAtom);
  const careTypeOptions = [
    {
      name: "careType",
      value: "산책 (단기돌봄)",
      label: "산책 (단기돌봄)",
    },
    {
      name: "careType",
      value: "돌봄 (장기돌봄)",
      label: "돌봄 (장기돌봄)",
    },
  ];

  const careTypeChange = (e) => {
    const value = e.target.value;
    setCareType(value);
  };

  const navigate = useNavigate();
  const moveToNextPage = () => {
    if (careType === "산책 (단기돌봄)") {
      navigate("/reservation", {
        state: { sitter: sitter, sitterId: sitterId },
      });
    } else {
      navigate("/reservation2", {
        state: { sitter: sitter, sitterId: sitterId },
      });
    }
  };

  const [btnState, setBtnState] = useState(false);
  useEffect(() => {
    if (careType !== "") {
      setBtnState(true);
    } else {
      setBtnState(false);
    }
  }, [careType]);

  return (
    <>
      <BackTitleHeader2
        title={"돌봄 요청"}
        subtitle={"1/3"}
        className="signupStep"
      />
      <div className="registerContainer">
        <QuestionComponent
          fullAddress={address}
          userName={sitter}
          questionText2={"돌봄 유형을 선택하세요"}
          options={careTypeOptions}
          onChange={careTypeChange}
          selectedValue={careType}
        />
      </div>
      <QuestionFooter
        title="요청하기"
        active={btnState}
        onClick={moveToNextPage}
      />
    </>
  );
}

export default CareRequest1;
