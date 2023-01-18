import styled from "styled-components";
import Header from "../../components/common/elements/Header";
import UsersBox from "./ele/UsersBox";
import CenterBox from "./ele/CenterBox";
import background from "../../assets/images/background.png";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { ICON } from "../Icons";
import myUserBackground from "../../assets/images/myUserBackground.png";
import userProfile from "../../assets/images/user_profile.png";
import Chat from "./ele/chat/Chat";
import { io } from "socket.io-client";
import { eventName } from "../../helpers/eventName";

const Game = () => {
  const {roomID} = useParams()
  const userVideo = useRef();
  const socket = useRef()
  const [init, setInit] = useState(false)
  

  useEffect(() => {
    socket.current= io.connect(process.env.REACT_APP_SERVER);
    // socket.current.on(eventName.READY_TO_JOIN,()=>{
    socket.current.emit(eventName.JOIN, roomID)
    navigator.mediaDevices
      .getUserMedia({ video: {  width:' 354.82px',height: '231.89px'}, audio: true }).then((stream) => {
        userVideo.current.srcObject = stream;
        setInit(true)
        });
        
    // })
      }, []);

  return (
    <>
      <Header />
      <StWrapper>
        <StContainer>
          <UsersBox roomID={roomID} socket={socket} />
          <CenterBox />
          <StMyBoxWrapper>
            <StMyBoxContainer>
              <StyledVideo muted ref={userVideo} autoPlay playsInline />
              <StBtnList>
                <img src={ICON.iconMic} alt="icon" />
                <div>|</div>
                <img src={ICON.iconVideocam} alt="icon" />
                <div>|</div>
                <img src={ICON.iconSetting} alt="icon" />
              </StBtnList>
            </StMyBoxContainer>
            <Chat roomID={roomID} socket={socket} />
          </StMyBoxWrapper>
        </StContainer>
      </StWrapper >
    </>
  );
};

export default Game;

const StyledVideo = styled.video`
  object-fit: cover;
  width: 200px;
  height: 112px;
  border-radius: 4px;
`;

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
const StMyBoxWrapper = styled.div`
  width: 100%;
  height: 200px;
  margin-top: 9px;

  display: flex;
  justify-content: space-between;
`;
const StMyBoxContainer = styled.div`
  height: 100%;
  width: 714px;
  background-image: url(${myUserBackground});
  padding: 20px 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 6px;
  border: solid 1px #111;
  background-color: #eee;
`;

const StMyBoxBox = styled.div`
  display: flex;
`;

const StBtnList = styled.div`
  width: 200px;
  height: 36px;
  background-color: #fff;
  border-radius: 4px;
  border: solid 1px #aaa;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 24px;
  & div {
    font-size: 16px;
    color: #aaa;
  }
  & img {
    cursor: pointer;
  }
`;

const StCardList = styled.div`
  height: 48px;
  gap: 3.5px;
  display: flex;
  margin-top: 24px;
  margin-left: 14px;
`;

const StCamera = styled.div`
  width: 200px;
  height: 112px;
  border-radius: 4px;

  padding: 6px;
  font-size: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  background-image: url(${userProfile});
`;

const StSpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StCameraStatus = styled.div`
  gap: 10px;
  width: 40px;
  & img {
    height: 16px;
    margin-right: 3px;
  }
`;

const StGameStatus = styled.div`
  width: 46px;
  height: 20px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 5px 10px;
  border-radius: 4px;
  background-color: #ffdf24;

  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  color: #000;
`;

const StUserName = styled.div`
  width: 64px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;

  color: #fff;
  padding: 5px 10px;
  border-radius: 999px;
  background-color: rgba(0, 0, 0, 0.7);
  & div {
    display: block;
  }
`;
