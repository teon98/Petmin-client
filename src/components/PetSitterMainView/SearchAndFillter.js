import React, { useState } from "react";

const SearchAndFillter = () => {
  const [location, setLocation] = useState("서울시 마포구 상암동");

  return (
    <div>
      <input type="text" value={location} />
    </div>
  );
};

export default SearchAndFillter;
