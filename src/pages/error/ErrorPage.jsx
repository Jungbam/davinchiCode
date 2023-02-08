import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IMG } from "../../helpers/image";
import { StButton } from "../../components/common/Button";

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <StWrapper>
      <StError src={IMG.gameError} alt="에러발생" />
      <StButton variant="primary" size="md" onClick={() => navigate("/")}>
        돌아가기
      </StButton>
    </StWrapper>
  );
};

export default ErrorPage;

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
