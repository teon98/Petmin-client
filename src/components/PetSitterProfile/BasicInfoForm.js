import React, { useCallback, useEffect, useRef } from "react";
import style from "../../styles/PetSitterProfile.module.css";
import { useState } from "react";
import axios from "axios";
import { FaImages } from "react-icons/fa6";

const BasicInfoForm = () => {
  const [about, setAbout] = useState("");
  const [place, setPlace] = useState("");
  const [placeImg, setPlaceImg] = useState([""]);

  useEffect(() => {
    var placetype = document.querySelectorAll(".placetype input[type='radio']");

    axios
      .get("/sitter/getSitter", {
        params: {
          userId: "test11",
        },
      })
      .then((res) => {
        //console.log(res.data);
        setAbout(res.data.sitterMsg);
        for (let i = 0; i < placetype.length; i++) {
          if (placetype[i].id === res.data.sitterHousetype) {
            placetype[i].checked = true;
          }
        }
        setPlace(res.data.sitterHousetype);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
    formData.append("userId", "test11");

    for (var i = 0; i < placeImg.length; i++) {
      formData.append("sitterHouse", placeImg[i]);
    }

    formData.append("sitterHousetype", place);
    formData.append("sitterMsg", about);

    axios
      .post("/sitter/update", formData, {
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
          defaultValue={about}
        ></textarea>
      </div>
      <div className={style.subtitle}>거주형태</div>
      {/* 거주형태 radio */}
      <div id={style.frame} className="placetype">
        <input
          id="마당있는집"
          type="radio"
          name="place"
          onChange={handleChange}
          value="마당있는집"
        />
        <label htmlFor="마당있는집">마당있는집</label>

        <input
          id="아파트"
          type="radio"
          name="place"
          onChange={handleChange}
          value="아파트"
        />
        <label htmlFor="아파트">아파트</label>

        <input
          id="단독주택"
          type="radio"
          name="place"
          onChange={handleChange}
          value="단독주택"
        />
        <label htmlFor="단독주택">단독주택</label>
      </div>
      <div className={style.subtitle}>거주지 이미지</div>
      {/* 거주지 이미지 file input */}
      <div id={style.frame} className={style.filebox}>
        <label htmlFor="file">
          <div>
            <FaImages color="#B3B3B3" size={20} />
          </div>
          <div style={{ color: "#FF6666", fontFamily: "PreRegular" }}>
            (0/3)
          </div>
        </label>
        <input
          id="file"
          name="placeImg"
          type="file"
          multiple
          ref={imagesRef}
          onChange={handleChange}
        />
        <div className={style.fileItem}>
          <img
            src="https://petminbucket.s3.ap-northeast-2.amazonaws.com/house/5f993afe-6413-4947-a97e-df6c36342958"
            alt="test"
          />
        </div>
        <div className={style.fileItem}>
          <img
            src="https://petminbucket.s3.ap-northeast-2.amazonaws.com/house/5f993afe-6413-4947-a97e-df6c36342958"
            alt="test"
          />
        </div>
        <div className={style.fileItem}>
          <img
            src="https://petminbucket.s3.ap-northeast-2.amazonaws.com/house/5f993afe-6413-4947-a97e-df6c36342958"
            alt="test"
          />
        </div>
      </div>

      <div className={style.saveBT} id={style.frame}>
        <input type="button" value="저장" onClick={handlePost} />
      </div>
    </div>
  );
};

export default BasicInfoForm;
