import React, { useEffect, useState } from "react";
import BackTitleHeader from "../../components/BackTitleHeader";
import axios from "axios";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import noImg from "../../assets/images/noImg2.svg";
import style from "../../styles/PSView.module.css";

const PSView = () => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    appendDots: (dots) => (
      <div
        style={{
          width: "100%",
          position: "absolute",
          bottom: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ul> {dots} </ul>
      </div>
    ),
    dotsClass: "dots_custom2",
  };
  const params = useParams();
  console.log(params);

  //이미지 배열
  const [images, setImages] = useState([]);
  //펫시터 프로필 이미지
  const [profileImg, setProfileImg] = useState("");
  //펫시터 정보(등급, 주소, 이름, 온도, 소개)
  const [profileAddress, setProfileAddress] = useState("");
  const [profileName, setProfileName] = useState("");
  const [profileTemp, setProfileTemp] = useState("");
  const [profileMsg, setProfileMsg] = useState("");

  useEffect(() => {
    axios
      .get("/dolbom/detail", {
        params: {
          sitterId: params.userId,
        },
      })
      .then((res) => {
        console.log(res.data);

        //이미지 배열 슬라이싱
        let imgStr = res.data[0].petsitter["sitterHouse"];
        imgStr = imgStr.substring(1, imgStr.length - 1);
        let imgArr = imgStr.split(",");
        setImages(imgArr);

        //펫시터 프로필 이미지
        setProfileImg(!!res.data[0].userImg ? res.data[0].userImg : null);

        //펫시터 정보
        setProfileAddress(res.data[0].userAddress); //주소
        setProfileName(res.data[0].userName); //이름
        setProfileTemp(res.data[0].userTemp); //온도
        setProfileMsg(res.data[0].petsitter["sitterMsg"]); //메세지
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div id={style.aa}>
      <BackTitleHeader title="돌보미 프로필" />
      {/* 이미지 슬라이드 */}
      <Slider {...settings}>
        {!!images ? (
          images.map((imgsrc, i) => (
            <div key={i}>
              <img
                src={imgsrc}
                alt="홈 이미지"
                width="100%"
                height="233px"
                style={{ borderRadius: "10px 10px 0px 0px" }}
              />
            </div>
          ))
        ) : (
          <div>
            <img
              src={noImg}
              alt="이미지 없음 "
              width="100%"
              height="180px"
              style={{ borderRadius: "10px 10px 0px 0px" }}
            />
          </div>
        )}
      </Slider>

      <div className={style.body}>
        {/* 펫시터 정보 */}
        <div id={style.infoBody}>
          <div id={style.infoLeft}>
            <div id={style.profileImg}>
              <img
                src={!profileImg ? noImg : profileImg}
                alt="펫시터 프로필 이미지"
              />
            </div>
          </div>
          <div id={style.infoRight}>
            <div id={style.head}>
              {profileAddress} · <span>{profileName}</span>
              <div>{profileTemp}</div>
            </div>

            <p>{profileMsg}</p>
          </div>
        </div>
        <hr />
        <p className={style.subtitle}>돌봄 환경</p>
        <div></div>
        <hr />
        <p className={style.subtitle}>함께하는 반려동물</p>
        <hr />
        <p className={style.subtitle}>리뷰</p>
        <hr />
        <p className={style.subtitle}>예약 가능 일정</p>
        <hr />
        <p className={style.subtitle}>환불 정책</p>
        <hr />
        <p className={style.subtitle}>이용 규칙</p>
      </div>
    </div>
  );
};

export default PSView;
