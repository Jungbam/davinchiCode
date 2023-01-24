import React from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import DavinchiCard from '../ele/DavinchiCard'

const SelectIndicatedUser = ({indicatedUser,guessCard}) => {
  const controledCard = indicatedUser[0]?.hand
  const [select, setSelect] = useState({cardIndex : null, value : null})

  return (
    <div>
      <StRow>
        {controledCard?.map((card,i) => (
          <div key={`${indicatedUser.nickName}indicated${i}`}>
            <DavinchiCard card={card} onClick={()=>setSelect(prev=>{return{...prev, cardIndex : i}})}/>
            {select.cardIndex===i&&<p>선택</p>}
          </div>
        ))}
      </StRow>
      <StRow>
        {new Array(13).fill('_').map((el,i)=>(
          <StValue key={`indicatedCard${i}`} selected={select.value===i} onClick={()=>setSelect(prev=>{return{...prev, value : i}})}>{i===12?'joker':i+1}</StValue>
          ))}
      </StRow>
      <StRow>
        <button onClick={()=>guessCard(indicatedUser, select)}>결정</button>
      </StRow>
    </div>
  )
}

export default SelectIndicatedUser

const StValue = styled.div`
  width: 25px;
  height: 25px;
  font-weight :${({ selected }) => {
    return selected ? "1000" : "400";
  }};
  border: 1px solid grey;
`
const StRow = styled.div`
  display: flex;
`