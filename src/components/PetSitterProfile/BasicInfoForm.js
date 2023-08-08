import React, { useCallback, useEffect, useRef } from "react";
import style from "../../styles/PetSitterProfile.module.css";
import { useState } from "react";
import axios from "axios";
import { FaImages } from "react-icons/fa6";

const BasicInfoForm = () => {
  const [about, setAbout] = useState("");
  const [place, setPlace] = useState("");
  const [placeImg, setPlaceImg] = useState([]);
  const [placecount, setPlaceCount] = useState(0);

  //이미지 배열 받기
  const imagesRef = useRef();
  const [previews, setPreviews] = useState([]);

  useEffect(() => {
    var placetype = document.querySelectorAll(".placetype input[type='radio']");

    axios
      .get("/sitter/getSitter", {
        params: {
          userId: "test12",
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

        console.log(res.data.sitterHouse);
        let imageArray = res.data.sitterHouse.slice(1, -1).split(",");
        setPreviews(imageArray);
        setPlaceCount(imageArray.length);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
      //업로드된 이미지 미리보기 (추가)
      // var imageList = [];
      // for (var i = 0; i < imagesRef.current.files.length; i++) {
      //   imageList.push(imagesRef.current.files[i]);
      // }
      // //console.log(imageList);
      // setPlaceImg(imageList);
      // console.log(imagesRef.current.files);

      let imageView = [];
      let imageView2 = [];

      for (let i = 0; i < imagesRef.current.files.length; i++) {
        console.log(imagesRef.current.files[i]);
        imageView.push(imagesRef.current.files[i]);

        let file = imagesRef.current.files[i];

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          imageView2.push(reader.result);
          setPreviews(imageView2);
        };
      }
      //console.log(imageView);
      setPlaceImg(imageView);
    }
  }, []);

  const handlePost = () => {
    console.log("about", about);
    console.log("place", place);
    console.log("placeImg", placeImg);
    console.log("prviewImg", previews);

    var formData = new FormData();
    //태영: userID는 추후 로그인한 사용자로 변경
    formData.append("userId", "test12");

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

  // 이미지 클릭시 삭제
  const handleDeleteImg = (e) => {
    console.dir(e.target);
    setPreviews(previews.filter((i) => e.target.src !== i));
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
            ({placecount}/3)
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
        {previews.map((itemSrc, index) => (
          <div className={style.fileItem} key={index} onClick={handleDeleteImg}>
            <img src={itemSrc} alt="test" />
          </div>
        ))}
      </div>

      <div className={style.saveBT} id={style.frame}>
        <input type="button" value="저장" onClick={handlePost} />
      </div>
    </div>
  );
};

export default BasicInfoForm;
