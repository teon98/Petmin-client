import React, { useState } from "react";
import BackTitleHeader from "../../components/BackTitleHeader";
import style from "../../styles/silver.module.css";
import { useNavigate } from "react-router-dom";
import youtube from "../../assets/images/youtube.png";
import notice from "../../assets/images/notice.png";
import test from "../../assets/images/test.png";
import Modal from "react-modal";
import Swal from "sweetalert2";

//제출시 알람
const toast = Swal.mixin({
  toast: true,
  position: "center",
  showConfirmButton: false,
  timer: 1000,
  timerProgressBar: true,
});

const PStest = () => {
  const navi = useNavigate({});

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    gotest();
  };
  const gotest = () => {
    navi("/petsittertestpage");
  };
  const govideo = () => {
    navi("/petsittertestvideo");
  };
  const goldtest = () => {
    toast.fire({
      icon: "success",
      title: "골드 펫시터 시험 신청이 완료되었습니다.",
    });
    setTimeout(() => {}, 1000);
  };

  return (
    <div>
      <BackTitleHeader title="펫시터 자격 시험" />
      <div className={style.silver} onClick={govideo}>
        <img src={youtube}></img>
        <p>실버 펫시터 시험 동영상</p>
      </div>
      <div className={style.silver} onClick={openModal}>
        <img src={test}></img>
        <p>실버 펫시터 시험</p>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={{
          overlay: {
            height: "100%",
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.4)",
          },
          content: {
            position: "absolute",
            top: "200px",
            left: "40px",
            right: "40px",
            bottom: "200px",
            border: "1px solid #ccc",
            background: "#fff",
            overflow: "auto",
            WebkitOverflowScrolling: "touch",
            borderRadius: "4px",
            outline: "none",
            padding: "20px",
          },
        }}
        //className={style.modal}
      >
        <div>
          <h1 style={{ textAlign: "center", fontWeight: "bold" }}>
            실버 펫시터 유의사항
          </h1>
          <br />
          <br />
          <div style={{ textAlign: "center" }}>
            <li>본 시험을 펫민의 실버 펫시터 자격을 위한 시험입니다.</li>
            <br />
            <li>동영상을 시청하고 시험을 봐주세요.</li>
            <br />
            <li>시험 점수에 따라 관리자가 등급을 부여합니다.</li>
            <br />
            <li>시험 중에는 타인과의 커뮤니케이션을 제한해주세요.</li>
            <br />
            <li>
              문제가 발생하거나 불편한 점이 있으면 즉시 펫민에게 알려주세요.
            </li>
            <br />
            <li>답안을 제출시 자동으로 시험이 종료됩니다.</li>
            <br />
            <br />
            <br />
            <button style={{ alignContent: "center" }} onClick={closeModal}>
              닫기
            </button>
          </div>
        </div>
      </Modal>

      <div className={style.silver} onClick={goldtest}>
        <img src={notice}></img>
        <p>골드 펫시터 시험 신청</p>
      </div>
    </div>
  );
};
export default PStest;
