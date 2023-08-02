import React from "react";
import BackTitleHeader from "../components/BackTitleHeader";
import styles from "../styles/banner/layout.module.css";

const Alarm = () => {
  return (
    <div className={styles.frame}>
      <BackTitleHeader title="알림" />
    </div>
  );
};

export default Alarm;
