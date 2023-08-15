import React, { useEffect, useRef, useState } from "react";
import "../../styles/PetRegistrationStyle.css";
import BackTitleHeader from "../../components/BackTitleHeader";
import basicPetImage from "../../assets/images/basicPetImage.png";
import TextInputComponentForPet from "../../components/TextInputComponentForPet";
import RadioComponent from "../../components/RadioComponent";
import PinkBtn from "../../components/User/PinkBtn";
import { FaCircleCheck, FaRegCircleCheck } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState, useResetRecoilState } from "recoil";
import {
  idtextAtom,
  isCheckedAtom,
  isTendencyLastButtonClickedAtom,
  isVaccineLastButtonClickedAtom,
  petAgeAtom,
  petGenderAtom,
  petImgUrlAtom,
  petMsgAtom,
  petNameAtom,
  petProfileImgAtom,
  petSpeciesAtom,
  petTendency1Atom,
  petTendency2Atom,
  petTendency3Atom,
  petTendency4Atom,
  petTendency5Atom,
  petTendencyMsgAtom,
  petVaccineMsgAtom,
  petVaccineValueList1Atom,
  petVaccineValueList2Atom,
  petWeightAtom,
} from "../../atom/atoms";
import axios from "axios";

function PetProfileUpdate(props) {
  //아이디 가져오기
  const [userId] = useRecoilState(idtextAtom);

  //기본 정보 입력받는 값들
  const [petName, setPetName] = useState("");
  const [petGender, setPetGender] = useState("");
  const [petAge, setPetAge] = useState("");
  const [petWeight, setPetWeight] = useState("");
  const [petSpecies, setSpecies] = useState("");
  const [petMsg, setPetMsg] = useState("");

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
  //img 경로? 인듯
  const [imgUrl, setImgUrl] = useRecoilState(petImgUrlAtom);
  const imgRef = useRef();

  const saveImgFile = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgUrl(file);
      setImgFile(reader.result);
    };
  };

  //체크리스트 이동
  const navigate = useNavigate();
  const moveToPetTendency = () => {
    navigate("/pettendency1");
  };

  const moveToPetVaccine = () => {
    navigate("/petvaccine1");
  };

  //방금 등록한 펫 넘버 가져오기
  const getPetNumber = () => {
    axios({
      url: `/petRecenNum/${userId}`,
      method: "get",
    })
      .then((res) => {
        console.log(res.data);
        // setPetNum(res.data);
        savePetTendency(res.data);
        petVaccineSave(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //펫 성향 저장하기
  const [tendency1, setTendency1] = useRecoilState(petTendency1Atom);
  const [tendency2, setTendency2] = useRecoilState(petTendency2Atom);
  const [tendency3, setTendency3] = useRecoilState(petTendency3Atom);
  const [tendency4, setTendency4] = useRecoilState(petTendency4Atom);
  const [tendency5, setTendency5] = useRecoilState(petTendency5Atom);
  const [tendencyMsg, setTendencyMsg] = useRecoilState(petTendencyMsgAtom);

  const savePetTendency = (petNum) => {
    axios({
      url: `/petTendencySave/${petNum}`,
      method: "post",
      data: {
        tendency1: tendency1,
        tendency2: tendency2,
        tendency3: tendency3,
        tendency4: tendency4,
        tendency5: tendency5,
        tendencyMsg: tendencyMsg,
      },
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //펫 예방접종 정보 저장하기
  const [vaccine1, setVaccine1] = useRecoilState(petVaccineValueList1Atom);
  const [vaccine2, setVaccine2] = useRecoilState(petVaccineValueList2Atom);
  const [vaccineMsg, setVaccineMsg] = useRecoilState(petVaccineMsgAtom);

  //배열 하나의 String으로 합치기
  const vaccine1String = vaccine1.join(", ");
  const vaccine2String = vaccine2.join(", ");

  const petVaccineSave = (petNum) => {
    axios({
      url: `/petVaccineSave/${petNum}`,
      method: "post",
      data: {
        vaccine1: vaccine1String,
        vaccine2: vaccine2String,
        vaccineMsg: vaccineMsg,
      },
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  ////사용했던 전역변수들 리셋하기
  //기본 정보들
  const resetpetName = useResetRecoilState(petNameAtom);
  const resetpetGender = useResetRecoilState(petGenderAtom);
  const resetpetAge = useResetRecoilState(petAgeAtom);
  const resetpetWeight = useResetRecoilState(petWeightAtom);
  const resetpetSpecies = useResetRecoilState(petSpeciesAtom);
  const resetpetMsg = useResetRecoilState(petMsgAtom);
  const resetisChecked = useResetRecoilState(isCheckedAtom);
  const resetimgFile = useResetRecoilState(petProfileImgAtom);
  const resetimgUrl = useResetRecoilState(petImgUrlAtom);

  //성향 체크리스트
  const resettendency1 = useResetRecoilState(petTendency1Atom);
  const resettendency2 = useResetRecoilState(petTendency2Atom);
  const resettendency3 = useResetRecoilState(petTendency3Atom);
  const resettendency4 = useResetRecoilState(petTendency4Atom);
  const resettendency5 = useResetRecoilState(petTendency5Atom);
  const resettendencyMsg = useResetRecoilState(petTendencyMsgAtom);

  //백신 체크리스트
  const resetvaccine1 = useResetRecoilState(petVaccineValueList1Atom);
  const resetvaccine2 = useResetRecoilState(petVaccineValueList2Atom);
  const resetvaccineMsg = useResetRecoilState(petVaccineMsgAtom);

  //펫 프로필 저장
  const savePetProfile = () => {
    var formData = new FormData();
    formData.append("userId", userId);
    formData.append("petName", petName);
    formData.append("petAge", petAge);
    formData.append("petSpecies", petSpecies);
    formData.append("petWeight", petWeight);
    formData.append("petSex", petGender);
    formData.append("petImg", imgUrl);
    formData.append("petMsg", petMsg);

    axios
      .post("/petProfileSave", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res.data);
        // getPetNumber();
      })
      .catch((err) => {
        console.log(err);
      });
    resetpetName();
    resetpetGender();
    resetpetAge();
    resetpetWeight();
    resetpetSpecies();
    resetpetMsg();
    resetisChecked();
    resetimgUrl();
    resetimgFile();
    resettendency1();
    resettendency2();
    resettendency3();
    resettendency4();
    resettendency5();
    resettendencyMsg();
    resetvaccine1();
    resetvaccine2();
    resetvaccineMsg();
    navigate("/petlist");
  };

  const [isTendencyLastButtonClicked] = useRecoilState(
    isTendencyLastButtonClickedAtom
  );

  const [isVaccinLastButtonClicked] = useRecoilState(
    isVaccineLastButtonClickedAtom
  );
  const [btnState, setBtnState] = useState(false);
  useEffect(() => {
    if (
      imgFile !== "" &&
      petName !== "" &&
      petGender !== "" &&
      petAge !== "" &&
      petWeight !== "" &&
      petSpecies !== "" &&
      petMsg !== "" &&
      isChecked &&
      isTendencyLastButtonClicked &&
      isVaccinLastButtonClicked
    ) {
      setBtnState(true);
    } else {
      setBtnState(false);
    }
  }, [
    imgFile,
    petName,
    petGender,
    petAge,
    petWeight,
    petSpecies,
    petMsg,
    isChecked,
    isTendencyLastButtonClicked,
    isVaccinLastButtonClicked,
  ]);

  // console.log("성향 체크완료 했는지 :" + isTendencyLastButtonClicked);
  // console.log("백신 체크완료 했는지 :" + isVaccinLastButtonClicked);

  const location = useLocation();
  const petNo = location.state.petNo;

  useEffect(() => {
    axios({
      url: `petInformationRead/${petNo}`,
      method: "get",
    })
      .then((res) => {
        console.log(res.data);

        setPetName(res.data.petName);
        setPetGender(res.data.petSex);
        setPetAge(res.data.petAge);
        setPetWeight(res.data.petWeight);
        setSpecies(res.data.petSpecies);
        setPetMsg(res.data.petMsg);
        setImgFile(res.data.petImg);

        setTendency1(res.data.petTendency.tendency1);
        setTendency2(res.data.petTendency.tendency2);
        setTendency3(res.data.petTendency.tendency3);
        setTendency4(res.data.petTendency.tendency4);
        setTendency5(res.data.petTendency.tendency5);
        setTendencyMsg(res.data.petTendency.tendencyMsg);

        setVaccine1(res.data.petVaccine.vaccine1.split(", "));
        setVaccine2(res.data.petVaccine.vaccine2.split(", "));
        setVaccineMsg(res.data.petVaccine.vaccineMsg);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div style={{ paddingBottom: "70px" }}>
      <BackTitleHeader title={"반려동물 수정"} className="signupStep" />
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
        <PinkBtn title="저장하기" onClick={savePetProfile} active={btnState} />
      </div>
    </div>
  );
}

export default PetProfileUpdate;
