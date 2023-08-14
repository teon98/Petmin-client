import React, { useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { idtextAtom, userCardNumber } from "../../atom/atoms";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { bottom } from "@popperjs/core";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  font-family: PreMedium;
  width: 90%;
  height: 220px;
  box-sizing: border-box;
  background-color: #fff;
  padding: 20px;
  padding-bottom: 10px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;

  p,
  input {
    margin-top: 10px;
    margin-bottom: 10px;
  }
`;

const BoxBtn = styled.input`
  width: 100%;
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

const CloseBtn = styled.input`
  position: absolute;
  top: 0;
  right: 10px;
  border: none;
  background: transparent;
  color: #f66;
  border-radius: 5px;
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
    if (pwd.length !== 4) return;
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
        }, 2000);
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
    nav("/card", { state: { path: "assurance" } });
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <p style={{ color: "#f66" }}>
          <CloseBtn
            style={{ fontSize: "20px" }}
            type="button"
            value="X"
            onClick={onClose}
          />
          {cardNumber[0] === "" ? (
            <div>
              <p style={{ marginBottom: "30px", color: "#333" }}>
                등록된 카드가 없습니다.
              </p>
              <BoxBtn
                type="button"
                value="카드 등록하기"
                onClick={RegisterCard}
              />
            </div>
          ) : (
            <div>
              <p style={{ color: "#333" }}>카드 비밀번호를 입력해주세요.</p>
              <input
                type="password"
                style={{ width: "100%", textAlign: "center" }}
                value={pwd}
                maxLength="4"
                onChange={changePwd}
                placeholder="XXXX"
              />
              <BoxBtn type="button" value="결제하기" onClick={CheckPwd} />
              <p
                style={{
                  height: "15px",
                  textAlign: "center",
                  fontSize: "12px",
                }}
              >
                {" "}
                {msg}
              </p>
            </div>
          )}
        </p>
      </ModalContent>
    </ModalOverlay>
  );
};

export default IsCardModal;
