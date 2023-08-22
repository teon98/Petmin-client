import React, { useEffect } from "react";
import BackTitleHeader from "../../components/BackTitleHeader";
import styles from "../../styles/banner/layout.module.css";
import axios from "axios";
import PetInfo from "../../assets/images/info.png";

const About = () => {
  useEffect(() => {
    axios
      .post("/petInformationRead/7")
      .then((res) => {
        //console.log(res);
      })
      .catch((err) => {
        //console.log(err);
      });
  });
  return (
    <div className={styles.frame}>
      <BackTitleHeader title="펫민소개" />
      <img src={PetInfo} alt="펫민소개" style={{ width: "100%" }} />
    </div>
  );
};

export default About;
