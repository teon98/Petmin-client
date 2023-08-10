import React from "react";
import style from "../../styles/PetSitterView.module.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import noImg from "../../assets/images/noImg2.svg";

const PetSitterCardList = (props) => {
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
  console.log(props.petSitterList);
  return (
    <div style={{ marginTop: "35px" }}>
      {props.petSitterList.map((item, index) => {
        //이미지배열 -> nullable 처리
        let imgstr;
        let imgarr;

        if (!!item.sitterHouse) {
          //sitterHouse가 null이 아니면
          imgstr = item.sitterHouse;
          if (typeof imgstr === "string") {
            imgstr = imgstr.substring(1, imgstr.length - 1);
            imgarr = imgstr.split(",");
            console.log("imgarr", imgarr);
          }
        }

        return (
          <div id={style.cardItem} key={index}>
            <Slider {...settings}>
              {!!item.sitterHouse ? (
                imgarr.map((imgsrc, i) => (
                  <div key={i}>
                    <img
                      src={imgsrc}
                      alt="홈 이미지"
                      width="100%"
                      height="180px"
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
            {/* <Slider {...settings}>
              <div>
                <h3>1</h3>
              </div>
              <div>
                <h3>1</h3>
              </div>
            </Slider> */}
          </div>
        );
      })}
    </div>
  );
};

export default PetSitterCardList;
