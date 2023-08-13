import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import styles from "../styles/common/MainBTNav.module.css";
import { FaHouseChimney } from "react-icons/fa6";
import { FaRegCalendarDays } from "react-icons/fa6";
import { FaMessage } from "react-icons/fa6";
import { FaUserLarge } from "react-icons/fa6";
import { FaHospitalAlt } from "react-icons/fa";

const MainBTNav = () => {
  return (
    <>
      <div className={styles.wrapper}>
        <Outlet></Outlet>
      </div>

      {/* footer */}
      <ul className={styles.footer}>
        <NavLink
          to="/"
          className={({ isActive }) => {
            return isActive
              ? `${styles.activeFooterBT}`
              : `${styles.defaultFooterBT}`;
          }}
        >
          <li>
            <FaHouseChimney />
            <p>예약하기</p>
          </li>
        </NavLink>
        <NavLink
          to="/checkUser"
          className={({ isActive }) => {
            return isActive
              ? `${styles.activeFooterBT}`
              : `${styles.defaultFooterBT}`;
          }}
        >
          <li>
            <FaRegCalendarDays />
            <p>예약확인</p>
          </li>
        </NavLink>
        <NavLink
          to="/hospital"
          className={({ isActive }) => {
            return isActive
              ? `${styles.activeFooterBT}`
              : `${styles.defaultFooterBT}`;
          }}
        >
          <li>
            <FaHospitalAlt />
            <p>병원</p>
          </li>
        </NavLink>
        <NavLink
          // to="/chat"
          to="/rooms"
          className={({ isActive }) => {
            return isActive
              ? `${styles.activeFooterBT}`
              : `${styles.defaultFooterBT}`;
          }}
        >
          <li>
            <FaMessage />
            <p>채팅</p>
          </li>
        </NavLink>
        <NavLink
          to="/mypage"
          className={({ isActive }) => {
            return isActive
              ? `${styles.activeFooterBT}`
              : `${styles.defaultFooterBT}`;
          }}
        >
          <li>
            <FaUserLarge />
            <p>마이페이지</p>
          </li>
        </NavLink>
      </ul>
    </>
  );
};

export default MainBTNav;
