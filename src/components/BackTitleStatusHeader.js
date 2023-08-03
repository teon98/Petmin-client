import React from "react";
import styles from "../styles/common/BackTitleHeader.module.css";
import BackButton from "./BackButton";

const BackTitleStatusHeader = (props) => {
  return (
    <>
      <div className={styles.NavBody}>
        <div className={styles.goback}>
          <BackButton />
        </div>
        <div className={styles.title}>{props.title}</div>
        {/* 1/2와 같은 상태 추가할 예정 */}
      </div>
    </>
  );
};

export default BackTitleStatusHeader;
