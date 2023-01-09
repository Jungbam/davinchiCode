import React from 'react'
import Chat from './ele/Chat'
import VideoChat from './ele/VideoChat'
import { useNavigate } from 'react-router-dom';

const AwaitPage = () => {
  const navigate = useNavigate()
  return (
    <div>
      <li><button onClick={()=>navigate('/')}>홈</button></li>
      {/* <VideoChat/> */}
      <Chat/></div>
  )
}

export default AwaitPage