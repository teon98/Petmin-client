import React from "react";

function TestModal({ setModalOpen }) {
  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <div>
      <div>
        <button onClick={closeModal}>X</button>
        <p>모달창입니다.</p>
      </div>
    </div>
  );
}

export default TestModal;
