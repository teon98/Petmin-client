import React, { useRef, useState } from "react";
import style from "../../styles/PetSitterProfile.module.css";
import { DayPicker } from "react-day-picker";
import "../../styles/daypickerCustom.css";
import { usePopper } from "react-popper";
import { format, isValid, parse } from "date-fns";
import FocusTrap from "focus-trap-react";
import axios from "axios";

const ScheduleForm = () => {
  const [selected, setSelected] = useState("");
  const [inputValue, setInputValue] = useState("");
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
    console.log(e.target.value);
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

  const handleDaySelect = (date) => {
    console.log(date);
    setSelected(date);
    if (date) {
      setInputValue(format(date, "y-MM-dd"));
      closePopper();
    } else {
      setInputValue("");
    }
  };

  const AM = ["6:00", "7:00", "8:00", "9:00", "10:00", "11:00", "12:00"];

  const PM = [
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

  //선택한 시간 저장
  const [scheduleTimeList, setScheduleTimeList] = useState([]);

  const handleChange = (e) => {
    console.log(e.target.id);
    if (e.target.checked === true) {
      setScheduleTimeList([...scheduleTimeList, e.target.id]);
    } else if (e.target.checked === false) {
      //삭제
      for (var i = 0; i < scheduleTimeList.length; i++) {
        if (scheduleTimeList[i] === e.target.id) {
          scheduleTimeList.splice(i, 1);
        }
      }
    }
  };

  const handleClick = () => {
    console.log(scheduleTimeList);

    var formData = new FormData();
    formData.append("sitterId", "test11");
    formData.append("scaduleDay", inputValue);
    formData.append("scaduleHour", scheduleTimeList);
    formData.append("dolbomOption", "산책");

    axios
      .post("/sitter/schedule", formData)
      .then((res) => {
        alert("일정이 등록되었습니다.");
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const allHandleClick = (e) => {
    const value = e.target.checked;
    console.log(value);
    var timetable = document.querySelectorAll(
      "#timetable input[type='checkbox']"
    );
    if (value) {
      let alltimelist = [];
      for (let i = 0; i < timetable.length; i++) {
        alltimelist.push(timetable[i].id);
        timetable[i].checked = true;
        setScheduleTimeList(alltimelist);
      }
    } else {
      for (let i = 0; i < timetable.length; i++) {
        timetable[i].checked = false;
        setScheduleTimeList([]);
      }
    }
  };
  return (
    <div>
      <div id={style.frame}>
        <span style={{ color: "#FF6666" }}>■선택 </span>
        <span style={{ color: "#17A1FA" }}>■예약완료</span>
      </div>
      <div id={style.frame}></div>
      <div id={style.frame}>
        <div ref={popperRef}>
          <input
            size={12}
            type="text"
            placeholder={format(new Date(), "y-MM-dd")}
            value={inputValue}
            onChange={handleInputChange}
            ref={buttonRef}
            onClick={handleButtonClick}
            className={style.datepickInput}
          />
          {/* <button type="button">날짜 선택하기</button> */}
        </div>
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
      </div>
      <div id={style.frame} style={{ textAlign: "right" }}>
        <input id="allday" type="checkbox" onClick={allHandleClick} />
        <label htmlFor="allday">종일 가능</label>
      </div>
      <div id="timetable">
        <div className={style.subtitle3}>오전</div>
        <div className={style.timetable}>
          {AM.map((time) => {
            return (
              <div key={time}>
                <input type="checkbox" id={time} onChange={handleChange} />
                <label htmlFor={time}>{time}</label>
              </div>
            );
          })}
        </div>
        <div className={style.subtitle3}>오후</div>
        <div className={style.timetable}>
          {PM.map((time) => {
            return (
              <div key={time}>
                <input type="checkbox" id={time} onChange={handleChange} />
                <label htmlFor={time}>{time}</label>
              </div>
            );
          })}
        </div>
        <div
          className={style.saveBT}
          id={style.frame}
          style={{ textAlign: "right" }}
        >
          <input type="button" value="저장" onClick={handleClick} />
        </div>
      </div>
    </div>
  );
};

export default ScheduleForm;
