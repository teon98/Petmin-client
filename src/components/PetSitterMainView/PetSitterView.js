import React, { useCallback, useEffect, useRef, useState } from "react";
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

  //주소 변경
  const handleChange = (e) => {
    setLocation(e.target.value);
  };

  //오늘 날짜 알아오기 - 초기화를 위해
  let today = new Date();
  today = format(today, "y-MM-dd");

  //돌봄 형태
  const [caretype, setCareType] = useState("");

  const careTypeChange = (e) => {
    //console.log(e.target.name);
    if (e.target.name === "caretype") {
      setCareType(e.target.value);
      setPetSitterList(
        petSitterList.filter((item) => {
          console.log("item", item.dolbomOption);
          return item.dolbomOption.includes(e.target.value);
        })
      );
    }
  };

  //날짜 Pick을 위한 코드 ---------------Start-----------------------
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
      //날짜 배열 중에 선택된 날짜가 포함되어 있으면 그 날짜로 필터링
      let findDate = format(date, "y-MM-dd");
      console.log("originList", originList);
      setPetSitterList(
        originList.filter((item) => {
          console.log("item", item.scheduleDay);
          console.log("findDate", findDate);
          return item.scheduleDay.includes(findDate);
        })
      );
    } else {
      setInputValue("");
    }
  };
  //----------DatePicker-----end-------------//////////////////////////////

  //펫시터 목록
  const [petSitterList, setPetSitterList] = useState([]); //막 바뀌는 친구
  const [originList, setOriginList] = useState([]); //필터링 할 때 원본 보존할 친구

  //날짜 필터링
  const [dateFilter, setDateFilter] = useState("");

  //돌봄유형 필터링
  const [dolbumType, setDolbumType] = useState("");

  //시터 정보 목록 가져오는 요청
  //로그인한 사용자의 닉네임과 주소가 들어가도록 한다.
  //태양: 추후 recoil로 받아온 정보가 들어오게 하기
  useEffect(() => {
    axios
      .get("/dolbom/filter", {
        params: {
          userId: "으악",
          userAddress: "부천",
        },
      })
      .then((res) => {
        console.log(res.data);
        setPetSitterList(res.data);
        setOriginList(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //사용자 정보에 저장되어있지 않은 다른 위치를 검색할 때
  const anotherLocationSearch = useCallback(() => {
    console.log(location);
    setLoading(true);
    axios
      .get("/dolbom/filter", {
        params: {
          userId: "으악",
          userAddress: location,
        },
      })
      .then((res) => {
        console.log(res.data);
        setPetSitterList(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [location]);

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
          onClick={anotherLocationSearch}
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
            placeholder={"날짜검색"}
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
              name="caretype"
              onChange={careTypeChange}
            />
            <label htmlFor="산책">산책</label>
            <input
              id="돌봄"
              value="돌봄"
              type="radio"
              name="caretype"
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
      ) : petSitterList.length === 0 ? (
        <div id={style.sorryFrame}>
          검색 조건에 맞는 펫시터를 찾지 못했습니다😭
        </div>
      ) : (
        <PetSitterCardList petSitterList={petSitterList} />
      )}
    </div>
  );
};

export default PetSitterView;
