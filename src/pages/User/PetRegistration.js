import React, { useRef, useState } from "react";
import "../../styles/PetRegistrationStyle.css";
import BackTitleHeader from "../../components/BackTitleHeader";
import basicPetImage from "../../assets/images/basicPetImage.png";
import TextInputComponentForPet from "../../components/TextInputComponentForPet";
import RadioComponent from "../../components/RadioComponent";
function PetRegistration(props) {
  const [imgFile, setImgFile] = useState("");
  const imgRef = useRef();

  const saveImgFile = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgFile(reader.result);
    };
  };

  const [petGender, setPetGender] = useState("");
  const petGenderChange = (e) => {
    const value = e.target.value;
    setPetGender(value);
  };
  const petGenderOptions = [
    { name: "petGender", value: "남아", label: "남아" },
    { name: "petGender", value: "여아", label: "여아" },
    { name: "petGender", value: "중성화", label: "중성화" },
  ];

  return (
    <>
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
          placeholder={"나이를 입력해주세요"}
        />
        <TextInputComponentForPet
          lable={"몸무게"}
          placeholder={"몸무게를 입력해주세요"}
        />
        <TextInputComponentForPet
          lable={"견종"}
          placeholder={"견종을 입력해주세요"}
        />
      </div>
      <hr style={{ marginBottom: "25px" }} />
      <div className="registerContainer">
        <p className="chapterLable">반려동물 소개하기</p>
        <input className="petIntro" />
      </div>
      <hr style={{ marginBottom: "25px" }} />
      <div className="registerContainer">
        <p className="chapterLable">체크리스트</p>
      </div>
    </>
  );
}

export default PetRegistration;
