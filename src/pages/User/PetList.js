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
      border: 6px solid #ff8989;
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
    border: 6px solid transparent;
    transition: all 0.2s ease-in-out;
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
  }, []);

  const onClick = (petNo) => {
    console.log("petNo : ", petNo);
    nav("/petinfo", { state: petNo });
  };

  return (
    <div>
      <BackTitleHeader />
      <div id={styles.title}>{userId}님의 반려동물</div>
      {petList &&
        petList.map((item, index) => (
          <List key={index} onClick={() => onClick(item.petNo)}>
            <img src={item.petImg ? item.petImg : PetDefaultImg} alt="펫" />
            <div className="petinfo">
              <p>
                {item.petName} <span>({item.petAge}세)</span>
              </p>
              <p>{item.petMsg}</p>
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
