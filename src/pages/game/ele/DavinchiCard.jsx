import React from 'react'
import { ICON } from '../../Icons'

const DavinchiCard = ({card}) => {
  const cardName = card.color + card.value
  return (
    <img src={ICON[cardName]} alt="다빈치 코드"/>
  )
}

export default DavinchiCard