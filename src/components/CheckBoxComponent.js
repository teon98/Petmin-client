import React, { useEffect } from "react";
import "../styles/QuestionComponentStyle.css";
import { useLocation } from "react-router";
import { useRecoilState } from "recoil";
import {
  petCheckListAtom,
  petChooseListAtom,
  petVaccineCheckList1Atom,
  petVaccineCheckList2Atom,
  petVaccineValueList1Atom,
  petVaccineValueList2Atom,
} from "../atom/atoms";

function CheckBoxComponent({
  options,
  onChange,
  questionNumber,
  questionText1,
  questionText2,
  value,
  placeholder,
  fullAddress,
  userName,
}) {
  const location = useLocation();
  const pathname = location.pathname;

  //careRequest3 페이지 atoms
  //const [checkList, setCheckList] = useRecoilState(petCheckListAtom);
  const [checkValueList, setCheckValueList] = useRecoilState(petChooseListAtom);

  const [petVaccineValueList1, setPetVaccineValueList1] = useRecoilState(
    petVaccineValueList1Atom
  );

  const [petVaccineValueList2, setPetVaccineValueList2] = useRecoilState(
    petVaccineValueList2Atom
  );

  const isCare =
    pathname === "/careRequest1" ||
    pathname === "/careRequest2" ||
    pathname === "/careRequest3";
  const isTextArea =
    pathname === "/petvaccine3" || pathname === "/pettendency6";

  const isVaccine1 = pathname === "/petvaccine1";
  const isVaccine2 = pathname === "/petvaccine2";
  const isCareRequest3 = pathname === "/careRequest3";

  useEffect(() => {
    console.log(checkValueList);
  }, [checkValueList]);

  return (
    <div>
      <p className="questionNumber">{questionNumber}</p>
      {isCare ? (
        <p className="careInfoText">
          {fullAddress}
          <span className="pinkColor">{userName}</span> 돌보미님
        </p>
      ) : (
        <p className="questionText1">{questionText1}</p>
      )}

      <p className="questionText2">{questionText2}</p>
      {isTextArea ? (
        <div>
          <textarea
            className="petIntro"
            placeholder={placeholder}
            rows={4}
            value={value}
            onChange={onChange}
          />
        </div>
      ) : (
        options.map((option, index) => (
          <label
            key={option.value}
            className={`radioBox2 ${
              checkValueList.includes(option.value) ? "active" : ""
            }`}
          >
            <input
              type="checkbox"
              name={option.name}
              value={option.value}
              checked={checkValueList.includes(option.value)}
              onChange={(e) => {
                if (isVaccine1) {
                } else if (isVaccine2) {
                } else if (isCareRequest3) {
                  var prevCheckValueList = [...checkValueList];
                  if (e.target.checked) {
                    prevCheckValueList.push(e.target.value);
                  } else {
                    prevCheckValueList = prevCheckValueList.filter((data) => {
                      return data !== e.target.value;
                    });
                  }
                  setCheckValueList(prevCheckValueList);
                }
              }}
            />
            {option.label}
          </label>
        ))
      )}
    </div>
  );
}

export default CheckBoxComponent;
