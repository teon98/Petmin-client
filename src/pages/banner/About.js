import React, { useEffect } from "react";
import BackTitleHeader from "../../components/BackTitleHeader";
import styles from "../../styles/banner/layout.module.css";
import axios from "axios";

const About = () => {
  useEffect(() => {
    axios
      .post("/petInformationRead/7")
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  return (
    <div className={styles.frame}>
      <BackTitleHeader title="펫민소개" />
      springboot와 연결 잘되는지 test 함
    </div>
  );
};

export default About;
