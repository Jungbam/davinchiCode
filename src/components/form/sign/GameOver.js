import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const GameOver = ({ closeModal }) => {
  const navigate = useNavigate();
  const goBackHandler = () => {
    navigate("/lobby");
  };
  return (
    <StWrapper>
      <StLogoutComment>시간초과 GameOver</StLogoutComment>
      <StLogoutBtnList>
        <StButton color="#ffdf24" onClick={closeModal}>
          뒤로
        </StButton>
        <StButton color="#fff" onClick={goBackHandler}>
          확인
        </StButton>
      </StLogoutBtnList>
    </StWrapper>
  );
};
export default GameOver;

const StWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StLogoutComment = styled.div`
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;

  margin-top: 46px;
`;

const StLogoutBtnList = styled.div`
  width: 206px;
  height: 32px;
  display: flex;
  justify-content: space-between;
  margin-top: 26px;
`;

const StButton = styled.div`
  width: 100px;
  height: 32px;
  background: ${({ color }) => color};
  border: 1px solid #000000;
  box-shadow: 0px 3px 0px #000000;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  font-weight: 700;
  font-size: 14px;
  line-height: 100%;
`;
