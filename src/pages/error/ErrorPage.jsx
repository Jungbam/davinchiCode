import React from 'react'
import styled from 'styled-components';
import { IMG } from '../../helpers/image';

const ErrorPage = () => {
  return (
    <StWrapper>
      <StError src={IMG.gameError} alt="에러발생"/>
    </StWrapper>
  )
}

export default ErrorPage


const StWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const StError = styled.img`
  width: 50vw;
`