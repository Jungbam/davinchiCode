import React from 'react'
import { useSelector } from 'react-redux'

const Turn = () => {
  const turn = useSelector(state=>state.gameSlice)
  return (
    <div>Turn</div>
  )
}

export default Turn