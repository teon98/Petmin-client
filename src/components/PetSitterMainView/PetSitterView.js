import React, { useEffect, useRef, useState } from "react";
import PetSitterCardList from "./PetSitterCardList";
import style from "../../styles/PetSitterView.module.css";
import { format, isValid, parse } from "date-fns";
import { FaLocationDot } from "react-icons/fa6";
import FocusTrap from "focus-trap-react";
import { DayPicker } from "react-day-picker";
import { usePopper } from "react-popper";
import { FaDog } from "react-icons/fa6";
import { FaCalendarDays } from "react-icons/fa6";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { MagnifyingGlass } from "react-loader-spinner";
import axios from "axios";

const PetSitterView = () => {
  //로딩이 느려서 추가
  const [loading, setLoading] = useState(true);

  //사용자 위치
  const [location, setLocation] = useState("서울 마포구 상암동");

  // 펫시터 정보 get
  useEffect(() => {}, []);

  //주소 변경
  const handleChange = (e) => {
    setLocation(e.target.value);
  };

  //돌봄 형태
  const [caretype, setCareType] = useState("산책");

  const careTypeChange = (e) => {
    const {
      target: { name, value },
    } = e;

    if (name === "caretype") {
      setCareType(value);
    }
  };

  //날짜 Pick을 위한 코드 ---------------Start-----------------------
  const [selected, setSelected] = useState();
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
    setInputValue(e.currentTarget.value);
    const date = parse(e.currentTarget.value, "y-MM-dd", new Date());
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
    setSelected(date);
    if (date) {
      setInputValue(format(date, "y-MM-dd"));
      closePopper();
    } else {
      setInputValue("");
    }
  };
  //----------DatePicker-----end-------------//////////////////////////////

  //펫시터 목록
  const [petSitterList, setPetSitterList] = useState([]);
  //날짜 필터링
  const [dateFilter, setDateFilter] = useState("");

  //돌봄유형 필터링
  const [dolbumType, setDolbumType] = useState("");

  //시터 정보 목록 가져오는 요청
  useEffect(() => {
    axios
      .get("/dolbom/filter", {
        params: {
          userId: "으악",
          userAddress: "부천",
        },
      })
      .then((res) => {
        setPetSitterList(res.data);
        setLoading(false);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className={style.petsitterview}>
      {/* 주소 검색 창 */}
      <div className={style.locationSearchBar}>
        <FaLocationDot color="#C7C7C7" size={25} />

        <input
          type="text"
          value={location}
          onChange={handleChange}
          className={style.locationSearch}
        />
        <input
          type="button"
          value="검색"
          id={style.locationSearchButton}
        ></input>
      </div>
      <div id={style.FillterBar}>
        {/* 날짜 선택 */}
        <div data-tooltip-id="my-tooltip2" data-tooltip-content="날짜 선택">
          <FaCalendarDays
            size={25}
            color="#C7C7C7"
            style={{ marginRight: "10px" }}
          />
          <ReactTooltip id="my-tooltip2" place="top" />
        </div>
        <div ref={popperRef} id={style.calendar}>
          <input
            type="text"
            placeholder={format(new Date(), "y-MM-dd")}
            value={inputValue}
            onChange={handleInputChange}
            onClick={handleButtonClick}
            ref={buttonRef}
          />
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
                selected={selected}
                onSelect={handleDaySelect}
              />
            </div>
          </FocusTrap>
        )}
        {/* 산책, 돌봄 */}
        <div id={style.moveRight}>
          <div
            data-tooltip-id="my-tooltip"
            data-tooltip-content="돌봄 유형 선택"
          >
            <FaDog size={25} color="#C7C7C7" style={{ marginRight: "5px" }} />
            <ReactTooltip id="my-tooltip" place="top" />
          </div>
          <div className={style.typetable}>
            <input
              id="산책"
              value="산책"
              type="radio"
              name="type"
              onChange={careTypeChange}
            />
            <label htmlFor="산책">산책</label>
            <input
              id="돌봄"
              value="돌봄"
              type="radio"
              name="type"
              onChange={careTypeChange}
            />
            <label htmlFor="돌봄">돌봄</label>
          </div>
        </div>
      </div>
      {/* 필터링된 펫시터 리스트 */}
      {loading ? (
        <div className={style.loadingAnimation}>
          <MagnifyingGlass
            visible={true}
            height="80"
            width="80"
            ariaLabel="MagnifyingGlass-loading"
            wrapperStyle={{}}
            wrapperClass="MagnifyingGlass-wrapper"
            glassColor="#c0efff"
            color="#e15b64"
          />
          <p id={style.text1}>조건에 맞는 펫시터를 찾고 있어요:)</p>
        </div>
      ) : (
        <PetSitterCardList petSitterList={petSitterList} />
      )}
    </div>
  );
};

export default PetSitterView;
