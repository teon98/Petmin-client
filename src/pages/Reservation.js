import React, { useCallback, useEffect, useRef, useState } from "react";
import style from "../styles/PetSitterProfile.module.css";
import { DayPicker } from "react-day-picker";
import "../styles/daypickerCustom.css";
import { usePopper } from "react-popper";
import { format, isValid, parse } from "date-fns";
import FocusTrap from "focus-trap-react";
import axios from "axios";
import styles from "../styles/MypageMenu.module.css";
import { styled } from "styled-components";
import QuestionFooter from "../components/QuestionFooter";
import { useLocation, useNavigate } from "react-router-dom";
import BackTitleHeader2 from "../components/BackTitleHeader2";
import { SelectTimeDateTitle } from "./Reservation2";

const TimeList = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: 20px;
  margin-right: 20px;
  box-sizing: border-box;

  select {
    text-align: center;
    height: 46px;
    width: 160px;

    font-family: "PreMedium";
    font-size: 15px;
    color: #ff6666;
    border-radius: 5px;
    border: 2px solid #b3b3b3;
    margin-right: 20px;
  }
  .endTime {
    text-align: center;
    height: 42px;
    width: 158px;
    font-family: "PreMedium";
    font-size: 15px;
    color: #ff6666;
    border-radius: 5px;
    border: 2px solid #b3b3b3;
    line-height: 43px;
  }
`;

const DateList = styled.div`
  width: 85%;
  display: inline-block;
  margin-right: 20px;
  margin-left: 20px;
`;

function Reservation(props) {
  //은정
  // const [startTime, setStartTime] = useState("6:00");
  const [startTime, setStartTime] = useState([]);
  const [endTime, setEndTime] = useState("");
  const [btnState, setBtnState] = useState(false);
  const location = useLocation();
  const sitterName = location.state.sitter;
  const sitter = location.state.sitterId;
  const address = location.state.address;

  //날짜 선택하면 시간 초기화
  const handleDaySelect = (date) => {
    setSelected(date);
    if (date) {
      setInputValue(format(date, "y-MM-dd"));
      closePopper();
      setEndTime("");
      setStartTime("6:00");
      sitterSchedule(format(date, "y-MM-dd"));
    } else {
      setInputValue("");
    }
  };

  //선택한 시작 시간 알아내기
  const selectTime = (e) => {
    setStartTime(e);
    const sTime = parseInt(e.split(":")[0]) + 1;
    //끝시간 설정
    setEndTime((sTime > 24 ? 1 : sTime) + ":00");
    setBtnState(true);
  };
  const [time, setTime] = useState([]);
  // const time = [
  //   "6:00",
  //   "7:00",
  //   "8:00",
  //   "9:00",
  //   "10:00",
  //   "11:00",
  //   "12:00",
  //   "13:00",
  //   "14:00",
  //   "15:00",
  //   "16:00",
  //   "17:00",
  //   "18:00",
  //   "19:00",
  //   "20:00",
  //   "21:00",
  //   "22:00",
  //   "23:00",
  //   "24:00",
  // ];

  //기존 코드
  //오늘 날짜 알아오기 - 초기화를 위해
  let today = new Date();
  today = format(today, "y-MM-dd");
  const nav = useNavigate();

  const [selected, setSelected] = useState("");
  const [inputValue, setInputValue] = useState(today);
  const [isPopperOpen, setIsPopperOpen] = useState(false);

  const popperRef = useRef(null);
  const buttonRef = useRef(null);
  const [popperElement, setPopperElement] = useState(null);
  const [ableStartTime, setAbleStartTime] = useState([]);

  const popper = usePopper(popperRef.current, popperElement, {
    placement: "bottom-start",
  });

  const closePopper = () => {
    setIsPopperOpen(false);
    buttonRef?.current?.focus();
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    const date = parse(e.target.value, "y-MM-dd", new Date());
    if (isValid(date)) {
      setSelected(date);
    } else {
      setSelected(undefined);
    }
  };

  const handleButtonClick = () => {
    setIsPopperOpen(true);
  };
  useEffect(() => {
    //렌더링되면 오늘 일정 가져오기
    sitterSchedule(format(new Date(), "y-MM-dd"));
  }, []);

  //시터 일정 가져오기
  const sitterSchedule = (scheduleDay, i) => {
    console.log(sitter + "시터 일정가져오겠습니다.");

    axios({
      method: "get",
      url: "/sitter/getSchedule",
      params: {
        sitterId: sitter,
        scheduleDay: scheduleDay,
      },
    }).then((res) => {
      console.log("****************시터 일정 가져오기입니다.****************");
      setBtnState(false);

      //시터 일정 가져와서 dolbomStatus가 0인 것만 다시 배열에 넣기. => 예약 가능한 상태만
      var arr = res.data.filter(
        (item) => item.Hour.dolbomStatus === 0 && item.dolbomOption === "산책"
      );
      console.log("시터 일정임");
      console.log(arr);

      //기존 코드
      //시작날짜 클릭하면
      setTime(() => arr.map((item) => item.Hour.Hour2));
    });
  };

  const handleClick = () => {
    console.log("요청하기 버튼 클릭함");
    nav("/careRequest3", {
      state: {
        startDate: inputValue,
        startTime: startTime,
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
          산책이 필요한 날짜와 시간을
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
        <div className={style.subtitle3} style={{ width: "100%" }}>
          시간
        </div>
        <select
          name="StartTime"
          id="StartTime"
          onChange={(e) => selectTime(e.target.value)}
          value={startTime}
        >
          {time.map((hour) => (
            <option key={hour} value={hour}>
              {hour}
            </option>
          ))}
        </select>
        <div
          className="endTime"
          name="StartTime"
          id="StartTime"
          // onChange={(e) => selectTime(e.target.value)}
          value={endTime}
        >
          {endTime}
        </div>
        {/* <div>{endTime ? endTime : "-"}</div> */}
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

export default Reservation;
