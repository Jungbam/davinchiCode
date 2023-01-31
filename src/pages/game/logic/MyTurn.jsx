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
      <div>
        <StCardBox>
          {gameInfo.blackCards&&<p>남은 검은색 타일 : {gameInfo.blackCards} 개</p>}
          {gameInfo.blackCards&&<img src={ICON.blackBack} alt='검은색' onClick={()=>setSelect('black')}/>}
          {select==='black'&&<p>선택</p>}
        </StCardBox>
        <StCardBox>
          {gameInfo.whiteCards&&<p>남은 흰색 타일 : {gameInfo.whiteCards} 개</p>}
          {gameInfo.whiteCards&&<img src={ICON.whiteBack} alt='흰색' onClick={()=>setSelect('white')}/>}
          {select==='white'&&<p>선택</p>}
        </StCardBox>
        <button onClick={()=>GameTurn(select)}>확인</button>
      </div>
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

const StCardBox = styled.div`
  width: 116px;
`