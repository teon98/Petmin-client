import React from "react";
import styled from "styled-components";

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

const ReviewModal = ({ onClose }) => {
  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent>
        <p style={{ color: "#f66" }}>🐶등록되었습니다🐶</p>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ReviewModal;
