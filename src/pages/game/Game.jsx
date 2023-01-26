import styled from "styled-components";
import Header from "../../components/common/elements/Header";
import UsersBox from "./ele/UsersBox";
import CenterBox from "./ele/CenterBox";
import Chat from "./ele/chat/Chat";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { io } from "socket.io-client";

import { eventName } from "../../hooks/eventName";
import background from "../../assets/images/background.png";
import myUserBackground from "../../assets/images/myUserBackground.png";
import otherUserBackground from "../../assets/images/otherUserBackground.png";
import { useDispatch, useSelector } from "react-redux";
import { setUsers } from "../../redux/modules/gameSlice";
import MyBox from "./ele/MyBox";
const usersMokinit = {
  blackCards: 4,
  whiteCards: 4,
  turn: null,
  users: [
    {
      userId: 1,
      nickName: "익명1",
      isReady: true,
      userProfileImg: "https://cdn.pixabay.com/photo/2023/01/12/15/05/flamingo-7714344_640.jpg",
      hand: [],
    },
    {
      userId: 2,
      nickName: "익명2",
      isReady: true,
      userProfileImg: "https://cdn.pixabay.com/photo/2022/07/11/08/44/tower-7314495_1280.jpg",
      hand: [],
    },
    {
      userId: 3,
      nickName: "익명3",
      userProfileImg: "https://cdn.pixabay.com/photo/2023/01/12/07/19/rat-7713508_640.jpg",
      hand: [],
    },
  ],
};

const Game = () => {
  const [msgList, setMsgList] = useState([]);
  const { roomID } = useParams();
  const socketRef = useRef();
  const { users } = useSelector((state) => state.gameSlice.gameInfo);
  const dispatch = useDispatch();

  useEffect(() => {
    socketRef.current = io.connect(process.env.REACT_APP_SERVER);
    socketRef.current.emit(eventName.JOIN, roomID);
    dispatch(setUsers(usersMokinit));
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
            <UsersBox user={users[1] ? users[1] : null} />
            <UsersBox user={users[2] ? users[2] : null} />
            <UsersBox user={users[3] ? users[3] : null} />
          </StPeerWrapper>
          <CenterBox roomID={roomID} socket={socketRef} />
          <StMyBoxWrapper>
            <StMyBoxContainer>
              <MyBox user={users[0] ? users[0] : null}/>
            </StMyBoxContainer>
            <Chat
              roomID={roomID}
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
