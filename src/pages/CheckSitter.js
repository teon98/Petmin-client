import React, { useEffect, useState } from "react";
import BackTitleHeader from "../components/BackTitleHeader";
import axios from "axios";
import { useRecoilState } from "recoil";
import { idtextAtom, licenceAtom } from "../atom/atoms";
import styles2 from "../styles/Alarm.module.css";
import { useNavigate } from "react-router";
import style from "../styles/Alarm.module.css";
import {
  FaArrowUp,
  FaArrowsRotate,
  FaArrowRightArrowLeft,
} from "react-icons/fa6";
import Swal from "sweetalert2";
import styled from "styled-components";
import { left } from "@popperjs/core";

//제출시 알람
const Toast = Swal.mixin({
  toast: true,
  position: "center",
  showConfirmButton: false,
  timer: 1000,
  timerProgressBar: true,
});

const withCardStyling = (WrappedComponent) => {
  const StyledCard = styled(WrappedComponent)`
    width: 360px;
    border-radius: 10px;
    border: 1px solid rgba(217, 217, 217, 0.37);
    background: #fff;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.1);
    margin: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 15px;
  `;

  return function (props) {
    //console.log(props, "withCardStyling");
    return <StyledCard {...props} />;
  };
};

const withTextGroupStyling = (WrappedComponent) => {
  const StyledTextGroup = styled(WrappedComponent)`
    padding: 5px;
    display: flex;
    align-items: center;
  `;

  return function (props) {
    //console.log(props, "withTextGroupStyling");

    return <StyledTextGroup {...props} />;
  };
};

const Checkuser = () => {
  const [userId] = useRecoilState(idtextAtom);
  const [userLicence] = useRecoilState(licenceAtom);
  const [msg, setMsg] = useState("");
  const nav = useNavigate();
  //console.log(userLicence);
  useEffect(() => {
    //로그인 안되어있으면 로그인으로
    if (userId === "") {
      nav("/login");
    }

    axios({
      url: "/dolbom/checkSitter",
      params: { userId: userId },
      method: "get",
    })
      .then((res) => {
        //console.log(res.data);
        setMsg(res.data);
      })
      .catch((error) => {
        //console.log(error);
      });
  }, []);

  const dolbomok = (no) => {
    //console.log(no);
    axios({
      url: "/dolbom/surack",
      params: { dolbomNo: no },
      method: "put",
    })
      .then((res) => {
        //console.log(res.data);
        Toast.fire({
          icon: "success",
          title: "돌봄요청을 수락하셨습니다.",
        });
        setTimeout(() => {
          nav("/assurance", { state: no });
        }, 1000);
      })
      .catch((error) => {
        //console.log(error);
      });
  };

  const dolbomchat = (sangdaeId) => {
    axios({
      url: "/chat/chatting",
      params: { sender: userId, receiver: sangdaeId },
      method: "get",
    })
      .then((res) => {
        nav("/room/" + res.data.chatroomId + "/" + sangdaeId);
      })
      .catch((error) => {
        //console.log(error);
      });
  };

  const dolbomdel = (no) => {
    axios({
      url: "/dolbom/delete",
      params: { dolbomNo: no },
      method: "delete",
    })
      .then((res) => {
        Toast.fire({
          icon: "success",
          title: res.data,
        });
        setTimeout(() => {}, 1000);
      })
      .catch((error) => {
        //console.log(error);
      });
  };

  const SmallCard = ({ title, subTitle }) => (
    <StyledTextGroup>
      <SmallText style={{ width: "150px" }}>{title}</SmallText>
      <SmallText style={{ color: "#f66" }}>{subTitle}</SmallText>
    </StyledTextGroup>
  );

  const StyledCardDiv = withCardStyling(styled.div``);
  const StyledTextGroup = withTextGroupStyling(styled.div``);

  const CardContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    padding: 20px;
  `;

  const Title = styled.p`
    color: #000;
    font-family: Inter;
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 5px;
  `;

  const SubTitle = styled.p`
    color: #f66;
    font-family: Inter;
    font-size: 15px;
    font-weight: 600;
    margin-bottom: 10px;
  `;

  const SmallText = styled.div`
    color: #000;
    font-family: Inter;
    font-size: 20px;
    font-weight: 400;
  `;

  const LargeText = styled.p`
    color: #f66;
    font-family: Inter;
    font-size: 20px;
    font-weight: 600;
    margin: 10px 0;
    text-align: right;
  `;

  const TextGroup = styled.div`
    padding: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  `;

  const BoxDivContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
  `;

  const BoxBtn = styled.button`
    width: 120px;
    height: 39px;
    border-radius: 5px;
    background: #f66;
    color: #ffff;
    font-weight: 900;
    display: flex;
    justify-content: center;
    align-items: center;
    border: white;
    transition: background-color 0.3s ease-in-out;

    &:hover {
      background-color: #ff9999;
    }
  `;

  // 리스트 출력
  const renderMessages = () => {
    const messageElements = [];
    for (let i = 0; i < msg.length; i++) {
      messageElements.push(
        <div key={i} className={styles2.aldiv}>
          <CardContainer>
            {Array.from({ length: 1 }).map((val, index) => (
              <StyledCardDiv key={index}>
                <StyledTextGroup>
                  <Title>🐶 {msg[i].sangdaeName}</Title>
                </StyledTextGroup>
                <div className={style.box}>
                  <SmallCard
                    title="예약 시작 시간"
                    subTitle={msg[i].startday}
                  />
                  <SmallCard title="끝나는 시간" subTitle={msg[i].endday} />
                  <SmallCard title="상태" subTitle={msg[i].state} />
                  <SmallCard title="펫 이름" subTitle={msg[i].pet?.petName} />
                  <SmallCard title="펫 나이" subTitle={msg[i].pet?.petAge} />
                  <SmallCard title="펫 정보" subTitle={msg[i]?.petW} />
                  {msg[i].state === "대기중" ? (
                    <BoxDivContainer>
                      <BoxBtn onClick={() => dolbomdel(msg[i].no)}>취소</BoxBtn>
                      <BoxBtn onClick={() => dolbomok(msg[i].no)}>
                        요청수락
                      </BoxBtn>
                    </BoxDivContainer>
                  ) : msg[i].state === "수락완료" ? (
                    <BoxDivContainer>
                      <BoxBtn onClick={() => dolbomdel(msg[i].no)}>취소</BoxBtn>
                      <BoxBtn onClick={() => dolbomchat(msg[i].sangdaeId)}>
                        채팅하기
                      </BoxBtn>
                    </BoxDivContainer>
                  ) : msg[i].state === "진행중" ? (
                    <BoxDivContainer>
                      <BoxBtn onClick={() => dolbomdel(msg[i].no)}>취소</BoxBtn>
                      <BoxBtn onClick={() => dolbomchat(msg[i].sangdaeId)}>
                        채팅하기
                      </BoxBtn>
                    </BoxDivContainer>
                  ) : (
                    <BoxDivContainer>
                      <BoxBtn onClick={() => dolbomdel(msg[i].no)}>취소</BoxBtn>
                    </BoxDivContainer>
                  )}
                </div>
              </StyledCardDiv>
            ))}
          </CardContainer>
        </div>
      );
    }
    return messageElements;
  };

  return (
    <div>
      <BackTitleHeader title="펫시터 예약확인" />
      <div
        style={{
          fontFamily: "PreSemiBold",
          fontSize: "20px",
          marginLeft: "20px",
          marginTop: "20px",
        }}
      >
        📥 요청 받은 예약 목록
      </div>
      <div>{renderMessages()}</div>
      {/* 화면변경  버튼 */}
      {userLicence === "일반" ? (
        <br></br>
      ) : (
        <div
          style={{ position: "fixed", bottom: "80px" }}
          className={style.flexBT}
          onClick={() => {
            nav("/CheckUser");
          }}
        >
          <FaArrowRightArrowLeft size="30" id={style.plusIcon} color="white" />
        </div>
      )}{" "}
    </div>
  );
};

export default Checkuser;
