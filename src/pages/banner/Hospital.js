import React, { useEffect } from "react";
import BackTitleHeader from "../../components/BackTitleHeader";
import styles from "../../styles/banner/layout.module.css";

const Hospital = () => {
  return (
    <div className={styles.frame}>
      <BackTitleHeader title="병원목록" />
    </div>
  );
};

export default Hospital;
