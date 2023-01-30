import React from 'react'
import styled from 'styled-components'
import { ICON } from '../../../helpers/Icons'
const DavinchiCard = ({card, onClick}) => {
  const cardName = card?.color + card?.value
  return (
    <StCardImg src={ICON[cardName]} alt="다빈치 코드" onClick={onClick}/>
  )
}
DavinchiCard.defaultProps ={
  onClick : ()=>{}
}
export default DavinchiCard

const StCardImg = styled.img`
  width: 100%;
`