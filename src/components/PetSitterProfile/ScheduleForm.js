import React, { useRef, useState } from "react";
import style from "../../styles/PetSitterProfile.module.css";
import { DayPicker } from "react-day-picker";
import "../../styles/daypickerCustom.css";
import { usePopper } from "react-popper";
import { format, isValid, parse } from "date-fns";
import FocusTrap from "focus-trap-react";

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
    console.log(e);
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
        <input id="allday" type="checkbox" />
        <label htmlFor="allday">종일 가능</label>
      </div>
      <div>
        <div className={style.subtitle3}>오전</div>
        <div className={style.timetable}>
          <button className={style.timeBT}>6:00</button>
          <button className={style.timeBT}>7:00</button>
          <button className={style.timeBT}>8:00</button>
          <button className={style.timeBT}>9:00</button>
          <button className={style.timeBT}>10:00</button>
          <button className={style.timeBT}>11:00</button>
          <button className={style.timeBT}>12:00</button>
        </div>
        <div className={style.subtitle3}>오후</div>
        <div className={style.timetable}>
          <button className={style.timeBT}>13:00</button>
          <button className={style.timeBT}>14:00</button>
          <button className={style.timeBT}>15:00</button>
          <button className={style.timeBT}>16:00</button>
          <button className={style.timeBT}>17:00</button>
          <button className={style.timeBT}>18:00</button>
          <button className={style.timeBT}>19:00</button>
          <button className={style.timeBT}>20:00</button>
          <button className={style.timeBT}>21:00</button>
          <button className={style.timeBT}>22:00</button>
          <button className={style.timeBT}>23:00</button>
          <button className={style.timeBT}>24:00</button>
        </div>
        <div
          className={style.saveBT}
          id={style.frame}
          style={{ textAlign: "right" }}
        >
          <input type="button" value="저장" />
        </div>
      </div>
    </div>
  );
};

export default ScheduleForm;
