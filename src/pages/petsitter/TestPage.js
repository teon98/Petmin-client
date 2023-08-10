import React from "react";
import BackTitleHeader from "../../components/BackTitleHeader";

const TestPage = () => {
  return (
    <div>
      <BackTitleHeader title="실버 펫시터 시험" />
      <div>
        <br />
        <h1 style={{ textAlign: "center", fontFamily: "PreBold" }}>
          1번 강아지는 총 몇마리인가요?
        </h1>
      </div>
    </div>
  );
};

export default TestPage;
