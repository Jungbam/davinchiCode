import React from "react";
import styled from "styled-components";

const Loading = () => {
  return (
    <StWrapper>
      <StContainer>로딩 이미지</StContainer>
      <StDiv>로딩 중입니다.</StDiv>
    </StWrapper>
  );
};

export default Loading;

const StWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const StContainer = styled.div`
  width: 300px;
  height: 300px;
  background-color: #d9d9d9;
  color: #444;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const StDiv = styled.div`
  font-size: 18px;
  font-weight: 500;
  color: #ffdf24;

  margin-top: 30px;
`;
