import React from 'react'
import Chat from './ele/Chat'
import VideoChat from './ele/VideoChat'
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

const AwaitPage = () => {
  const {roomid} = useParams()

  return (
    <StWrapper>
      <VideoChat roomid={roomid}/>
      <Chat roomid={roomid}/>
    </StWrapper>
  )
}

export default AwaitPage

const StWrapper = styled.div`
  display: flex;
  justify-content: center;
`