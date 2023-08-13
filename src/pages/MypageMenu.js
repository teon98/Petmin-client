import React, { useEffect } from "react";
import styles from "../styles/MypageMenu.module.css";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { idtextAtom, licenceAtom } from "../atom/atoms";
import Swal from "sweetalert2";

//펫시터 아니면 알람
const Toast = Swal.mixin({
  toast: true,
  position: "center",
  showConfirmButton: false,
  timer: 1000,
  timerProgressBar: true,
});

const MypageMenu = () => {
  const navigate = useNavigate();
  const [userLicence] = useRecoilState(licenceAtom);
  //userID 없으면 로그인 화면으로
  const [userId] = useRecoilState(idtextAtom);
  useEffect(() => {
    if (userId === "") {
      navigate("/login");
    }
  });
  // const userId = 1234;
  const al = () => {
    Toast.fire({
      icon: "error",
      title: "펫시터 자격을 획득해주세요.",
    });
    setTimeout(() => {}, 1000);
  };

  return (
    <div style={{ overflow: "hidden" }}>
      <div id={styles.title}>더보기</div>
      <div
        className={styles.menuitem}
        onClick={() => {
          navigate("/myinfo");
        }}
      >
        내 프로필 관리
      </div>
      <hr style={{ margin: "0px 40px" }} />
      <div
        className={styles.menuitem}
        onClick={() => {
          navigate("/petlist");
        }}
      >
        반려동물 프로필 관리
      </div>
      <div className={styles.boundary} />
      <div
        className={styles.menuitem}
        onClick={() => {
          navigate("/card");
        }}
      >
        카드관리
      </div>
      <div className={styles.boundary} />
      <div
        className={styles.menuitem}
        onClick={() => {
          {
            userLicence === "일반"
              ? al()
              : navigate(`/petsitterprofile/${userId}`);
          }
        }}
      >
        펫시터 프로필 관리
      </div>
      <div className={styles.boundary} />
      <div
        className={styles.menuitem}
        onClick={() => {
          navigate(`/logout`);
        }}
      >
        로그아웃
      </div>
      <div id={styles.footer}>신한DS금융SW아카데미_맡겨조</div>
    </div>
  );
};

export default MypageMenu;
