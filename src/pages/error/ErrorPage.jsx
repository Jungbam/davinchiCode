import React from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { IMG } from '../../helpers/image';

const ErrorPage = () => {
  const navigate = useNavigate()
  return (
    <StWrapper>
      <StError src={IMG.gameError} alt="에러발생"/>
      <StBtn color="#ffdf24" onClick={()=>navigate('/')}>돌아가기</StBtn>
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
  width: 570px;
  height: 436px;
`
const StBtn = styled.button`
  width: 100px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: solid 1px #000;
  background-color: ${(props) => props.color};
  border-radius: 6px;
  font-weight: 700;
  font-size: 18px;
  line-height: 100%;
  text-align: center;
  color: #000;
  box-shadow: 0 3px 0 0 #000;
`;