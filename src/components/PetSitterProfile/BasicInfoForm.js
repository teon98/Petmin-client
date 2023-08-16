import React, { useCallback, useEffect, useRef } from "react";
import style from "../../styles/PetSitterProfile.module.css";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FaImages } from "react-icons/fa6";
import { useRecoilState } from "recoil";
import { idtextAtom } from "../../atom/atoms";

const Toast = Swal.mixin({
  toast: true,
  position: "center",
  showConfirmButton: false,
  timer: 1000,
  timerProgressBar: true,
});
const BasicInfoForm = () => {
  const [about, setAbout] = useState("");
  const [place, setPlace] = useState("");
  const [placecount, setPlaceCount] = useState(0);
  const [count, setCount] = useState(0);
  const [userId] = useRecoilState(idtextAtom);
  useEffect(() => {
    var placetype = document.querySelectorAll(".placetype input[type='radio']");

    axios
      .get("/sitter/getSitter", {
        params: {
          userId: userId,
        },
      })
      .then((res) => {
        ////console.log(res.data);
        setAbout(res.data.sitterMsg);
        for (let i = 0; i < placetype.length; i++) {
          if (placetype[i].id === res.data.sitterHousetype) {
            placetype[i].checked = true;
          }
        }
        setPlace(res.data.sitterHousetype);

        //S3로 저장된 이미지 불러오기
        //저장된 형태 [이미지,이미지]
        let sitterHouse = res.data.sitterHouse.slice(1, -1);
        let sitterHouse_arr = sitterHouse.split(",");
        let previews_arr = [];
        setPlaceCount(sitterHouse_arr.length); //이미지 갯수
        for (let i = 0; i < sitterHouse_arr.length; i++) {
          previews_arr.push({
            imagePreviewUrl: sitterHouse_arr[i],
            fileObject: sitterHouse_arr[i],
          });
        }
        setPreviews(previews_arr);
      })
      .catch((err) => {
        //console.log(err);
      });
  }, []);

  //이미지 배열 받기
  const imagesRef = useRef();
  const [previews, setPreviews] = useState([]);

  //업로드된 이미지 미리보기
  const handleChange = useCallback((e) => {
    ////console.log(imagesRef.current.files);
    setCount(1);
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
      let image_temp2 = []; //미리보기를 위해 FileReader로 읽은 이미지 URL이 들어간다.
      setPlaceCount(
        imagesRef.current.files.length <= 3 ? imagesRef.current.files.length : 3
      ); //이미지 갯수

      for (let i = 0; i < imagesRef.current.files.length; i++) {
        //미리보기 구현
        let file = imagesRef.current.files[i];
        ////console.log(file);
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          image_temp2.push({
            imagePreviewUrl: reader.result,
            fileObject: file,
          });
          setPreviews(image_temp2);
        };
      }
    }
  }, []);

  const handlePost = () => {
    ////console.log("about", about);
    ////console.log("place", place);
    ////console.log("prviewImg", previews);

    var formData = new FormData();
    //태영: userID는 추후 로그인한 사용자로 변경
    formData.append("userId", userId);

    for (var i = 0; i < previews.length; i++) {
      formData.append("sitterHouse", previews[i].fileObject);
      formData.append("house", previews[i].fileObject);
    }

    formData.append("sitterHousetype", place);
    formData.append("sitterMsg", about);

    if (count === 1) {
      axios
        .post("/sitter/update", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          Toast.fire({
            icon: "success",
            title: "자기소개가 수정되었습니다:)!.",
          });
          //console.log(res.data);
        })
        .catch((err) => {
          //console.log(err);
        });
    } else {
      axios
        .post("/sitter/update2", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          Toast.fire({
            icon: "success",
            title: "자기소개가 수정되었습니다(●'◡'●)!",
          });
          //console.log(res.data);
        })
        .catch((err) => {
          //console.log(err);
        });
    }
  };

  const handleImgItemChange = (deleteUrl) => {
    setPreviews(previews.filter((item) => item.imagePreviewUrl !== deleteUrl));
  };

  useEffect(() => {
    setPlaceCount(previews.length);
  }, [previews]);

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
            <FaImages color="#B3B3B3" size={15} />
          </div>
          <div
            style={{
              color: "#FF6666",
              fontFamily: "PreRegular",
              fontSize: "13px",
            }}
          >
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
          <div
            className={style.fileItem}
            key={index}
            onClick={() => handleImgItemChange(itemSrc.imagePreviewUrl)}
          >
            <img src={itemSrc.imagePreviewUrl} alt="test" />
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
