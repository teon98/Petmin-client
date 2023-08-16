import React, { useCallback, useEffect, useRef, useState } from "react";
import style from "../styles/PetSitterProfile.module.css";
import { DayPicker } from "react-day-picker";
import "../styles/daypickerCustom.css";
import { usePopper } from "react-popper";
import { format, isValid, parse } from "date-fns";
import FocusTrap from "focus-trap-react";
import axios from "axios";
import styles from "../styles/MypageMenu.module.css";
import { start } from "@popperjs/core";
import { styled } from "styled-components";
import { UNSAFE_LocationContext, useLocation, useNavigate } from "react-router";
import BackTitleHeader2 from "../components/BackTitleHeader2";
import QuestionComponent from "../components/QuestionComponent";
import QuestionFooter from "../components/QuestionFooter";

const TimeList = styled.div`
  display: inline-block;
  select {
    text-align: center;
    height: 46px;
    width: 100px;

    font-family: "PreMedium";
    font-size: 15px;
    color: #ff6666;
    border-radius: 5px;
    border: 2px solid #b3b3b3;
  }
`;

const DateList = styled.div`
  width: 55%;
  display: inline-block;
  margin-right: 20px;
  margin-left: 20px;
`;

export const SelectTimeDateTitle = styled.div`
  color: #323232;
  font-family: PreSemiBold;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-top: 10px;
  margin-bottom: 30px;
`;

function Reservation2(props) {
  const location = useLocation();
  const sitterName = location.state.sitter;
  const sitter = location.state.sitterId;
  const address = location.state.address;

  //은정
  const [startTime, setStartTime] = useState("6");
  const [endTime, setEndTime] = useState("6");
  const [ableStartTime, setAbleStartTime] = useState([]);

  //날짜 선택하면 시간 초기화
  const handleDaySelect = (date) => {
    setSelected(date);
    if (date) {
      setInputValue(format(date, "y-MM-dd"));
      setInputValue2(format(date, "y-MM-dd")); //끝나는 날짜도 초기화
      closePopper();
      setEndTime("6");
      setStartTime("6");
      //시터 일정 불러오기
      //console.log("날짜 입력 받음. 시터 ㅇ리정 가져오겠습니다.");
      sitterSchedule(format(date, "y-MM-dd"), 1);
      // setTime(time.filter((item) => item == ))
    } else {
      setInputValue("");
    }
  };
  const handleDaySelect2 = (date) => {
    //console.log("끝나는 날이 더 큰가? ");
    //console.log(inputValue < format(date, "y-MM-dd"));
    if (inputValue > format(date, "y-MM-dd")) {
      setBtnState(false);
    }
    // //console.log(startTime);
    setSelected2(date);
    if (date) {
      setInputValue2(format(date, "y-MM-dd"));
      //시터 일정 불러오기
      sitterSchedule(format(date, "y-MM-dd"), 2);
      closePopper2();
      setEndTime("6");
    } else {
      setInputValue2("");
    }
  };

  //선택한 시작 시간 알아내기
  const selectTime = (e, n) => {
    //시작 시간
    if (n === "StartTime") {
      setStartTime(e);
      const n = parseInt(e);
      //console.log("n 시간 선택시");
      //console.log(n);
      setBtnState(false);
      setEndTime(e);
      // setTime(stime.filter((item) => item > n));
    }
    //끝나는 시간
    else {
      setEndTime(e);
      //시작날짜.시간 < 종료날짜.시간 일때만 btnState(true)
      //1. 시작날짜 === 종료날짜

      if (
        (inputValue === inputValue2 &&
          parseInt(startTime.split(":")[0]) < parseInt(e.split(":"))) ||
        inputValue < inputValue2
      ) {
        //console.log("1. 시작날짜 === 종료날짜이면서 시간은 큼");
        //console.log("2. 시작날짜 < 종료날짜");
        setBtnState(true);
      } else {
        //console.log("3. 일정을 다시 확인해 주세요");
        setBtnState(false);
      }
      //console.log("******************************************");
      //console.log("시간 선택 완료");
      //console.log("시작날짜");
      //console.log(inputValue);
      //console.log("시작시간");
      //console.log(startTime);
      //console.log("끝나는 날짜");
      //console.log(inputValue2);
      //console.log("끝나는 시간");
      //console.log(e);
      //console.log(endTime);
      //console.log("******************************************");
    }
  };

  // const stime = [
  //   "6",
  //   "7",
  //   "8",
  //   "9",
  //   "10",
  //   "11",
  //   "12",
  //   "13",
  //   "14",
  //   "15",
  //   "16",
  //   "17",
  //   "18",
  //   "19",
  //   "20",
  //   "21",
  //   "22",
  //   "23",
  //   "24",
  // ];
  const [stime, setSTime] = useState([]);
  const [etime, setETime] = useState([]);
  const [time, setTime] = useState([
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
  ]);

  //기존 코드
  //오늘 날짜 알아오기 - 초기화를 위해
  let today = new Date();
  today = format(today, "y-MM-dd");

  const [selected, setSelected] = useState("");
  const [selected2, setSelected2] = useState("");
  const [inputValue, setInputValue] = useState(today);
  const [inputValue2, setInputValue2] = useState(today);
  const [isPopperOpen, setIsPopperOpen] = useState(false);
  const [isPopperOpen2, setIsPopperOpen2] = useState(false);

  const popperRef = useRef(null);
  const popperRef2 = useRef(null);
  const buttonRef = useRef(null);
  const buttonRef2 = useRef(null);
  const [popperElement, setPopperElement] = useState(null);
  const [popperElement2, setPopperElement2] = useState(null);
  const [btnState, setBtnState] = useState(false);
  const nav = useNavigate();

  const popper = usePopper(popperRef.current, popperElement, {
    placement: "bottom-start",
  });
  const popper2 = usePopper(popperRef2.current, popperElement, {
    placement: "bottom-start",
  });

  const closePopper = () => {
    //console.log("closePopper 날짜 선택 하면 창이 닫힘");
    setIsPopperOpen(false);
    buttonRef?.current?.focus();
  };
  const closePopper2 = () => {
    setIsPopperOpen2(false);
    buttonRef2?.current?.focus();
  };

  //선택하면 날짜 바뀜
  const handleInputChange = (e) => {
    //console.log("handleInputChange ... 선택하면 날짜 바뀌게 하는 것인듯");
    //console.log(e.target.value);

    setInputValue(e.target.value);
    const date = parse(e.target.value, "y-MM-dd", new Date());
    if (isValid(date)) {
      setSelected(date);
    } else {
      setSelected(undefined);
    }
  };
  const handleInputChange2 = (e) => {
    setInputValue2(e.target.value);
    const date = parse(e.target.value, "y-MM-dd", new Date());
    if (isValid(date)) {
      setSelected2(date);
    } else {
      setSelected2(undefined);
    }
  };

  //달력 클릭... 시간 초기화 됨
  const handleButtonClick = () => {
    //console.log("handleButtonClick 달력 클릭 시 ... 시간도 초기화 됨");
    setIsPopperOpen(true);
  };
  const handleButtonClick2 = () => {
    //console.log("handleButtonClick 달력 클릭 시 ... 시간도 초기화 됨");
    setIsPopperOpen2(true);
  };

  //날짜 클릭하면 시터 스케줄 가져오기
  const sitterSchedule = (scheduleDay, i) => {
    //console.log(sitter + "시터 일정가져오겠습니다.");

    axios({
      method: "get",
      url: "/sitter/getSchedule",
      params: {
        sitterId: sitter,
        scheduleDay: scheduleDay,
      },
    }).then((res) => {
      //console.log("****************시터 일정 가져오기입니다.****************");
      setBtnState(false);

      //시터 일정 가져와서 dolbomStatus가 0인 것만 다시 배열에 넣기. => 예약 가능한 상태만
      var arr = res.data.filter(
        (item) => item.Hour.dolbomStatus === 0 && item.dolbomOption === "돌봄"
      );

      //기존 코드
      setAbleStartTime(arr.map((item) => item.Hour.Hour2));
      //시작날짜 클릭하면
      if (i === 1) {
        setSTime(() => arr.map((item) => item.Hour.Hour2));
        setETime(() => arr.map((item) => item.Hour.Hour2));
      }
      //끝날짜 클릭하면
      else {
        setETime(() => arr.map((item) => item.Hour.Hour2));
      }
    });
  };

  //요청하기 클릭시
  const handleClick = () => {
    nav("/careRequest3", {
      state: {
        startDate: inputValue,
        startTime: startTime,
        endDate: inputValue2,
        endTime: endTime,
      },
    });
  };

  return (
    <div>
      <BackTitleHeader2
        title={"돌봄 요청"}
        subtitle={"2/3"}
        className="signupStep"
      />
      <div className="registerContainer" style={{ marginTop: "40px" }}>
        <p className="careInfoText">
          {address}
          <span className="pinkColor">{sitterName}</span> 돌보미님
        </p>
        <SelectTimeDateTitle>
          돌봄이 필요한 날짜와 시간을
          <br />
          선택하세요.
        </SelectTimeDateTitle>
      </div>
      <DateList id={style.frame}>
        <div className={style.subtitle3}>돌봄 시작</div>
        <div ref={popperRef}>
          <input
            size={12}
            // type="text"
            placeholder={format(new Date(), "y-MM-dd")}
            value={inputValue}
            onChange={handleInputChange}
            ref={buttonRef}
            onClick={handleButtonClick}
            className={style.datepickInput}
            id="todayDate"
          />
        </div>
        {/* ---------시작달력 */}
        {isPopperOpen && (
          <FocusTrap
            active
            focusTrapOptions={{
              initialFocus: false,
              allowOutsideClick: true,
              clickOutsideDeactivates: true,
              onDeactivate: closePopper,
              fallbackFocus: buttonRef.current,
            }}
          >
            <div
              tabIndex={-1}
              style={popper.styles.popper}
              className="dialog-sheet"
              {...popper.attributes.popper}
              ref={setPopperElement}
              role="dialog"
              aria-label="DayPicker calendar"
            >
              <DayPicker
                initialFocus={isPopperOpen}
                mode="single"
                defaultMonth={selected}
                fromYear={2023}
                selected={selected}
                onSelect={handleDaySelect}
                showOutsideDays
              />
            </div>
          </FocusTrap>
        )}
      </DateList>

      <TimeList id="timetable">
        <select
          name="StartTime"
          id="StartTime"
          onChange={(e) => selectTime(e.target.value, e.target.id)}
          value={startTime}
        >
          {stime.map((hour) => (
            <option key={hour} value={hour}>
              {hour}
            </option>
          ))}
        </select>
      </TimeList>

      {/* -------------------------------- 끝나는 날짜 */}

      <DateList id={style.frame}>
        <div className={style.subtitle3}>돌봄 종료</div>
        <div ref={popperRef2}>
          <input
            size={12}
            // type="text"
            placeholder={format(new Date(), "y-MM-dd")}
            value={inputValue2}
            onChange={handleInputChange2}
            ref={buttonRef2}
            onClick={handleButtonClick2}
            className={style.datepickInput}
            id="todayDate"
          />
        </div>
        {/* -----끝나는 달력 */}
        {isPopperOpen2 && (
          <FocusTrap
            active
            focusTrapOptions={{
              initialFocus: false,
              allowOutsideClick: true,
              clickOutsideDeactivates: true,
              onDeactivate: closePopper2,
              fallbackFocus: buttonRef2.current,
            }}
          >
            <div
              tabIndex={-1}
              style={popper2.styles.popper}
              className="dialog-sheet"
              {...popper2.attributes.popper}
              ref={setPopperElement2}
              role="dialog"
              aria-label="DayPicker calendar"
            >
              <DayPicker
                initialFocus={isPopperOpen2}
                mode="single"
                defaultMonth={selected2}
                fromYear={2023}
                selected={selected2}
                onSelect={handleDaySelect2}
                showOutsideDays
              />
            </div>
          </FocusTrap>
        )}
      </DateList>
      <TimeList id="timetable">
        <select
          name="EndtTime"
          id="EndtTime"
          onChange={(e) => selectTime(e.target.value, e.target.id)}
          value={endTime}
        >
          {etime.map((hour) => (
            <option key={hour} value={hour}>
              {hour}
            </option>
          ))}
        </select>
      </TimeList>
      <div
        className={style.saveBT}
        id={style.frame}
        style={{ textAlign: "right" }}
      >
        <QuestionFooter
          title="요청하기"
          active={btnState}
          onClick={handleClick}
        />
      </div>
    </div>
  );
}

export default Reservation2;
