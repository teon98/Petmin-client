import React, { useCallback, useEffect, useState } from "react";
import BackTitleHeader from "../../components/BackTitleHeader";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import noImg from "../../assets/images/noImg2.svg";
import style from "../../styles/PSView.module.css";
import { FaAngleRight } from "react-icons/fa6";
import StarRatings from "react-star-ratings";
import ProgressBar from "@ramonak/react-progress-bar";
import "../../styles/progress.css";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import FooterPS from "../../components/FooterPS";
import CheckBoxComponent from "../../components/CheckBoxComponent";
import QuestionComponent from "../../components/QuestionComponent";

const PSView = () => {
  const navigate = useNavigate();
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

  //이미지 배열
  const [images, setImages] = useState([]);
  //펫시터 프로필 이미지
  const [profileImg, setProfileImg] = useState("");
  //펫시터 정보(등급, 주소, 이름, 온도, 소개)
  const [profileAddress, setProfileAddress] = useState("");
  const [profileName, setProfileName] = useState("");
  const [profileTemp, setProfileTemp] = useState("");
  const [profileMsg, setProfileMsg] = useState("");

  //돌봄 환경
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [house, setHouse] = useState("");

  const [reviewScore, setReviewScore] = useState(0); //리뷰 총점
  const [reviewDelecacy, setReviewDelecacy] = useState(0); //리뷰 섬세함
  const [reviewKind, setReviewKind] = useState(0); //리뷰 친절도
  const [reviewTime, setReviewTime] = useState(0); //리뷰 시간

  const [petsitterId, setPetsitterId] = useState(""); //펫시터 아이디

  //오늘 날짜 알아오기 - 초기화를 위해
  let today = new Date();
  today = format(today, "y-MM-dd");
  useEffect(() => {
    axios
      .get("/dolbom/detail", {
        params: {
          sitterId: params.userId,
        },
      })
      .then((res) => {
        console.log(res.data);
        console.log(res.data[0].petsitter["userId"]);
        setPetsitterId(res.data[0].petsitter["userId"]);

        //이미지 배열 슬라이싱
        let imgStr = res.data[0].petsitter["sitterHouse"];
        imgStr = imgStr.substring(1, imgStr.length - 1);
        let imgArr = imgStr.split(",");
        setImages(imgArr);

        //펫시터 프로필 이미지
        setProfileImg(!!res.data[0].userImg ? res.data[0].userImg : null);

        //펫시터 정보
        let address_slice = res.data[0].userAddress;
        //console.log("슬라이싱", address_slice.split(" "));
        let address_slice_arr = address_slice.split(" ");
        let add_str =
          address_slice_arr[0] +
          " " +
          address_slice_arr[1] +
          " " +
          (!!address_slice_arr[2] ? address_slice_arr[2] : "");

        let user_name =
          res.data[0].userName.substr(0, 1) +
          "○" +
          res.data[0].userName.substr(-1, 1);

        setProfileAddress(add_str); //주소
        setProfileName(user_name); //이름
        setProfileTemp(res.data[0].userTemp); //온도
        setProfileMsg(res.data[0].petsitter["sitterMsg"]); //메세지

        setGender(res.data[0].sitterSex); //성별
        setAge(Math.floor(res.data[0].sitterAge / 10) * 10); //나이
        setHouse(res.data[0].sitterHousetype); //거주지 형태

        setReviewScore(
          isNaN(res.data[0].reviewScore) ? 0 : res.data[0].reviewScore
        ); //점수

        setReviewKind(
          isNaN(res.data[0].reviewKind * 20) ? 0 : res.data[0].reviewKind * 20
        ); //친절도
        setReviewTime(
          isNaN(res.data[0].reviewTime * 20) ? 0 : res.data[0].reviewTime * 20
        ); //시간약속
        setReviewDelecacy(
          isNaN(res.data[0].reviewDelecacy * 20)
            ? 0
            : res.data[0].reviewDelecacy * 20
        ); //섬세함
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("/sitter/getSchedule", {
        params: {
          sitterId: params.userId,
          scheduleDay: today,
        },
      })
      .then((res) => {
        console.log("날자", res.data);
        //케어타입이 산책인지,날짜인지 구분
        let careTypeFilltering = [];
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i]["dolbomOption"] === caretype) {
            console.log("응애", res.data[i]["Hour"]);

            let baby = res.data[i]["Hour"];
            if (baby.dolbomStatus === 0) {
              careTypeFilltering.push(baby.Hour2);
            }
          }
        }
        console.log("careTypeFilltering", careTypeFilltering);
        setScheduleData(careTypeFilltering);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [caretype, setCaretype] = useState("산책");

  const handleChange = (e) => {
    console.log(e.target.value);
    setCaretype(e.target.value);

    let sitterdate;

    if (!selectedDay) {
      sitterdate = today;
    } else {
      sitterdate = format(selectedDay, "y-MM-dd");
    }

    console.log("케어타입", caretype);
    axios
      .get("/sitter/getSchedule", {
        params: {
          sitterId: params.userId,
          scheduleDay: sitterdate,
        },
      })
      .then((res) => {
        console.log("날자", res.data);
        //케어타입이 산책인지,날짜인지 구분
        let careTypeFilltering = [];
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i]["dolbomOption"] === e.target.value) {
            console.log("응애", res.data[i]["Hour"]);

            let baby = res.data[i]["Hour"];
            if (baby.dolbomStatus === 0) {
              careTypeFilltering.push(baby.Hour2);
            }
          }
        }
        console.log("careTypeFilltering", careTypeFilltering);
        setScheduleData(careTypeFilltering);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  ///////////////////////////////날짜///////////////////////////////
  const [selectedDay, setSelectedDay] = useState();
  const [scheduleData, setScheduleData] = useState([
    { Hour2: "10:00", dolbomStatus: 0 },
  ]);

  const handleSelect = (e) => {
    if (!e) {
      return;
    }
    console.log("잉잉", e);
    setSelectedDay(e);
    let sitterdate = format(e, "y-MM-dd");

    console.log("케어타입", caretype);
    axios
      .get("/sitter/getSchedule", {
        params: {
          sitterId: params.userId,
          scheduleDay: sitterdate,
        },
      })
      .then((res) => {
        console.log("날자", res.data);
        //케어타입이 산책인지,날짜인지 구분
        let careTypeFilltering = [];
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i]["dolbomOption"] === caretype) {
            console.log("응애", res.data[i]["Hour"]);

            let baby = res.data[i]["Hour"];
            if (baby.dolbomStatus === 0) {
              careTypeFilltering.push(baby.Hour2);
            }
          }
        }
        console.log("careTypeFilltering", careTypeFilltering);
        setScheduleData(careTypeFilltering);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // useEffect(() => {
  //   console.log("scheduleData:", scheduleData);
  // }, [scheduleData]);

  //////////////////////////////////////////////////////////////////
  const [petList, setPetList] = useState("");
  const [petListOptions, setPetListOptions] = useState([]);

  const petTendency1Change = (e) => {
    const value = e.target.value;
    setPetList(value);
  };

  useEffect(() => {
    axios({
      url: `/petProfileList/${petsitterId}`,
      method: "get",
    })
      .then((res) => {
        console.log(res.data);
        setPetList(res.data);
        const options = res.data.map((pet) => {
          let icon = "◌";

          if (pet.petSex === "남아") {
            icon = "♂️";
          } else if (pet.petSex === "여아") {
            icon = "♀";
          }
          return {
            name: "careType",
            value: `${pet.petNo}`,
            label: `${icon} ${pet.petName} (${pet.petAge})`,
          };
        });
        setPetListOptions(options);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [petsitterId]);

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
            <div id={style.levelIcon}>
              <div id={style.leveltext}>단기 돌보미</div>
            </div>
            <div id={style.head}>
              {profileAddress} · <span>{profileName}</span>
              <div>{profileTemp}ºC</div>
            </div>

            <p>{profileMsg}</p>
          </div>
        </div>
        <hr />
        <div className={style.box}>
          <p className={style.subtitle}>돌봄 환경</p>
          <div className={style.tag}>
            <input type="button" value={gender} />
            <input type="button" value={`${age}+`} />
            <input type="button" value={house} />
          </div>
        </div>
        <hr />
        <div className={style.box}>
          <p className={style.subtitle}>함께하는 반려동물</p>
          <div className={style.card}>
            <div id={style.petImg}>
              <img src={noImg} alt="펫시터 프로필 이미지" />
            </div>
            <div id={style.cardMiddle}>
              <div style={{ marginBottom: "20px" }}>♂️ 유자두(3세)</div>
              <div>인스타그램을 운영중입니다.</div>
            </div>
            <div id={style.cardRight}>
              <FaAngleRight color="#FF8989" size={25} />
            </div>
          </div>
        </div>
        <hr />
        <div className={style.box}>
          <div className={style.subtitle} style={{ marginBottom: "10px" }}>
            <span style={{ marginRight: "20px" }}>리뷰</span>
            <StarRatings
              rating={reviewScore}
              starDimension="25px"
              starSpacing="1px"
              starRatedColor="#FDC90E"
            />
          </div>
          <div className={style.progress}>
            <ProgressBar completed={reviewKind} customLabel="친절도" />
            <ProgressBar completed={reviewTime} customLabel="시간약속" />
            <ProgressBar completed={reviewDelecacy} customLabel="섬세함" />
          </div>

          <div
            id={style.reviewall}
            onClick={() => {
              navigate(`/sitterProfile/${params.userId}/review`);
            }}
          >{`리뷰 전체보기 >`}</div>
          <div className={`${style.box} ${style.reviewBox}`}>
            <div className={style.reviewCard}>
              <p id={style.reviewtitleName}>김0민</p>
              <p id={style.reviewtitleContent}>
                강아지가 편하게 잘 놀고 왔다는 것이 느껴졌어요 돌보미님 최고!
              </p>
            </div>
            <div className={style.reviewCard}>
              <p id={style.reviewtitleName}>김0민</p>
              <p id={style.reviewtitleContent}>
                강아지가 편하게 잘 놀고 왔다는 것이 느껴졌어요 돌보미님 최고!
                강아지가 편하게 잘 놀고 왔다는 것이 느껴졌어요 돌보미님 최고!
                강아지가 편하게 잘 놀고 왔다는 것이 느껴졌어요 돌보미님 최고!
              </p>
            </div>
          </div>
        </div>
        <hr />
        <div className={style.box}>
          <p className={style.subtitle}>예약 가능 일정</p>
          <p className={style.subtitle2}>돌봄 유형</p>
          <div className={style.caretypeButton}>
            <input
              type="radio"
              value="산책"
              name="caretype"
              id="산책"
              onChange={handleChange}
              checked={caretype === "산책"}
            />
            <label htmlFor="산책">산책</label>
            <input
              type="radio"
              value="돌봄"
              name="caretype"
              id="돌봄"
              onChange={handleChange}
              checked={caretype === "돌봄"}
            />
            <label htmlFor="돌봄">돌봄</label>
          </div>
          <p className={style.subtitle2}>일자</p>
          <div className={style.daypickerStyle}>
            <DayPicker
              mode="single"
              selected={selectedDay}
              onSelect={handleSelect}
            />
          </div>
          <div className={style.timetable} id="timetable">
            <p className={style.subtitle2}>시간</p>
            <hr />
            <p className={style.subtitle3}>오전</p>
            <div style={{ marginLeft: "10px", marginRight: "10px" }}>
              <input
                type="checkbox"
                id="06:00"
                value="06:00"
                disabled
                className={`${
                  scheduleData.includes("6:00") ? style.yes : style.no
                }`}
              />
              <label htmlFor="06:00">06:00</label>

              <input
                type="checkbox"
                id="07:00"
                value="07:00"
                disabled
                className={`${
                  scheduleData.includes("7:00") ? style.yes : style.no
                }`}
              />
              <label htmlFor="07:00">07:00</label>

              <input
                type="checkbox"
                id="08:00"
                value="08:00"
                disabled
                className={`${
                  scheduleData.includes("8:00") ? style.yes : style.no
                }`}
              />
              <label htmlFor="08:00">08:00</label>

              <input
                type="checkbox"
                id="09:00"
                value="09:00"
                disabled
                className={`${
                  scheduleData.includes("9:00") ? style.yes : style.no
                }`}
              />
              <label htmlFor="09:00">9:00</label>

              <input
                type="checkbox"
                id="10:00"
                value="10:00"
                disabled
                className={`${
                  scheduleData.includes("10:00") ? style.yes : style.no
                }`}
              />
              <label htmlFor="10:00">10:00</label>

              <input
                type="checkbox"
                id="11:00"
                value="11:00"
                disabled
                className={`${
                  scheduleData.includes("11:00") ? style.yes : style.no
                }`}
              />
              <label htmlFor="11:00">11:00</label>

              <input
                type="checkbox"
                id="12:00"
                value="12:00"
                disabled
                className={`${
                  scheduleData.includes("12:00") ? style.yes : style.no
                }`}
              />
              <label htmlFor="12:00">12:00</label>
            </div>
            <p className={style.subtitle3}>오후</p>
            <div style={{ marginLeft: "10px", marginRight: "10px" }}>
              <input
                type="checkbox"
                id="13:00"
                value="13:00"
                disabled
                className={`${
                  scheduleData.includes("13:00") ? style.yes : style.no
                }`}
              />
              <label htmlFor="13:00">13:00</label>

              <input
                type="checkbox"
                id="14:00"
                value="14:00"
                disabled
                className={`${
                  scheduleData.includes("14:00") ? style.yes : style.no
                }`}
              />
              <label htmlFor="14:00">14:00</label>

              <input
                type="checkbox"
                id="15:00"
                value="15:00"
                disabled
                className={`${
                  scheduleData.includes("15:00") ? style.yes : style.no
                }`}
              />
              <label htmlFor="15:00">15:00</label>

              <input
                type="checkbox"
                id="16:00"
                value="16:00"
                disabled
                className={`${
                  scheduleData.includes("16:00") ? style.yes : style.no
                }`}
              />
              <label htmlFor="16:00">16:00</label>

              <input
                type="checkbox"
                id="17:00"
                value="17:00"
                disabled
                className={`${
                  scheduleData.includes("17:00") ? style.yes : style.no
                }`}
              />
              <label htmlFor="17:00">17:00</label>

              <input
                type="checkbox"
                id="18:00"
                value="18:00"
                disabled
                className={`${
                  scheduleData.includes("18:00") ? style.yes : style.no
                }`}
              />
              <label htmlFor="18:00">18:00</label>

              <input
                type="checkbox"
                id="19:00"
                value="19:00"
                disabled
                className={`${
                  scheduleData.includes("19:00") ? style.yes : style.no
                }`}
              />
              <label htmlFor="19:00">19:00</label>

              <input
                type="checkbox"
                id="20:00"
                value="20:00"
                disabled
                className={`${
                  scheduleData.includes("20:00") ? style.yes : style.no
                }`}
              />
              <label htmlFor="20:00">20:00</label>

              <input
                type="checkbox"
                id="21:00"
                value="21:00"
                disabled
                className={`${
                  scheduleData.includes("21:00") ? style.yes : style.no
                }`}
              />
              <label htmlFor="21:00">21:00</label>

              <input
                type="checkbox"
                id="22:00"
                value="22:00"
                disabled
                className={`${
                  scheduleData.includes("22:00") ? style.yes : style.no
                }`}
              />
              <label htmlFor="22:00">22:00</label>

              <input
                type="checkbox"
                id="23:00"
                value="23:00"
                disabled
                className={`${
                  scheduleData.includes("23:00") ? style.yes : style.no
                }`}
              />
              <label htmlFor="23:00">23:00</label>

              <input
                type="checkbox"
                id="24:00"
                value="24:00"
                disabled
                className={`${
                  scheduleData.includes("24:00") ? style.yes : style.no
                }`}
              />
              <label htmlFor="24:00">24:00</label>
            </div>
          </div>
        </div>
        <hr />
        <div className={style.box}>
          <p className={style.subtitle}>환불 정책</p>
        </div>
        <hr />
        <div className={style.box}>
          <p className={style.subtitle}>이용 규칙</p>
        </div>
        <QuestionComponent
          questionText2={"반려견 선택"}
          options={petListOptions}
          onChange={petTendency1Change}
          selectedValue={petList}
        />
      </div>
      {/* 바텀 */}
      <FooterPS sitter={profileName} sitterId={params.userId} />
    </div>
  );
};

export default PSView;
