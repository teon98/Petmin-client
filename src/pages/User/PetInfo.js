import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import BackTitleHeader from "../../components/BackTitleHeader";
import PetDefaultImg from "../../assets/images/basicPetImage.png";
import { styled } from "styled-components";
import style from "../../styles/Main.module.css";
import { FaArrowUp } from "react-icons/fa6";

const Info = styled.div`
  padding-left: 40px;
  padding-right: 40px;
  padding-bottom: 70px;
  font-family: PreMedium;

  .petMsg {
    font-size: 15px;
  }

  img {
    display: block;
    width: 92px;
    height: 92px;
    object-fit: cover;
    background: #ccc;
    border-radius: 50%;
    margin: auto;
    transition: all 0.2s ease-in-out;
    margin: 50px auto 20px;
  }

  .defaultInfo {
    color: #828382;
    div {
      display: flex;
      justify-content: space-between;
      padding-bottom: 10px;
      padding-top: 20px;
      border-bottom: 2px solid #ccc;
    }
  }

  ul {
    position: relative;
    li {
      margin-bottom: 10px;
      :first-child {
        padding: 10px 0 15px;
        font-family: PreMedium;
        font-size: 15px;
      }
      :last-child {
        color: #828382;
        padding: 10px 0 15px;
        font-family: PreMedium;
        font-size: 15px;
      }
    }
  }

  .forspan {
    display: inline-block;
    width: 100%;
  }
  p {
    color: #ff6666;
    padding-bottom: 25px;

    font-family: PreMedium;
  }
  .section {
    padding: 20px 0;
  }
`;

function PetInfo(props) {
  const location = useLocation();
  const petNo = location.state;
  const [petInfo, setPetInfo] = useState({});
  const [petTendency, stePetTendency] = useState("");
  const tendencyQ = [
    "Q. 호텔 등 낯선 공간에 맡겨지면 어떤가요?",
    "Q. 다른 낯선 강아지를 만나면 어떤가요?",
    "Q. 낯선 사람이 스킨십하면 어떤가요?",
    "Q. 평소 집에서 짖음은 어떤가요?",
    "Q. 배변 습관은 어떤 편인가요?",
  ];
  const petVaccineQ = ["Q. 예방 접종 여부 1", "Q. 예방 접종 여부 2"];

  const [petVaccine, setPetVaccine] = useState([]);
  useEffect(() => {
    axios({
      url: `/petInformationRead/${petNo}`,
      method: "get",
    })
      .then((res) => {
        //console.log(res.data);
        setPetInfo(res.data);
        stePetTendency(res.data.petTendency);
        setPetVaccine(res.data.petVaccine);
        //console.log(res.data);
      })
      .catch((err) => {
        //console.log(err);
      });
  }, []);

  return (
    <>
      <BackTitleHeader title={petInfo.petName} className="signupStep" />
      <Info>
        <img src={petInfo.petImg ? petInfo.petImg : PetDefaultImg} alt="펫" />

        <div className="introduce section">
          <p>반려동물 소개</p>
          <div>{petInfo.petMsg}</div>
        </div>
        <div className="defaultInfo section">
          <p>기본 정보</p>
          <div>
            <span>이름/성별/나이</span>
            <span>
              {petInfo.petName} / {petInfo.petSex} / {petInfo.petAge}
            </span>
          </div>
          <div>
            <span>견종(몸무게)</span>
            <span>
              {petInfo.petSpecies} ({petInfo.petWeight}kg)
            </span>
          </div>
        </div>

        <div className="introduce section">
          <div>
            <p>성향 및 성격</p>
            <ul>
              {tendencyQ.map((item, index) => (
                <li key={index}>
                  <div>{item}</div>
                  <div>· {petTendency["tendency" + (index + 1)]}</div>
                </li>
              ))}
            </ul>
          </div>
          <div className="section">
            <p>예방 접종</p>
            <ul>
              {petVaccineQ.map((item, index) => (
                <>
                  <li key={index}>
                    <div>{item}</div>
                    <div>
                      {petVaccine["vaccine" + (index + 1)] === undefined
                        ? ""
                        : petVaccine["vaccine" + (index + 1)]
                            .split(", ")
                            .map((ele, idx) => (
                              <span className="forspan">
                                · {ele}
                                <br />
                              </span>
                            ))}
                    </div>
                  </li>
                </>
              ))}
              <li>
                <div>건강특이사항</div>
                <div>· {petVaccine["vaccineMsg"]}</div>
              </li>
            </ul>
          </div>
        </div>
        <div
          className={style.flexBT}
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <FaArrowUp size="30" id={style.plusIcon} color="white" />
        </div>
      </Info>
    </>
  );
}

export default PetInfo;
