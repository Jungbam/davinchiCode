import React from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { setUsers } from '../../../redux/modules/gameSlice'

const ResultSelect = ({gameResult, result}) => {
  const timer = useRef(null)
  const dispatch=useDispatch()
  const {indicated, gameInfo} = useSelector(state=>state.gameSlice)
  const indicatedUser = gameInfo?.users?.filter(el=>el.userId === indicated)
  const turnUser = gameInfo?.users?.filter(el=> el.userId === gameInfo.turn)
  
  useEffect(() => {
    timer.current = setTimeout(()=>dispatch(setUsers(gameResult)),3000)
    return () => clearTimeout(timer.current)
  }, [])
  
  return (
    <div>
      <StReult result={result}>타일 맞추기 {result? '성공!' : '실패!'}</StReult>
      <p>{turnUser[0]?.nickName}님이 타일 맞추기에 {result? '성공!' : '실패!'}하셨습니다.</p>
      <p>{result?indicatedUser[0]?.nickName:turnUser[0]?.nickName}님의 타일이 공개됩니다.</p>
    </div>
  )
}

export default ResultSelect

const StReult = styled.h1`
  text-decoration : ${({ result }) => {
    return result ? "solid underline yellow 6px" : "solid underline grey 6px";
  }};
`