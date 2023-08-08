import React, { useState } from "react";
import BackTitleHeader from "../../components/BackTitleHeader";
import style from "../../styles/silver.module.css";
import { useNavigate } from "react-router-dom";
import youtube from "../../assets/images/youtube.png";
import notice from "../../assets/images/notice.png";
import test from "../../assets/images/test.png";
import Modal from "react-modal";

const PStest = () => {
  const navi = useNavigate({});

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  const gonotice = () => {
    navi("/petsitterprofile");
  };

  return (
    <div>
      <BackTitleHeader title="실버 펫시터 시험" />
      <div className={style.silver} onClick={openModal}>
        <img src={notice}></img>
        <p>실버 펫시터 유의사항</p>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className={style.modal}
      >
        <h2>실버 펫시터 유의사항</h2>
        <p>모달 내용</p>
        <button onClick={closeModal}>닫기</button>
      </Modal>
      <div className={style.silver} onClick={gonotice}>
        <img src={youtube}></img>
        <p>실버 펫시터 시험 동영상</p>
      </div>
      <div className={style.silver} onClick={gonotice}>
        <img src={test}></img>
        <p>실버 펫시터 시험</p>
      </div>
    </div>
  );
};
export default PStest;
