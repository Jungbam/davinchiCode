import React from 'react'
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { ICON } from '../../Icons';

const OtherTurn = () => {
  const {gameInfo}=useSelector(state=>state.gameSlice)
  const turnUser = gameInfo.users.filter(el=>el.userId===gameInfo.turn)
  return (
    <>
      <div>
        <img src={ICON.blackBack} alt="다빈치 코드"/>
        <img src={ICON.whiteBack} alt="다빈치 코드"/>
      </div>
      <StWrapper>{turnUser[0]?.userName}님이 타일 뽑기를 진행중입니다.</StWrapper>
    </>
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