import React from "react";
import test from "../../assets/images/실버 펫시험.mp4";
import BackTitleHeader from "../../components/BackTitleHeader";
const TestVideo = () => {
  return (
    <div>
      <BackTitleHeader title="실버 펫시터 시험 동영상" />
      <video muted loop autoPlay style={{ width: "100%", height: "100%" }}>
        <source src={test} type="video/mp4"></source>
      </video>
    </div>
  );
};

export default TestVideo;
