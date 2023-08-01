import React from "react";
import styles from "../styles/common/BackTitleHeader.module.css";
import BackButton from "./BackButton";

const BackTitleHeader = (props) => {
  return (
    <div className={styles.NavBody}>
      <BackButton
        className={styles.goback}
        align="left"
        vertical-align="middle"
      />
      <div className={styles.title} align="center" vertical-align="middle">
        {props.title}
      </div>
    </div>
  );
};

export default BackTitleHeader;
