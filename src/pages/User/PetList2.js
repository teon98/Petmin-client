import React, { useEffect, useState } from "react";
import BackTitleHeader from "../../components/BackTitleHeader";
import styles from "../../styles/MypageMenu.module.css";
import { useRecoilState } from "recoil";
import { idtextAtom, nametextAtom } from "../../atom/atoms";
import axios from "axios";
import PetDefaultImg from "../../assets/images/basicPetImage.png";
import { styled } from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import style from "../../styles/Main.module.css";
import Boy from "../../assets/images/boy.png";
import Girl from "../../assets/images/girl.png";
import Gender from "../../assets/images/gender.png";
import MainBTNav from "../../components/MainBTNav";

const List = styled.div`
  height: 100px;
  border-bottom: 2px solid #ccc;
  margin-bottom: 20px;
  padding: 20px 0 20px 20px;
  display: flex;
  align-items: center;

  p {
    padding: 5px 0;

    &:last-child {
      padding-left: 20px;
    }
  }

  &:hover {
    cursor: pointer;

    img {
      border: 5px solid #ff8989;
    }
    .gender {
      border: none;
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

    :last-child {
      padding-left: 5px;
    }
  }

  .gender {
    margin-right: 5px;
    background: transparent;
    border-radius: 0;
    width: 15px;
    height: 15px;
    border: none;
  }

  .delBtn {
    border: none;
    outline: none;
    color: #323232;
    font-family: PreMedium;
    font-size: 15px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    background-color: white;
  }
`;

function PetList2(props) {
  const [userId] = useRecoilState(idtextAtom);
  const [userName] = useRecoilState(nametextAtom);
  const [petList, setPetList] = useState([]);
  const nav = useNavigate();
  const params = useParams();

  useEffect(() => {
    axios({
      url: `/petProfileList/${params.userId}`,
      method: "get",
    }).then((res) => {
      setPetList(res.data);
    });
  });

  const onClick = (petNo) => {
    console.log("petNo : ", petNo);
    nav("/petinfo", { state: petNo });
  };

  const navigate = useNavigate();

  return (
    <div style={{ paddingBottom: "70px" }}>
      <BackTitleHeader title={`하동훈님의 반려동물`} />
      {petList &&
        petList.map((item, index) => (
          <List key={index} onClick={() => onClick(item.petNo)}>
            <img src={item.petImg ? item.petImg : PetDefaultImg} alt="펫" />
            <div className="petinfo">
              <p className="text">
                <img
                  alt="성별"
                  className="gender"
                  src={
                    item.petSex === "남아"
                      ? Boy
                      : item.petSex === "여아"
                      ? Girl
                      : Gender
                  }
                />
                {item.petName} <span>({item.petAge}세)</span>
              </p>
              <p className="text">{item.petMsg}</p>
            </div>
          </List>
        ))}
      <MainBTNav />
    </div>
  );
}

export default PetList2;
