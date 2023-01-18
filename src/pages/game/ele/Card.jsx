import React from 'react'
import styled from 'styled-components'
const Card = ({card}) => {
  if(card?.color==='white'&& !card?.value) return <StWhEmCard/>
  else if(card?.color==='black'&& !card?.value) return <StBlEmCard/>
  else if(card?.color==='white'&& card?.value) return <StWhEmCard>{card?.value}</StWhEmCard>
  else if(card?.color==='black'&& card?.value) return <StBlEmCard>{card?.value}</StBlEmCard>
}

export default Card

const StWhEmCard = styled.div`
  width: 25px;
  height: 34px;
  background-color: white;
  color: black;
  border: 1px solid black;
`
const StBlEmCard = styled.div`
  width: 25px;
  height: 34px;
  background-color: black;
  border : 1px solid grey;
  color: white;
`