import React, { useEffect } from "react";
import { styled } from "styled-components";

function PinkBtn(props) {
  const { title, active } = props;

  //버튼 누르면 부모 함수 실행됨
  const onClick = () => {
    props.onClick();
  };

  const BtnActive = styled.button`
    display: block;
    margin: 10px auto;
    width: 90%;
    height: 40px;
    background: ${!active ? "#B3B3B3" : "#ff8989"};
    boxshadow: 0px 2px 5px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    color: #ffffff;
    font-family: PreMedium;
    border: none;

    &:hover {
      ${active && "cursor: pointer;"};
    }
  `;

  return (
    <BtnActive onClick={onClick} disabled={!active}>
      {title}
    </BtnActive>
  );
}

export default PinkBtn;
