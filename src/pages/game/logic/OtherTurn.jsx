import { styled } from '@tanstack/react-query-devtools/build/lib/utils';
import React from 'react'

const OtherTurn = () => {
  return (
    <StWrapper>익명2님의 차례입니다.</StWrapper>
  )
}

export default OtherTurn
const StWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
`;