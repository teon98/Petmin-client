import React, { useRef, useState } from "react";
import "../../styles/PetRegistrationStyle.css";
import BackTitleHeader from "../../components/BackTitleHeader";
import basicPetImage from "../../assets/images/basicPetImage.png";
import TextInputComponentForPet from "../../components/TextInputComponentForPet";
import RadioComponent from "../../components/RadioComponent";
import PinkBtn from "../../components/User/PinkBtn";
import { FaCircleCheck, FaRegCircleCheck } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import {
  idtextAtom,
  isCheckedAtom,
  petAgeAtom,
  petGenderAtom,
  petMsgAtom,
  petNameAtom,
  petProfileImgAtom,
  petSpeciesAtom,
  petWeightAtom,
} from "../../atom/atoms";
import axios from "axios";

function PetRegistration(props) {
  //아이디 가져오기
  const [userId] = useRecoilState(idtextAtom);

  //기본 정보 입력받는 값들
  const [petName, setPetName] = useRecoilState(petNameAtom);
  const [petGender, setPetGender] = useRecoilState(petGenderAtom);
  const [petAge, setPetAge] = useRecoilState(petAgeAtom);
  const [petWeight, setPetWeight] = useRecoilState(petWeightAtom);
  const [petSpecies, setSpecies] = useRecoilState(petSpeciesAtom);
  const [petMsg, setPetMsg] = useRecoilState(petMsgAtom);

  const handlePetName = (e) => {
    setPetName(e.target.value);
  };

  const handlePetAge = (e) => {
    setPetAge(e.target.value);
  };

  const handlePetWeight = (e) => {
    setPetWeight(e.target.value);
  };

  const handlePetSpecies = (e) => {
    setSpecies(e.target.value);
  };

  const handlePetMsg = (e) => {
    setPetMsg(e.target.value);
  };

  const petGenderChange = (e) => {
    const value = e.target.value;
    setPetGender(value);
  };
  const petGenderOptions = [
    { name: "petGender", value: "남아", label: "남아" },
    { name: "petGender", value: "여아", label: "여아" },
    { name: "petGender", value: "중성화", label: "중성화" },
  ];

  //동의 체크
  const [isChecked, setIsChecked] = useRecoilState(isCheckedAtom);
  const changeCheck = () => {
    setIsChecked(!isChecked);
  };

  //펫 프로필 이미지
  const [imgFile, setImgFile] = useRecoilState(petProfileImgAtom);
  const imgRef = useRef();

  const saveImgFile = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgFile(reader.result);
    };
  };

  //체크리스트 이동
  const navigate = useNavigate();
  const moveToPetTendency = () => {
    navigate("/pettendency");
  };

  const moveToPetVaccine = () => {
    navigate("/petvaccine");
  };

  //펫 프로필 저장
  const savePetProfile = () => {
    axios({
      url: `http://localhost:8888/petProfileSave/${userId}`,
      method: "post",
      data: {
        petName: petName,
        petAge: petAge,
        petSpecies: petSpecies,
        petWeight: petWeight,
        petSex: petGender,
        //petImg: imgFile,
        petMsg: petMsg,
      },
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div style={{ paddingBottom: "70px" }}>
      <BackTitleHeader title={"반려동물 등록"} className="signupStep" />
      <div className="registerContainer">
        <div className="test">
          <form>
            <img
              src={imgFile ? imgFile : basicPetImage}
              id={imgFile ? "bwhite" : ""}
              alt="펫 프로필 기본사진"
              className="basicPetImage"
            />
            <label htmlFor="profileImg" className="labelWithIcon" />
            <input
              className="imageNone"
              type="file"
              accept="image/*"
              id="profileImg"
              onChange={saveImgFile}
              ref={imgRef}
            />
          </form>
        </div>

        <p className="chapterLable">기본 정보</p>
        <TextInputComponentForPet
          lable={"이름"}
          placeholder={"이름을 입력해주세요"}
          value={petName}
          onChange={handlePetName}
        />

        <div className="GenderCon">
          <div className="GenderPtag">
            <p className="basicLable">성별</p>
          </div>
          <div className="GenderRCom">
            <RadioComponent
              onChange={petGenderChange}
              options={petGenderOptions}
              selectedValue={petGender}
            />
          </div>
        </div>

        <TextInputComponentForPet
          lable={"나이"}
          value={petAge}
          onChange={handlePetAge}
          type={"Number"}
        />
        <TextInputComponentForPet
          lable={"몸무게"}
          value={petWeight}
          onChange={handlePetWeight}
          type={"Number"}
        />
        <TextInputComponentForPet
          lable={"견종"}
          placeholder={"견종을 입력해주세요"}
          value={petSpecies}
          onChange={handlePetSpecies}
        />
      </div>
      <hr style={{ marginBottom: "25px" }} />
      <div className="registerContainer">
        <p className="chapterLable">반려동물 소개하기</p>
        <textarea
          className="petIntro"
          placeholder="자유롭게 입력해주세요"
          rows={4}
          value={petMsg}
          onChange={handlePetMsg}
        />
      </div>

      <hr style={{ marginBottom: "25px", marginTop: "25px" }} />

      <div className="registerContainer">
        <p className="chapterLable">체크리스트</p>

        <div className="checkListContainer">
          <div className="checkListContent" onClick={moveToPetTendency}>
            <p className="checkListText1">
              반려동물
              <br /> 성향 설문지
            </p>
            <p className="checkListText2">문항6개</p>
          </div>

          <div className="checkListContent" onClick={moveToPetVaccine}>
            <p className="checkListText1">
              반려동물
              <br />
              예방접종 설문지
            </p>
            <p className="checkListText2">문항3개</p>
          </div>
        </div>
      </div>
      <hr style={{ marginBottom: "25px", marginTop: "25px" }} />
      <div className="lastRegisterContainer">
        <div className="cautionContainer" onClick={changeCheck}>
          {isChecked ? <FaCircleCheck /> : <FaRegCircleCheck />}

          <p className="cautionLable">아래 내용을 확인하였습니다</p>
        </div>
        <p className="cautionContent">
          위 내용(예. 몸무게, 마킹 등)을 사실과 다르게 기재한 경우,
          <br />
          약관에 따라 돌봄이 거부될 수 있습니다.
        </p>
        <PinkBtn title="저장하기" onClick={savePetProfile} active={true} />
      </div>
    </div>
  );
}

export default PetRegistration;
