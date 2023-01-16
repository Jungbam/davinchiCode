import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";
import styled from "styled-components";
import Video from "./Video";
import Candidate from "./Candidate";
import useVideo from "../../../hooks/useVideo";


const VideoChat = ({roomid}) => {
  const peers = useVideo({mode :'wait',roomID : roomid});
  const userVideo = useRef();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: {  width:' 354.82px',height: '231.89px'}, audio: true })
      .then((stream) => {
        userVideo.current.srcObject = stream;
        });
      }, []);

  return (
    <StWrapper>
      <StTop><StP>게임 대기방</StP></StTop>
      <StContainer>
      <StyledVideo muted ref={userVideo} autoPlay playsInline />
      {peers.map((peer, index) => {
        return <Video key={index} peer={peer} />;
      })}
      </StContainer>
      <Candidate roomid={roomid}/>
    </StWrapper>
  );
};

export default VideoChat;

const StWrapper = styled.div`
position: relative;
  display: flex;
  width: 763px; 
  height: 766px;
  border: 1px solid #E0E0E0;
  border-radius: 12px;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  gap : 20px;
`;

const StTop = styled.div`
  display: flex;
  width: 762px;
  height: 40px;
  background: #333333;
  justify-content: center;
  align-items: center;
  border-radius: 12px 12px 0px 0px;
`
const StP = styled.div`
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  color: #FFFFFF;
`
const StContainer =styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 10px;
`
const StyledVideo = styled.video`
  object-fit: cover;
  width: 354.82px;
  height: 231.89px;
  border-radius: 6px;
`;
