import React from "react";
import BackTitleHeader from "../../components/BackTitleHeader";
import styles from "../../styles/banner/layout.module.css";

const About = () => {
  return (
    <div className={styles.frame}>
      <BackTitleHeader title="펫민소개" />
      펫민 소개 페이지
    </div>
  );
};

export default About;
