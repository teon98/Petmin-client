import React from "react";
import BackTitleHeader from "../../components/BackTitleHeader";
import styles from "../../styles/banner/layout.module.css";

const Hospital = () => {
  return (
    <div className={styles.frame}>
      <BackTitleHeader title="병원목록" />
      병원목록페이지
    </div>
  );
};

export default Hospital;
