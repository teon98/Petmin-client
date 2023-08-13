import React, { useState } from "react";
import BackTitleHeader from "../../components/BackTitleHeader";
import styled from "styled-components";
import InsuranceModal from "./InsuranceModal";
import IsCardModal from "./IsCardModal";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

// HOC
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
    console.log(props, "withCardStyling");
    return <StyledCard {...props} />;
  };
};

const withTextGroupStyling = (WrappedComponent) => {
  const StyledTextGroup = styled(WrappedComponent)`
    padding: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  `;

  return function (props) {
    console.log(props, "withTextGroupStyling");

    return <StyledTextGroup {...props} />;
  };
};

const StyledCardDiv = withCardStyling(styled.div``);
const StyledTextGroup = withTextGroupStyling(styled.div``);

const Assurance = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [isCardModalOpen, setIsCardModalOpen] = useState(false); // State for modal visibility
  const [cardCheck, setCardCheck] = useState(false); // State for modal visibility
  const { state } = useLocation();
  console.log(state);
  const nav = useNavigate();
  const handleModalOpen = () => {
    console.log("여기 옴");
    setIsCardModalOpen(true);

    //기존
    setIsModalOpen(true);
    axios({
      url: "/dolbom/assurance",
      params: {
        dolbomNo: state,
        assuranceName: "신한 종합형 펫 플랜(실버)",
      },
      method: "post",
    })
      .then((res) => {
        console.log(res.data);
        //nav();보험 페이지로 이동
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleModalClose = () => {
    setIsCardModalOpen(false);
    //기존
    setIsModalOpen(false);
    nav("/checkSitter");
  };

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
    font-size: 17px;
    font-weight: 400;
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
    font-size: 12px;
    font-weight: 400;
  `;

  const LargeText = styled.p`
    color: #f66;
    font-family: Inter;
    font-size: 40px;
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

  const numberOfCards = 2;

  const SmallCard = ({ title, subTitle }) => (
    <StyledTextGroup>
      <SmallText>{title}</SmallText>
      <SmallText style={{ color: "#f66" }}>{subTitle}</SmallText>
    </StyledTextGroup>
  );

  return (
    <>
      <BackTitleHeader title="보험 확인" />
      <CardContainer>
        {Array.from({ length: numberOfCards }).map((_, index) => (
          <StyledCardDiv key={index}>
            {/* 카드 내용의 나머지 부분 */}
            <StyledTextGroup>
              <Title>신한 종합형 펫 플랜(실버)</Title>
              <SubTitle>기간형 보험</SubTitle>
            </StyledTextGroup>
            <LargeText>시간당 90원</LargeText>
            <SmallCard title="할인률" subTitle="사고/질병 당 20%" />
            <SmallCard title="최대 지원금" subTitle="사고/질병 당 50만원" />
            <BoxDivContainer>
              <BoxBtn>자세히 보기</BoxBtn>
              <BoxBtn onClick={handleModalOpen}>가입하기</BoxBtn>
            </BoxDivContainer>
            {isModalOpen && <InsuranceModal onClose={handleModalClose} />}
            {isCardModalOpen && (
              <IsCardModal
                cardCheck={setCardCheck}
                onClose={handleModalClose}
              />
            )}
          </StyledCardDiv>
        ))}
      </CardContainer>
    </>
  );
};

export default Assurance;
