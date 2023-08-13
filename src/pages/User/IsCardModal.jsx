import React, { useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { idtextAtom, userCardNumber } from "../../atom/atoms";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const IsCardModal = ({ onClose, cardCheck }) => {
  const cardNumber = useRecoilState(userCardNumber);
  const userId = useRecoilState(idtextAtom);

  console.log(cardNumber);

  const [pwd, setPwd] = useState("");
  const changePwd = (e) => {
    setPwd(e.target.value);
  };
  const CheckPwd = () => {
    console.log("userId");
    console.log(userId[0]);
    console.log("pwd");
    console.log(pwd);
    axios({
      method: "get",
      url: "/user/checkCard",
      params: {
        userId: userId[0],
        userCardPass: pwd,
      },
    }).then((res) => {
      console.log(res.data);
      cardCheck(res.data);
    });
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent>
        <p style={{ color: "#f66" }}>
          {cardNumber === "" ? (
            "카드 등록하자"
          ) : (
            <p>
              카드 비밀번호 입력해{" "}
              <input value={pwd} maxLength="4" onChange={changePwd} />
              <input type="button" value="결제하기" onClick={CheckPwd} />
            </p>
          )}
        </p>
      </ModalContent>
    </ModalOverlay>
  );
};

export default IsCardModal;
