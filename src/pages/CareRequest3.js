import React, { useEffect, useState } from "react";
import BackTitleHeader2 from "../components/BackTitleHeader2";
import { useRecoilState } from "recoil";
import {
  careTypeAtom,
  idtextAtom,
  nametextAtom,
  userAddrAtom,
} from "../atom/atoms";
import QuestionFooter from "../components/QuestionFooter";
import { useNavigate } from "react-router";
import axios from "axios";
import CheckBoxComponent from "../components/CheckBoxComponent";

function CareRequest3(props) {
  const [address] = useRecoilState(userAddrAtom);
  const frontAdress = address.substring(0, 6);
  function backAddressFind(address) {
    const openParenIndex = address.indexOf("(");

    if (openParenIndex !== -1 && openParenIndex + 4 <= address.length) {
      const threeCharsAfterOpenParen = address.substring(
        openParenIndex + 1,
        openParenIndex + 4
      );
      return threeCharsAfterOpenParen;
    }

    return ""; // "(" 문자를 찾지 못하거나 뒤에 세 글자가 없을 경우 빈 문자열 반환
  }
  const backAddress = backAddressFind(address);
  const [userName] = useRecoilState(nametextAtom);
  const fullAddress = frontAdress + " " + backAddress + " · ";
  const [careType, setCareType] = useRecoilState(careTypeAtom);
  const [petList, setPetList] = useState([]);
  const [careTypeOptions, setCareTypeOptions] = useState([]);

  const careTypeChange = (e) => {
    const value = e.target.value;
    setCareType(value);
  };

  const navigate = useNavigate();
  const moveToNextPage = () => {
    navigate("/anywhere");
  };

  const [btnState, setBtnState] = useState(false);
  useEffect(() => {
    if (careType !== "") {
      setBtnState(true);
    } else {
      setBtnState(false);
    }
  }, [careType]);

  const [userId] = useRecoilState(idtextAtom);

  useEffect(() => {
    axios({
      url: `/petProfileList/${userId}`,
      method: "get",
    })
      .then((res) => {
        console.log(res.data);
        setPetList(res.data);
        const options = res.data.map((pet) => {
          let icon = "◌";

          if (pet.petSex === "남아") {
            icon = "♂️";
          } else if (pet.petSex === "여아") {
            icon = "♀";
          }

          return {
            name: "careType",
            value: `${icon} ${pet.petName} (${pet.petAge})`,
            label: `${icon} ${pet.petName} (${pet.petAge})`,
          };
        });
        setCareTypeOptions(options);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <BackTitleHeader2
        title={"돌봄 요청"}
        subtitle={"3/3"}
        className="signupStep"
      />
      <div className="registerContainer">
        <CheckBoxComponent
          fullAddress={fullAddress}
          userName={userName}
          questionText2={"돌봄을 맡길 반려견을 선택해주세요"}
          options={careTypeOptions}
          //onChange={careTypeChange}
          //selectedValue={careType}
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

export default CareRequest3;
