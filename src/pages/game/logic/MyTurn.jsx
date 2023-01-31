import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { ICON } from '../../../helpers/Icons'
import Timer from '../ele/Timer'

const MyTurn = ({GameTurn}) => {
  const {gameInfo} = useSelector(state=>state.gameSlice)
  const [select, setSelect] = useState(null)
  return (
    <StWrapper>
      <StP>가져올 타일의 색상을 정해주세요!</StP>
      <StCardContainer>
        <StCardBox>
          {gameInfo.blackCards&&<StCardP>남은 검은색 타일 : {gameInfo.blackCards} 개</StCardP>}
          {gameInfo.blackCards&&<StCard src={ICON.blackBack} alt='검은색' onClick={()=>setSelect('black')}/>}
          {select==='black'?<StSelect>선택</StSelect>:<StSelectNull/>}        </StCardBox>
        <StCardBox>
          {gameInfo.whiteCards&&<StCardP>남은 흰색 타일 : {gameInfo.whiteCards} 개</StCardP>}
          {gameInfo.whiteCards&&<StCard src={ICON.whiteBack} alt='흰색' onClick={()=>setSelect('white')}/>}
          {select==='white'?<StSelect>선택</StSelect>:<StSelectNull/>}
        </StCardBox>
      </StCardContainer>
      <button onClick={()=>GameTurn(select)}>확인</button>
      <Timer/>
    </StWrapper>
  )
}

export default MyTurn

const StWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap:20px;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
`;
const StP = styled.p`
  width: 270px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 6px;
  box-shadow: 0 4px 0 0 #111;
  border: solid 1px #111;
`
const StCardContainer = styled.div`
  display: flex;
`
const StCardBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap:20px;
  width: 128px;
  height: 188px;
`
const StCardP = styled.span`
  font-family: PretendardVariable;
  font-size: 12px;
  font-weight: 600;
`
const StCard = styled.img`
  width: 56px;
  height: 80px;
  cursor: pointer;
`
const StSelect = styled.span`
  width: 34px;
  height: 20px;
  font-family: PretendardVariable;
  font-size: 10px;
  font-weight: 600;
  border-radius: 999px;
  background-color: black;
  color: #ff601c;
  text-align: center;
  align-items: center;
`
const StSelectNull = styled.span`
  width: 34px;
  height: 20px;
  background-color: none;
  border: none;
`