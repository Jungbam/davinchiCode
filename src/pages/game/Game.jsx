import styled from "styled-components";
import Header from "../../components/common/elements/Header";
import UsersBox from "./ele/UsersBox";
import CenterBox from "./ele/CenterBox";
import Chat from "./ele/chat/Chat";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { io } from "socket.io-client";
import background from "../../assets/images/background.png";
import myUserBackground from "../../assets/images/myUserBackground.png";
import otherUserBackground from "../../assets/images/otherUserBackground.png";
import { eventName } from "../../helpers/eventName";
import { useDispatch, useSelector } from "react-redux";
import { setUsers } from "../../redux/modules/gameSlice";
import MyBox from "./ele/MyBox";

const userId = Math.floor(Math.random()*10)

const Game = () => {
  const [msgList, setMsgList] = useState([]);
  const { roomId } = useParams();
  const socketRef = useRef();
  const { users } = useSelector((state) => state.gameSlice.gameInfo);

  const myInfo = users.filter((user)=>user.userId ===userId)
  const others = users.filter((user)=>user.userId !==userId)
  const dispatch = useDispatch();
  useEffect(() => {
    socketRef.current = io.connect(process.env.REACT_APP_SERVER);
    socketRef.current.emit(eventName.JOIN, userId,roomId,(usersInRoom)=>{
      dispatch(setUsers(usersInRoom));
    });
  }, []);

  const createdAt = new Date().toLocaleString();
  useEffect(() => {
    socketRef.current.on(eventName.RECEIVE_MESSAGE, (msg) => {
      const myMsg = { msg, mine: false, createdAt };
      setMsgList((prev) => [...prev, myMsg]);
    });
  }, [socketRef.current]);

  return (
    <>
      <Header />
      <StWrapper>
        <StContainer>
          <StPeerWrapper>
            <UsersBox user={others[0] ? others[0] : null} />
            <UsersBox user={others[1] ? others[1] : null} />
            <UsersBox user={others[2] ? others[2] : null} />
          </StPeerWrapper>
          <CenterBox roomId={roomId} socket={socketRef} userId={userId}/>
          <StMyBoxWrapper>
            <StMyBoxContainer>
              <MyBox user={myInfo[0] ? myInfo[0] : null} />
            </StMyBoxContainer>
            <Chat
              roomId={roomId}
              socket={socketRef}
              msgList={msgList}
              setMsgList={setMsgList}
            />
          </StMyBoxWrapper>
        </StContainer>
      </StWrapper>
    </>
  );
};

export default Game;

const StWrapper = styled.div`
  background-image: url(${background});
  background-size: cover;
  height: 100vh-40px;
  background-color: #2b2b2b;
`;
const StPeerWrapper = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  margin-top: 20px;
  justify-content: space-between;
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
