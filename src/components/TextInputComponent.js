import React from "react";
import "../styles/common/TextInputStyle.css";
import { FaEye } from "react-icons/fa6";

function TextInputComponent({
  lable = {},
  value = {},
  onChange = {},
  placeholder = {},
  type = {},
  onClick = {},
  idMessage = {},
  emailMessage = {},
  passwordTypeImageClick = {},
  passwordCheckTypeImageClick = {},
  passwordMessage = {},
  passwordCheckMessage = {},
}) {
  const isPasswordInput = lable === "비밀번호";
  const isPasswordCheckInput = lable === "비밀번호 확인";
  const isEmailInput = lable === "이메일";
  const isIdInput = lable === "아이디";

  return (
    <div className="textInputContainer">
      <div className="forIdDuplicateBtn">
        <p className="textInputLable">{lable}</p>
        {isIdInput && (
          <button className="duplicateCheckBtn" onClick={onClick}>
            중복확인
          </button>
        )}
        {isPasswordInput && (
          <FaEye size={20} color="gray" onClick={passwordTypeImageClick} />
        )}
        {isPasswordCheckInput && (
          <FaEye size={20} color="gray" onClick={passwordCheckTypeImageClick} />
        )}
      </div>
      <input
        className="textInputValue"
        onChange={(e) => onChange(e)}
        value={value}
        placeholder={placeholder}
        type={type}
      />
      {isIdInput && <p className="emailValidText">{idMessage}</p>}
      {isEmailInput && <p className="emailValidText">{emailMessage}</p>}
      {isPasswordInput && <p className="emailValidText">{passwordMessage}</p>}
      {isPasswordCheckInput && (
        <p className="emailValidText">{passwordCheckMessage}</p>
      )}
    </div>
  );
}

export default TextInputComponent;
