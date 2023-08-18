import React, { useCallback, useEffect, useState } from "react";
import BackTitleHeader from "../../components/BackTitleHeader";
import styled from "styled-components";
import style from "../../styles/PSView.module.css";
import StarRatings from "react-star-ratings";
import ProgressBar from "@ramonak/react-progress-bar";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import { useRecoilState } from "recoil";
import { idtextAtom, nametextAtom } from "../../atom/atoms";
import ReviewModal from "./ReviewModal";

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

  const navigate = useNavigate();
  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    navigate(-1);
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

  const [startId, setStartId] = useRecoilState(idtextAtom);

  const nav = useNavigate();
  const SmallCard = ({ title, subTitle }) => (
    <StyledTextGroup>
      <SmallText>{title}</SmallText>
      <SmallText style={{ color: "#f66" }}>{subTitle}</SmallText>
    </StyledTextGroup>
  );
  const location = useLocation();
  const { state } = useLocation();
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
  const ARRAY1 = [0, 1, 2, 3, 4];
  const ARRAY2 = [0, 1, 2, 3, 4];
  const ARRAY3 = [0, 1, 2, 3, 4];
  const [reviewKind, setReviewKind] = useState("0");
  const [reviewTime, setReviewTime] = useState("0");
  const [reviewDelecacy, setReviewDelecacy] = useState("0");
  const [reviewContent, setReviewContent] = useState("");

  const handleStarClick1 = (index) => {
    let clickStates = [...clicked];
    for (let i = 0; i < 5; i++) {
      clickStates[i] = i <= index ? true : false;
    }
    setClicked(clickStates);
    console.log(clickStates.filter((el) => el === true));
    console.log(clickStates.filter(Boolean).length);
    setReviewKind(clickStates.filter(Boolean).length);
  };

  const handleStarClick2 = (index) => {
    let clickStates = [...clicked2];
    for (let i = 0; i < 5; i++) {
      clickStates[i] = i <= index ? true : false;
    }
    setClicked2(clickStates);
    console.log(clickStates.filter((el) => el === true));
    setReviewTime(clickStates.filter(Boolean).length);
  };
  const handleStarClick3 = (index) => {
    let clickStates = [...clicked3];
    for (let i = 0; i < 5; i++) {
      clickStates[i] = i <= index ? true : false;
    }
    setClicked3(clickStates);
    console.log(clickStates.filter((el) => el === true));
    setReviewDelecacy(clickStates.filter(Boolean).length);
  };

  const sendReview = () => {
    let score = clicked.filter(Boolean).length;
    setReviewKind(score);
    let score1 = clicked2.filter(Boolean).length;
    setReviewTime(score1);
    let score2 = clicked3.filter(Boolean).length;
    setReviewDelecacy(score2);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    sendReview();

    // Log the review content to the console
    console.log(
      "Review Content:",
      reviewKind,
      reviewTime,
      reviewDelecacy,
      reviewContent
    );

    postMakeReview();
  };

  const [review, setReview] = useState();
  useEffect(() => {
    getMakeReviewList();
    sendReview();
    console.log(
      reviewKind,
      reviewTime,
      reviewDelecacy,
      reviewContent,
      "clicked3clicked3clicked3"
    );
  }, [clicked, clicked2, clicked3, reviewKind]);

  async function postMakeReview(event) {
    const url = `/dolbom/inReview?userId=${startId}&sitterId=${
      location.pathname.split("/")[2]
    }&reviewTime=${reviewTime}&reviewKind=${reviewKind}&reviewDelecacy=${reviewDelecacy}&reviewMsg=${event}`;
    console.log(state);
    axios({
      url: "/dolbom/inReview",
      params: {
        dolbomNo: state,
        reviewTime: reviewTime,
        reviewKind: reviewKind,
        reviewDelecacy: reviewDelecacy,
        reviewMsg: event,
      },
      method: "post",
    })
      .then((res) => {
        console.log(res.data);
        nav("/checkUser");
      })
      .catch((error) => {
        console.log(error);
      });
  }
  const handleInputKeyPress = (event) => {
    if (event.key === "Enter") {
      console.log("Entered value:", event.target.value);
      setReviewContent(event.target.value);
      // 입력된 값을 처리하거나 상태로 저장할 수 있습니다.
      console.log(
        startId,
        location.pathname.split("/")[2],
        reviewTime,
        reviewKind,
        reviewDelecacy,
        event.target.value
      );
      handleModalOpen();
      postMakeReview(event.target.value);
    }
  };

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
                <LargeText>돌봄 후기를 작성해주세요 !</LargeText>
              </StyledTextGroup>
              <SmallCard title="친절도" subTitle={`${reviewKind}/5`} />
              <Wrap>
                <Stars>
                  {ARRAY1.map((el, idx) => {
                    return (
                      <FaStar
                        style={{
                          paddingBottom: "15px",
                        }}
                        key={idx}
                        size="50"
                        onClick={() => handleStarClick1(el)}
                        className={clicked[el] && "yellowStar"}
                      />
                    );
                  })}
                </Stars>
              </Wrap>
              <SmallCard title="시간약속" subTitle={`${reviewTime}/5`} />
              <Wrap>
                <Stars>
                  {ARRAY2.map((el, idx) => {
                    return (
                      <FaStar
                        style={{
                          paddingBottom: "15px",
                        }}
                        key={idx}
                        size="50"
                        onClick={() => handleStarClick2(el)}
                        className={clicked2[el] && "yellowStar"}
                      />
                    );
                  })}
                </Stars>
              </Wrap>
              <SmallCard title="섬세함" subTitle={`${reviewDelecacy}/5`} />
              <Wrap>
                <Stars>
                  {ARRAY3.map((el, idx) => {
                    return (
                      <FaStar
                        style={{
                          paddingBottom: "15px",
                        }}
                        key={idx}
                        size="50"
                        onClick={() => handleStarClick3(el)}
                        className={clicked3[el] && "yellowStar"}
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
                <form onSubmit={handleFormSubmit}>
                  <textarea
                    type="text"
                    style={{
                      backgroundColor: "#f9f9f9",
                      width: "100%",
                      border: "none",
                      padding: "5px",
                    }}
                    placeholder="내용을 입력하세요"
                    onKeyPress={handleInputKeyPress}
                  />
                </form>
              </div>
            </div>
            {isModalOpen && <ReviewModal onClose={handleModalClose} />}
          </StyledCardDiv>
        ))}
      </CardContainer>
    </>
  );
};

export default ReviewWrite;
