import React, { useState } from "react";
import styled from "styled-components";

const Ready = ({readyHandler}) => {
  return (
    <StWrapper>
      <StConfirmBtn onClick={readyHandler}>준비완료</StConfirmBtn>
      <StConfirmBtn>방 나가기</StConfirmBtn>
    </StWrapper>
  );
};

export default Ready;

const StWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
`;

const StConfirmBtn = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 32px;
  background: #ffdf24;
  border: 1px solid #000000;
  box-shadow: 0px 3px 0px #000000;
  border-radius: 6px;
  font-weight: 700;
  font-size: 14px;
  line-height: 100%;
  margin-top: 14px;
`;
