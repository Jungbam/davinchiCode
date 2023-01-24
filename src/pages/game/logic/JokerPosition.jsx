import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import DavinchiCard from '../ele/DavinchiCard'
import Timer from '../ele/Timer'

const JokerPosition = ({selectedCard, cardPick}) => {
  const {users} = useSelector(state=>state.gameSlice.gameInfo)
  const [mine, setMine] = useState(users[0]?.hand||[])
  const [picked, setPicked] = useState(true)
  // 작업
  // 드래그앤 드롭 후 setMine => 해당 값을 위로 올려서 서버에 emit
  // setMine 될때 setPicked(prev=>!prev)
  // 확인 누르면서 setMine(false)
  return (
    <div><p>조커 타일 획득!</p>
    <p>조커 블록을 마우스로 끌어 원하는 자리로 이동시켜 주세요.</p>
    <StAllCard>
      <StMyCard>
        {mine?.map((card,i) => (
          <DavinchiCard key={`jokerSelect${i}`} card={card} />
        ))}
      </StMyCard>
      <StJokerCard>
          <DavinchiCard card={selectedCard}/>
      </StJokerCard>
      <button disabled={picked} onClick={()=>{cardPick(mine)}}>확인</button>
    </StAllCard>
    <Timer/>
    </div>
  )
}

export default JokerPosition
const StAllCard = styled.div`
  
`
const StMyCard = styled.div`
  
`
const StJokerCard = styled.div`
  
`