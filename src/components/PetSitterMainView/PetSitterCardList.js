import React from "react";
import style from "../../styles/PetSitterView.module.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import noImg from "../../assets/images/noImg2.svg";
import { useNavigate } from "react-router-dom";

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
  //console.log(props.petSitterList);

  //예약을 위한 펫시터 프로필 이동하기
  const navigate = useNavigate();

  const handleClick = (userID) => {
    navigate(`/sitterProfile/${userID}`);
  };

  return (
    <div style={{ marginTop: "35px" }}>
      {props.petSitterList.map((item, index) => {
        //console.log("item", item);
        //이미지배열 -> nullable 처리
        let imgstr;
        let imgarr;

        if (!!item.sitterHouse) {
          //sitterHouse가 null이 아니면
          imgstr = item.sitterHouse;
          if (typeof imgstr === "string") {
            imgstr = imgstr.substring(1, imgstr.length - 1);
            imgarr = imgstr.split(",");
          }
        }

        //주소 슬라이싱
        let address_slice = item.userAddress;
        //console.log("슬라이싱", address_slice.split(" "));
        let address_slice_arr = address_slice.split(" ");
        let add_str =
          address_slice_arr[0] +
          " " +
          address_slice_arr[1] +
          " " +
          (!!address_slice_arr[2] ? address_slice_arr[2] : "");

        return (
          <div
            id={style.cardItem}
            key={index}
            onClick={() => handleClick(item.userId)}
          >
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
            <div id={style.firstRow}>
              <p>
                {add_str} ·{" "}
                <span>
                  {item.userName.substr(0, 1) +
                    "○" +
                    item.userName.substr(-1, 1)}
                </span>
              </p>
              <div id={style.progressBar}>{item.sitterTem}ºC</div>
            </div>
            <div id={style.secondRow}>{item.sitterMsg}</div>
          </div>
        );
      })}
    </div>
  );
};

export default PetSitterCardList;
