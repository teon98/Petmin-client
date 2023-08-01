import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import banner1 from "../assets/images/Main/banner1_noDots.png";
import banner2 from "../assets/images/Main/banner2_noDots.png";
import banner3 from "../assets/images/Main/banner3_noDots.png";
import style from "../styles/Main.module.css";
import "../styles/dotCustom.css";
import { FaBell } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Main = () => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    appendDots: (dots) => (
      <div
        style={{
          width: "100%",
          position: "absolute",
          bottom: "24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          left: "20px",
        }}
      >
        <ul> {dots} </ul>
      </div>
    ),
    dotsClass: "dots_custom",
  };
  return (
    <div className={style.mainbody}>
      {/* 알림 Header */}
      <div className={style.mainHeader}>
        <Link to="/alarm">
          <FaBell
            size="24"
            color="white"
            style={{
              marginRight: "15px",
              marginTop: "15px",
              cursor: "pointer",
            }}
          />
        </Link>
      </div>
      {/* 이미지 배너 슬라이더 */}
      <Slider {...settings}>
        <Link to="/about">
          <div>
            <img src={banner1} alt="배너1" width="100%" />
          </div>
        </Link>
        <Link to="/register">
          <div>
            <img src={banner2} alt="배너2" width="100%" />
          </div>
        </Link>
        <Link to="/hospital">
          <div>
            <img src={banner3} alt="배너3" width="100%" />
          </div>
        </Link>
      </Slider>
    </div>
  );
};

export default Main;
