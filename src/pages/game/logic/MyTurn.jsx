import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { ICON } from '../../../helpers/Icons'
const MyTurn = ({GameTurn}) => {
  const {gameInfo} = useSelector(state=>state.gameSlice)
  const [select, setSelect] = useState(null)
  return (
    <>
    <div>가져올 타일의 색상을 정해주세요!</div>
    <div>
      <div>
        {gameInfo.blackCards&&<p>남은 검은색 타일 : {gameInfo.blackCards} 개</p>}
        {gameInfo.blackCards&&<img src={ICON.blackBack} alt='검은색' onClick={()=>setSelect('black')}/>}
        {select==='black'&&<p>선택</p>}
      </div>
      <div>
        {gameInfo.whiteCards&&<p>남은 흰색 타일 : {gameInfo.whiteCards} 개</p>}
        {gameInfo.whiteCards&&<img src={ICON.whiteBack} alt='흰색' onClick={()=>setSelect('white')}/>}
        {select==='white'&&<p>선택</p>}
      </div>
      <button onClick={()=>GameTurn(select)}>확인</button>
    </div>
    </>
  )
}

export default MyTurn