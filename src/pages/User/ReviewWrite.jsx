import React, { useEffect, useState } from "react";
import BackTitleHeader from "../../components/BackTitleHeader";
import styled from "styled-components";
import InsuranceModal from "./InsuranceModal";
import style from "../../styles/PSView.module.css";
import StarRatings from "react-star-ratings";
import ProgressBar from "@ramonak/react-progress-bar";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { FaStar } from "react-icons/fa";

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
    // console.log(props, "withCardStyling");
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
    // console.log(props, "withTextGroupStyling");

    return <StyledTextGroup {...props} />;
  };
};

const StyledCardDiv = withCardStyling(styled.div``);
const StyledTextGroup = withTextGroupStyling(styled.div``);

const ReviewWrite = () => {
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

  const Wrap = styled.div`
    display: flex;
    flex-direction: column;
    padding-top: 15px;
  `;

  const RatingText = styled.div`
    color: #787878;
    font-size: 12px;
    font-weight: 400;
  `;

  const Stars = styled.div`
    display: flex;
    padding-top: 5px;

    & svg {
      color: gray;
      cursor: pointer;
    }

    :hover svg {
      color: #fcc419;
    }

    & svg:hover ~ svg {
      color: gray;
    }

    .yellowStar {
      color: #fcc419;
    }
  `;
  const numberOfCards = 1;

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
        console.log(res.data);
        setReview(res.data);
      })
      .catch((ex) => {
        console.log("requset fail : " + ex);
      });
  }
  const [clicked, setClicked] = useState([false, false, false, false, false]);
  const [clicked2, setClicked2] = useState([false, false, false, false, false]);
  const [clicked3, setClicked3] = useState([false, false, false, false, false]);

  const handleStarClick = (index) => {
    let clickStates = [...clicked];
    for (let i = 0; i < 5; i++) {
      clickStates[i] = i <= index ? true : false;
    }
    setClicked(clickStates);
    console.log(clicked);
  };
  const handleStarClick2 = (index) => {
    let clickStates = [...clicked2];
    for (let i = 0; i < 5; i++) {
      clickStates[i] = i <= index ? true : false;
    }
    setClicked2(clickStates);
    console.log(clicked2);
  };
  const handleStarClick3 = (index) => {
    let clickStates = [...clicked3];
    for (let i = 0; i < 5; i++) {
      clickStates[i] = i <= index ? true : false;
    }
    setClicked3(clickStates);
    console.log(clicked3);
  };

  const sendReview = () => {
    let score = clicked.filter(Boolean).length;
  };

  const [review, setReview] = useState();
  useEffect(() => {
    getMakeReviewList();
    sendReview();
  }, []);

  const ARRAY1 = [0, 1, 2, 3, 4];
  const ARRAY2 = [0, 1, 2, 3, 4];
  const ARRAY3 = [0, 1, 2, 3, 4];

  return (
    <>
      <BackTitleHeader title="리뷰 작성" />
      <CardContainer>
        {Array.from({ length: numberOfCards }).map((_, index) => (
          <StyledCardDiv key={index}>
            <StyledTextGroup>
              <Title>🐶 {location.pathname.split("/")[2]}</Title>
            </StyledTextGroup>
            <div className={style.box}>
              <StyledTextGroup>
                <LargeText>후기를 작성해주세요 !</LargeText>
              </StyledTextGroup>
              <SmallCard title="친절도" subTitle={`${1}/5`} />
              <Wrap>
                <RatingText>평가하기</RatingText>
                <Stars>
                  {ARRAY1.map((el, idx) => {
                    return (
                      <FaStar
                        key={idx}
                        size="50"
                        onClick={() => handleStarClick(el)}
                        className={clicked[el] && "yellowStar"}
                      />
                    );
                  })}
                </Stars>
              </Wrap>
              <SmallCard title="시간약속" subTitle={`${1}/5`} />
              <Wrap>
                <RatingText>평가하기</RatingText>
                <Stars>
                  {ARRAY1.map((el, idx) => {
                    return (
                      <FaStar
                        key={idx}
                        size="50"
                        onClick={() => handleStarClick2(el)}
                        className={clicked[el] && "yellowStar"}
                      />
                    );
                  })}
                </Stars>
              </Wrap>
              <SmallCard title="섬세함" subTitle={`${1}/5`} />
              <Wrap>
                <RatingText>평가하기</RatingText>
                <Stars>
                  {ARRAY2.map((el, idx) => {
                    return (
                      <FaStar
                        key={idx}
                        size="50"
                        onClick={() => handleStarClick3(el)}
                        className={clicked[el] && "yellowStar"}
                      />
                    );
                  })}
                </Stars>
              </Wrap>
              <div
                style={{
                  backgroundColor: "#f9f9f9",
                  padding: "15px",
                  border: "1px solid #ddd",
                  borderRadius: "10px",
                }}
              >
                ㅇㅈ
              </div>
            </div>
          </StyledCardDiv>
        ))}
      </CardContainer>
    </>
  );
};

export default ReviewWrite;
