import React from "react";
import { Outlet } from "react-router-dom";
import styles from "../styles/common/MainBTNav.module.css";

const MainBTNav = () => {
  return (
    <div className={styles.frame}>
      <Outlet />
      <div className={styles.btbody}>응애응애</div>
    </div>
  );
};

export default MainBTNav;
