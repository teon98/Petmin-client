import React from "react";
import { FaAngleLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <>
      <FaAngleLeft size="24" color="#323232" onClick={() => navigate(-1)} />
    </>
  );
};

export default BackButton;
