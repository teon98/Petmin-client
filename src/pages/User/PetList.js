import React, { useEffect, useState } from "react";
import BackTitleHeader from "../../components/BackTitleHeader";
import styles from "../../styles/MypageMenu.module.css";
import { useRecoilState } from "recoil";
import { idtextAtom } from "../../atom/atoms";
import axios from "axios";
import PetDefaultImg from "../../assets/images/basicPetImage.png";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import style from "../../styles/Main.module.css";

const List = styled.div`
  height: 100px;
  border-bottom: 2px solid #ccc;
  margin-bottom: 20px;
  padding: 20px 0 20px 20px;

  &:hover {
    cursor: pointer;

    img {
      border: 5px solid #ff8989;
    }
  }

  .petinfo {
    display: inline-block;
    padding-left: 20px;
  }

  img {
    width: 72px;
    height: 72px;
    object-fit: cover;
    background: #ccc;
    border-radius: 50%;
    border: 5px solid transparent;
    transition: all 0.2s ease-in-out;
  }

  .text {
    color: #323232;
    font-family: PreMedium;
    font-size: 15px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
`;

function PetList(props) {
  const [userId] = useRecoilState(idtextAtom);
  const [petList, setPetList] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    axios({
      url: `/petProfileList/${userId}`,
      method: "get",
    }).then((res) => {
      setPetList(res.data);
    });
  });

  const onClick = (petNo) => {
    console.log("petNo : ", petNo);
    nav("/petinfo", { state: petNo });
  };

  return (
    <div style={{ paddingBottom: "70px" }}>
      <BackTitleHeader title="반려동물 리스트" />
      <div id={styles.title} style={{ paddingTop: "50px" }}>
        {userId}님의 반려동물
      </div>
      {petList &&
        petList.map((item, index) => (
          <List key={index} onClick={() => onClick(item.petNo)}>
            <img src={item.petImg ? item.petImg : PetDefaultImg} alt="펫" />
            <div className="petinfo">
              <p className="text">
                {item.petSex === "남아"
                  ? "♂️"
                  : item.petSex === "여아"
                  ? "♀"
                  : "◌"}{" "}
                {item.petName} <span>({item.petAge}세)</span>
              </p>
              <p className="text">{item.petMsg}</p>
            </div>
          </List>
        ))}
      <div
        className={style.flexBT}
        style={{ right: "20px" }}
        onClick={() => {
          nav("/petregistration");
        }}
      >
        <FaPlus size="40" id={style.plusIcon} color="white" />
      </div>
    </div>
  );
}

export default PetList;
