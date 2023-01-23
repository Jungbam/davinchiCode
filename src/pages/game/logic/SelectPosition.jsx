import React from 'react'
import DavinchiCard from '../ele/DavinchiCard'
import Timer from '../ele/Timer'
import JokerPosition from './JokerPosition'

const SelectPosition = ({card, cardPick}) => {
  if(card.value ===12) return <JokerPosition selectedCard={card} cardPick={cardPick}/>
  return (
    <div>
      <DavinchiCard card ={card}/>
      <p>뽑으신 타일의 숫자는 {card.value} 입니다.</p>
      <p>오름차순으로 자동으로 배치됩니다.</p>
      <button onClick={cardPick}>확인</button>
      <Timer/>
    </div>
  )
}

export default SelectPosition