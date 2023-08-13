import React, { useEffect, useState } from "react";
import styles from "../../styles/MypageMenu.module.css";
import BackTitleHeader from "../../components/BackTitleHeader";
import PinkBtn from "../../components/User/PinkBtn";
import styled from "styled-components";
import axios from "axios";
import { useRecoilState } from "recoil";
import { idtextAtom, userCardNumber } from "../../atom/atoms";

const CardForm = styled.div`
  .mb {
    margin-bottom: 50px;
  }
  .cardNumberFrom {
    input {
      width: 15%;
      height: 40px;
      font-family: "Pretendard";
      font-size: 15px;
      text-align: center;
      margin: 0 1%;
      border-radius: 10px;
      border: 2px solid #b3b3b3;
      line-height: 18px;
      color: #b3b3b3;
    }
  }

  .inputContainer {
    text-align: center;

    :focus {
      color: #ff8989;
    }
  }

  .subTitle {
    margin-left: 53px;
    margin-bottom: 10px;
  }

  .cardPass {
    width: 120px;
    height: 40px;
    border: none;
    border-bottom: 2px solid #b3b3b3;
    margin-left: 60px;
    padding-left: 4px;
  }

  .err {
    color: red;
    text-align: center;
    margin-top: 20px;
    font-size: 12px;
    font-family: PreMedium;
  }
`;

//추후 axios 보낼 때 userId 값 변경하기
function CardInfo(props) {
  const btnTextValue = ["등록하기", "수정하기"];
  const [btnState, setBtnState] = useState(false);
  const [cardPass, setCardPass] = useState("");
  const [cardNumber, setCardNumber] = useState({
    num1: "",
    num2: "",
    num3: "",
    num4: "",
  });
  const [userCard, setUserCard] = useState([]);
  const [msg, setMsg] = useState("");
  const [userId] = useRecoilState(idtextAtom);
  const [success, setSuccess] = useState(false);
  const [card, setCard] = useRecoilState(userCardNumber);

  //페이지 로딩 시 유저 정보 가져오기
  useEffect(() => {
    axios({
      url: "/user",
      method: "get",
      params: {
        userId: userId,
      },
    })
      .then((res) => {
        const userCard = res.data.userCard;
        //이미 카드를 등록한 유저일 경우
        if (userCard !== null) {
          const userCardNumber = userCard.split(" ");
          setUserCard({ ...userCardNumber });
          setCardNumber({
            num1: userCardNumber[0],
            num2: userCardNumber[1],
            num3: userCardNumber[2],
            num4: userCardNumber[3],
          });
          setSuccess(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //카드 번호 입력
  const handleCardInput = (e) => {
    const { name } = e.target;
    const value = e.target.value.trim();

    // 현재 입력항목 제외 후, 이전 값들만 가지고 있는 배열 생성
    const previousValues = Object.keys(cardNumber)
      .filter((key) => key !== name)
      .map((key) => cardNumber[key]);

    //현재 입력받은 값과 이전 값들의 길이가 4인지 각각 비교
    const isValueValid = value.length === 4;
    const isPrevValid = previousValues.every((val) => val.length === 4);

    changeBtnState(isValueValid && isPrevValid, cardPass);

    setCardNumber((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //카드 비밀번호 입력
  const handlePassInput = (e) => {
    const value = e.target.value;

    setCardPass(() => value);

    //cardnumber의 모든 항목 길이가 4인지 확인
    const isCardNumberValid = Object.values(cardNumber).every(
      (val) => val.length === 4
    );

    changeBtnState(isCardNumberValid, value);
  };

  //버튼 활성화
  const changeBtnState = (num, pwd) => {
    if (num && pwd.length === 4) {
      setBtnState(() => true);
    } else {
      setBtnState(() => false);
    }
  };

  //버튼 클릭
  const onClick = () => {
    const cardNumberStr =
      cardNumber.num1 +
      " " +
      cardNumber.num2 +
      " " +
      cardNumber.num3 +
      " " +
      cardNumber.num4;

    //
    axios({
      url: "/user/cardRegister",
      method: "put",
      data: {
        userId: userId,
        userCard: cardNumberStr,
        userCardpass: cardPass,
      },
    })
      .then((res) => {
        setBtnState(false);
        setCardPass("");
        setMsg(() => "");
        setSuccess(true);
        setCard(() => cardNumberStr);
      })
      .catch((err) => {
        console.log(err);
        setMsg(() => "카드 번호 혹은 카드 비밀번호를 확인해주세요.");
      });
  };

  return (
    <CardForm>
      <BackTitleHeader />
      <div id={styles.title}>카드 관리</div>
      <div className="cardNumberFrom mb">
        <div className="subTitle">카드 번호</div>
        <div className="inputContainer">
          {Object.keys(cardNumber).map((key, index) => (
            <input
              key={index}
              name={key}
              value={cardNumber[index]}
              onChange={handleCardInput}
              maxLength={4}
              // style={{ color: userCard.length !== 0 && "#ff8989" }}
              placeholder={userCard.length !== 0 ? userCard[index] : "XXXX"}
            />
          ))}
        </div>
      </div>
      <div className="mb">
        <div className="subTitle">카드 비밀번호</div>
        <input
          type="password"
          value={cardPass}
          onChange={handlePassInput}
          maxLength={4}
          className="cardPass"
          placeholder="비밀번호 4자리"
        />
      </div>
      <PinkBtn
        title={!success ? btnTextValue[0] : btnTextValue[1]}
        active={btnState}
        onClick={onClick}
      />
      <p className="err">{msg}</p>
    </CardForm>
  );
}

export default CardInfo;
