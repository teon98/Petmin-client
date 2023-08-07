import React, { useCallback, useRef } from "react";
import style from "../../styles/PetSitterProfile.module.css";
import { useState } from "react";
import axios from "axios";

const BasicInfoForm = () => {
  const [about, setAbout] = useState("");
  const [place, setPlace] = useState("");
  const [placeImg, setPlaceImg] = useState([]);

  //이미지 배열 받기
  const imagesRef = useRef();

  const handleChange = useCallback((e) => {
    //console.log(imagesRef.current.files);
    const {
      target: { name, value },
    } = e;

    if (name === "about") {
      setAbout(value);
    }
    if (name === "place") {
      setPlace(value);
    }
    if (name === "placeImg") {
      var imageList = [];
      for (var i = 0; i < imagesRef.current.files.length; i++) {
        imageList.push(imagesRef.current.files[i]);
      }
      //console.log(imageList);
      setPlaceImg(imageList);
    }
  }, []);

  const handlePost = () => {
    console.log(about);
    console.log(place);
    console.log(placeImg);

    var formData = new FormData();
    //태영: userID는 추후 로그인한 사용자로 변경
    formData.append("userId", "sampleUser12345ㅇㅇ");

    for (var i = 0; i < placeImg.length; i++) {
      formData.append("sitterHouse", placeImg[i]);
    }

    formData.append("sitterHousetype", place);
    formData.append("sitterMsg", about);

    axios
      .post("/sitter/insert", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        alert("자기소개가 수정되었습니다!");
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <div className={style.subtitle}>자기소개</div>
      {/* 자기소개 textarea */}
      <div id={style.frame}>
        <textarea
          id={style.about}
          placeholder="펫시터 님을 소개해주세요!"
          onChange={handleChange}
          name="about"
        />
      </div>
      <div className={style.subtitle}>거주형태</div>
      {/* 거주형태 radio */}
      <div id={style.frame}>
        <input
          id="option1"
          type="radio"
          name="place"
          onChange={handleChange}
          value="마당있는집"
        />
        <label htmlFor="option1">마당있는집</label>

        <input
          id="option2"
          type="radio"
          name="place"
          onChange={handleChange}
          value="아파트"
        />
        <label htmlFor="option2">아파트</label>

        <input
          id="option3"
          type="radio"
          name="place"
          onChange={handleChange}
          value="단독주택"
        />
        <label htmlFor="option3">단독주택</label>
      </div>
      <div className={style.subtitle}>거주지 이미지</div>
      {/* 거주지 이미지 file input */}
      <div id={style.frame}>
        <input
          name="placeImg"
          type="file"
          multiple
          ref={imagesRef}
          onChange={handleChange}
        />
      </div>

      <div className={style.saveBT} id={style.frame}>
        <input type="button" value="저장" onClick={handlePost} />
      </div>
    </div>
  );
};

export default BasicInfoForm;
