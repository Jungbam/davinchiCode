import styled from "styled-components";
import Header from "../../components/common/elements/Header";
import UsersBox from "./ele/UsersBox";
import CenterBox from "./ele/CenterBox";
import Chat from "./ele/chat/Chat";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { io } from "socket.io-client";
import { eventName } from "../../helpers/eventName";
import background from "../../assets/images/background.png";
import myUserBackground from "../../assets/images/myUserBackground.png";
import otherUserBackground from "../../assets/images/otherUserBackground.png";
import { useSelector } from "react-redux";

const Game = () => {
  const [msgList, setMsgList] = useState([])
  const {roomID} = useParams()
  const socketRef = useRef();
  const {userInfo}=useSelector(state=>state)

  useEffect(() => {
    socketRef.current = io.connect(process.env.REACT_APP_SERVER);
    socketRef.current.emit(eventName.JOIN, roomID);
  }, []);

  const createdAt = new Date().toLocaleString()
  useEffect(()=>{
      socketRef.current.on(eventName.RECEIVE_MESSAGE, (msg)=> {
        const myMsg = {msg, mine:false, createdAt}
        setMsgList(prev=>[...prev, myMsg])})
  },[socketRef.current])

  return (
    <>
      <Header />
      <StWrapper>
        <StContainer>
              <StPeerWrapper>
                <UsersBox/>
                <UsersBox/>
                <UsersBox/>
              </StPeerWrapper>
          <CenterBox  roomID={roomID} socket={socketRef} />
          <StMyBoxWrapper>
            <StMyBoxContainer>
              <UsersBox/>
            </StMyBoxContainer>
            <Chat roomID={roomID} socket={socketRef} msgList={msgList} setMsgList={setMsgList}/>
          </StMyBoxWrapper>
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
  const StyledVideo = styled.video`
    object-fit: cover;
    width: 200px;
    height: 112px;
    border-radius: 4px;
  `;
const StPeerWrapper = styled.div`
  margin-top: 20px;
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: space-between;
`;
const StOtherUsers = styled.div`
  width: 356px;
  height: 100%;
  background-image: url(${otherUserBackground});
  padding: 16px;
  border-radius: 6px;
  border: solid 1px #111;
  background-color: #eee;
`;
const StUserInfo = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
const SelectBtn = styled.button`
  width: 93px;
  height: 32px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  box-shadow: 0 3px 0 0 #616161;
  border: solid 1px #616161;
  background-color: #ddd;
  font-family: Pretendard;
  font-size: 14px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  text-align: center;
  color: #616161;
`;
const StCardArea = styled.div`
  width: 100%;
  height: 32px;
  gap: 2px;
  display: flex;
  margin: 20px 7px;
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
