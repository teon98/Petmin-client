import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";

import banner1 from "../assets/images/Main/banner1_noDots.png";
import banner2 from "../assets/images/Main/banner2_noDots.png";
import banner3 from "../assets/images/Main/banner3_noDots.png";
import { Link } from "react-router-dom";

const MainHeader = () => {
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
    <div style={{ width: "100%" }}>
      <Slider {...settings}>
        <Link to="/about">
          <div>
            <img src={banner1} alt="배너1" width="100%" />
          </div>
        </Link>
        <Link to="/petsittertest">
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

export default MainHeader;
