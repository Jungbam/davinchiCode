import React from 'react'
import { useSelector } from 'react-redux'
import { BootStrap } from '../../BootStrap'
import DavinchiCard from '../ele/DavinchiCard'
import Timer from '../ele/Timer'
import Indicate from './Indicate'
import JokerPosition from './JokerPosition'

const SelectPosition = ({card, cardPick, selectIndicaterCard}) => {
  const {blackCards, whiteCards} = useSelector(state=>state.gameSlice.gameInfo)
  const { StWrapper } = BootStrap;
  if(blackCards===0||whiteCards===0) return <Indicate selectIndicaterCard={selectIndicaterCard}/>
  if(card.value ===12) return <JokerPosition selectedCard={card} cardPick={cardPick}/>
  return (
    <StWrapper jus="center">
      <DavinchiCard card ={card}/>
      <p>뽑으신 타일의 숫자는 {card.value} 입니다.</p>
      <p>오름차순으로 자동으로 배치됩니다.</p>
      <button onClick={cardPick}>확인</button>
      <Timer timeOver={cardPick}/>
    </StWrapper>
  )
}

export default SelectPosition