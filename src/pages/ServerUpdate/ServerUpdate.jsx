import React from "react";
import styled from "styled-components";
import { IMG } from "../../helpers/image";

const ServerUpdate = () => {
  return (
    <StWrapper>
      <StError src={IMG.gameError} alt="에러발생" />
      <StH1>서버 점검중입니다. 빠른 시간내에 점검 마무리하겠습니다.</StH1>
    </StWrapper>
  );
};

export default ServerUpdate;

const StWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const StError = styled.img`
  width: 570px;
  height: 436px;
`;
const StH1 = styled.h1`
  color: white;
`;
