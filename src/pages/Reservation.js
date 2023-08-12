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
  const [startTime, setStartTime] = useState("6:00");
  const [endTime, setEndTime] = useState("");

  //날짜 선택하면 시간 초기화
  const handleDaySelect = (date) => {
    setSelected(date);
    if (date) {
      setInputValue(format(date, "y-MM-dd"));
      closePopper();
      setEndTime("");
      setStartTime("6:00");
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
  };
  const time = [
    "6:00",
    "7:00",
    "8:00",
    "9:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
    "23:00",
    "24:00",
  ];

  //기존 코드
  //오늘 날짜 알아오기 - 초기화를 위해
  let today = new Date();
  today = format(today, "y-MM-dd");

  const [selected, setSelected] = useState("");
  const [inputValue, setInputValue] = useState(today);
  const [isPopperOpen, setIsPopperOpen] = useState(false);

  const popperRef = useRef(null);
  const buttonRef = useRef(null);
  const [popperElement, setPopperElement] = useState(null);

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

  //기존 일정 가져오기
  useEffect(() => {
    axios
      .get("/sitter/getSchedule", {
        params: {
          sitterId: "ckdrua76",
          scheduleDay: inputValue,
        },
      })
      .then((res) => {
        //테이블 돌기
        var timetable = document.querySelectorAll(
          "#timetable input[type='checkbox']"
        );

        //테이블 초기화
        for (let z = 0; z < timetable.length; z++) {
          timetable[z].checked = false;
          timetable[z].disabled = false;
        }

        for (let i = 0; i < res.data.length; i++) {
          for (let j = 0; j < timetable.length; j++) {
            if (res.data[i].Hour["Hour2"] === timetable[j].id) {
              if (!res.data[i].Hour["dolbomStatus"]) {
                timetable[j].checked = true;
              } else {
                timetable[j].disabled = true;
              }
            }
          }
        }
      })
      .catch((err) => {});
  }, [inputValue]);

  const handleClick = () => {
    var formData = new FormData();
    formData.append("sitterId", "ckdrua76");
    formData.append("scheduleDay", inputValue);

    axios
      .post("/sitter/schedule", formData)
      .then((res) => {
        alert("일정이 등록되었습니다.");

        //체크박스 해제
        let alldayCheckbox = document.querySelector("#allday");
        alldayCheckbox.checked = false;

        //돌봄 형태 라디오 버튼 해제
        let typeRadiobutton = document.querySelector(
          "input[type=radio][name=type]"
        );
        typeRadiobutton.checked = false;
      })
      .catch((err) => {});
  };

  return (
    <div>
      <div id={styles.title}>
        돌봄이 필요한 날짜와 시간을
        <br />
        선택하세요.
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
{/* 
      <TimeList id="timetable">
        <div className={style.subtitle3}>시간</div>
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
          <div>{endTime ? endTime : "-"}</div>
          
          <div
          className={style.saveBT}
          id={style.frame}
          style={{ textAlign: "right" }}
        >
          <input type="button" value="요청하기" onClick={handleClick} />
        </div>
        </select>
      </TimeList> */}


      <TimeList id="timetable">
        <div className={style.subtitle3} style={{width : "100%"}}>시간</div>
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
        {endTime }
        </div>
        {/* <div>{endTime ? endTime : "-"}</div> */}
        <div
          className={style.saveBT}
          id={style.frame}
          style={{ textAlign: "right", width : "100%" }}
        >
          <input type="button" value="요청하기" onClick={handleClick} />
        </div>
      </TimeList>
    </div>
  );
}

export default Reservation;
