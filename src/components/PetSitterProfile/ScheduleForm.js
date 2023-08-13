import React, { useCallback, useEffect, useRef, useState } from "react";
import style from "../../styles/PetSitterProfile.module.css";
import { DayPicker } from "react-day-picker";
import "../../styles/daypickerCustom.css";
import { usePopper } from "react-popper";
import { format, isValid, parse } from "date-fns";
import FocusTrap from "focus-trap-react";
import axios from "axios";
import { idtextAtom } from "../../atom/atoms";
import { useRecoilState } from "recoil";

const ScheduleForm = () => {
  const [userId] = useRecoilState(idtextAtom);
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
    console.log("date", date);
    setScheduleTimeList([]);

    // 기존 일정 불러오기
    axios
      .get("/sitter/getSchedule", {
        params: {
          sitterId: userId,
          scheduleDay: format(date, "y-MM-dd"),
        },
      })
      .then((res) => {
        console.log("응애", res.data);
        let timearr = [];
        for (let i = 0; i < res.data.length; i++) {
          console.log(res.data[i].Hour["Hour2"]);
          timearr.push(res.data[i].Hour["Hour2"]);
        }
        setScheduleTimeList(timearr);
      })
      .catch((err) => {
        console.log(err);
      });
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
    console.log("??", e.target.checked);
    if (e.target.checked === true) {
      setScheduleTimeList([...scheduleTimeList, e.target.id]);
    } else if (e.target.checked === false) {
      //삭제
      var aa = [...scheduleTimeList];
      for (var i = 0; i < scheduleTimeList.length; i++) {
        if (aa[i] === e.target.id) {
          aa.splice(i, 1);
        }
      }
      console.log(aa);
      setScheduleTimeList(aa);
    }
  };

  //기존 일정 가져오기
  useEffect(() => {
    axios
      .get("/sitter/getSchedule", {
        params: {
          sitterId: userId,
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
          console.log(res.data[i].Hour["Hour2"]);
          console.log(res.data[i].Hour["dolbomStatus"]);
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
      .catch((err) => {
        console.log(err);
      });
  }, [inputValue]);

  const handleClick = () => {
    console.log(scheduleTimeList);
    //console.log(type);

    var formData = new FormData();
    formData.append("sitterId", userId);
    formData.append("scheduleDay", inputValue);
    formData.append("scheduleHour", scheduleTimeList);
    formData.append("dolbomOption", type);

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
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const allHandleClick = (e) => {
    const value = e.target.checked;
    //console.log(value);
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
  //돌봄 형태
  const [type, setType] = useState("산책");

  const typeChange = (e) => {
    const {
      target: { name, value },
    } = e;

    if (name === "type") {
      setType(value);
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
            id="todayDate"
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
      <div className={style.subtitle3}>돌봄 형태</div>
      <div className={style.typetable}>
        <input
          id="type1"
          value="산책"
          type="radio"
          name="type"
          onChange={typeChange}
        />
        <label htmlFor="type1">산책</label>
        <input
          id="type2"
          value="돌봄"
          type="radio"
          name="type"
          onChange={typeChange}
        />
        <label htmlFor="type2">돌봄</label>
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
