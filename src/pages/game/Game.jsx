import styled from "styled-components";
import { io } from "socket.io-client";
import { SocketId } from "../../helpers/socket";

import Header from "../../components/common/elements/Header";
import UsersBox from "./ele/UsersBox";
import CenterBox from "./ele/CenterBox";
import MyBox from "./ele/MyBox";
import background from "../../assets/images/background.png";
import { useEffect, useRef } from "react";
import { useParams } from "react-router";
import useVideo from "../../hooks/useVideo";

const Game = () => {
  const {roomID} = useParams()
  const userVideo = useRef();
  const [peers,Chat] =useVideo(roomID)

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: {  width:' 354.82px',height: '231.89px'}, audio: true }).then((stream) => {
        userVideo.current.srcObject = stream;
        });
      }, []);

  return (
    <>
      <Header />
      <StWrapper>
        <StContainer>
          <UsersBox />
          <CenterBox />
          <MyBox roomID={roomID}/>
          <Chat roomID={roomID}/>
        </StContainer>
      </StWrapper >
    </>
  );
};

export default Game;

const StWrapper = styled.div`
  background-image: url(${background});
  background-size: cover;
  height: 100vh;
  background-color: #2b2b2b;
`;

const StContainer = styled.div`
  width: 1080px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;
