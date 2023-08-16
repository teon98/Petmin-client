import React, { useEffect, useState } from "react";
import BackTitleHeader from "../../components/BackTitleHeader";
import styled from "styled-components";
import InsuranceModal from "./InsuranceModal";
import style from "../../styles/PSView.module.css";
import StarRatings from "react-star-ratings";
import ProgressBar from "@ramonak/react-progress-bar";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";

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
    justify-content: space-between;
    align-items: center;
  `;

  return function (props) {
    //console.log(props, "withTextGroupStyling");

    return <StyledTextGroup {...props} />;
  };
};

const StyledCardDiv = withCardStyling(styled.div``);
const StyledTextGroup = withTextGroupStyling(styled.div``);

const Review = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
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

  const SmallCard = ({ title, subTitle }) => (
    <StyledTextGroup>
      <SmallText>{title}</SmallText>
      <SmallText style={{ color: "#f66" }}>{subTitle}</SmallText>
    </StyledTextGroup>
  );
  const location = useLocation();

  async function getMakeReviewList() {
    const url = `/dolbom/reviewList?sitterId=${
      location.pathname.split("/")[2]
    }`;
    axios
      .get(url, {
        headers: {
          "Content-Type": `application/json`,
        },
      })
      .then((res) => {
        //console.log(res.data);
        setReview(res.data);
      })
      .catch((ex) => {
        //console.log("requset fail : " + ex);
      });
  }

  const [review, setReview] = useState();
  useEffect(() => {
    getMakeReviewList();
  }, []);

  return (
    <>
      <BackTitleHeader title="리뷰 작성" />
      <CardContainer>
        {review?.map((val, index) => (
          <StyledCardDiv key={index}>
            <StyledTextGroup>
              <Title>🐶 {val.userName}</Title>
            </StyledTextGroup>
            <div className={style.box}>
              <SmallCard title="친절도" subTitle={`${val.reviewKind}/5`} />
              <SmallCard title="시간약속" subTitle={`${val.reviewTime}/5`} />
              <SmallCard title="섬세함" subTitle={`${val.reviewDelecacy}/5`} />
              <StyledTextGroup>
                <LargeText>받은 돌봄 후기</LargeText>
              </StyledTextGroup>
              <div
                style={{
                  backgroundColor: "#f9f9f9",
                  padding: "15px",
                  border: "1px solid #ddd",
                  borderRadius: "10px",
                }}
              >
                {val.reviewMsg}
              </div>
            </div>
          </StyledCardDiv>
        ))}
      </CardContainer>
    </>
  );
};

export default Review;
