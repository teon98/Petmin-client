import React, { useState } from "react";
import "react-day-picker/dist/style.css";
import { DayPicker } from "react-day-picker";

const SearchAndFillter = () => {
  const [location, setLocation] = useState("서울시 마포구 상암동");

  return (
    <div>
      <input type="text" value={location} />

      <div>
        <input id="option1" type="radio" name="type" value="돌봄" />
        <label htmlFor="option1">돌봄</label>
      </div>
      <div>
        <input id="option2" type="radio" name="type" value="산책" />
        <label htmlFor="option2">산책</label>
      </div>
    </div>
  );
};

export default SearchAndFillter;
