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

const IsCardModal = ({ onClose }) => {
  const nav = useNavigate();
  const cardNumber = useRecoilState(userCardNumber);
  const userId = useRecoilState(idtextAtom);
  const [pwd, setPwd] = useState("");
  const [msg, setMsg] = useState("");

  //비밀번호 입력시
  const changePwd = (e) => {
    setPwd(e.target.value);
  };

  //비밀번호 입력 후 확인
  const CheckPwd = () => {
    axios({
      method: "get",
      url: "/user/checkCard",
      params: {
        userId: userId[0],
        userCardPass: pwd,
      },
    }).then((res) => {
      //비밀번호 일치
      if (res.data) {
        setMsg("결제가 완료되었습니다.");
        setTimeout(() => {
          nav("/checkSitter");
        }, 3000);
      } else {
        //비밀번호 불일치
        setPwd("");
        setMsg("카드 비밀번호를 확인해주세요.");
        setTimeout(() => {
          setMsg("");
        }, 2000);
      }
    });
  };

  //카드 미등록시
  const RegisterCard = () => {
    nav("/card");
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <p style={{ color: "#f66" }}>
          <input type="button" value="X" onClick={onClose} />
          {cardNumber[0] === "" ? (
            <div>
              <p>등록된 카드가 없습니다.</p>
              <input
                type="button"
                value="카드 등록하기"
                onClick={RegisterCard}
              />
            </div>
          ) : (
            <div>
              <p>카드 비밀번호를 입력해주세요.</p>
              <input value={pwd} maxLength="4" onChange={changePwd} />
              <input type="button" value="결제하기" onClick={CheckPwd} />
              <p>{msg}</p>
            </div>
          )}
        </p>
      </ModalContent>
    </ModalOverlay>
  );
};

export default IsCardModal;
