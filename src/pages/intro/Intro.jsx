import React from 'react'
import { useNavigate } from 'react-router-dom'

const Intro = () => {
  const navigate = useNavigate()
  return (
    <div>
            <li><button onClick={()=>navigate('/await')}>대기</button></li>
      Intro</div>
  )
}

export default Intro