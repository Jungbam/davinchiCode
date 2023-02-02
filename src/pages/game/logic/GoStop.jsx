import React from 'react'
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { BootStrap } from '../../BootStrap';
import Timer from '../ele/Timer'
import OtherTurn from './OtherTurn';

const GoStop = ({nextTurn, goingContinue, userId}) => {
  const { StTitle, StBtn, StText, StWrapper } = BootStrap;
  const { turn } = useSelector((state) => state.gameSlice.gameInfo);
  if (turn === userId)
  return (
    <StWrapper gap="16px">
      <StTitle width="284px">상대방의 타일을 지목하시겠습니까?</StTitle>
      <StText mgTop="0px">다른 상대방에게 넘기려면 "넘어가기" 버튼을, 다시 진행하려면 "진행하기" 버튼을 눌러주세요.</StText>
      <StBtnBox>
        <StBtn width="100px" height="30px" color="#fff" fontSize="14px" onClick={()=>nextTurn()}>넘어가기</StBtn>
        <StBtn width="100px" height="30px" color="#ffdf24" fontSize="14px" onClick={()=>goingContinue()}>지목하기</StBtn>
      </StBtnBox>
      <Timer timeOver={()=>nextTurn()}/>
    </StWrapper>
  )
  else return <OtherTurn text="상대 지목하기"/>
}

export default GoStop
const StBtnBox = styled.div`
  display: flex;
  justify-content: center;
  gap : 6px;
  padding: 16px;
`