import React from "react";
import styles from "../styles/common/BackTitleHeader.module.css";
import BackButton from "./BackButton";

const BackTitleHeader = (props) => {
  return (
    <>
      <div className={styles.NavBody}>
        <div className={styles.goback}>
          <BackButton />
        </div>
        <div className={styles.title}>{props.title}</div>
      </div>
    </>
  );
};

export default BackTitleHeader;
