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
import { eventName } from "../../helpers/eventName";
import { useDispatch, useSelector } from "react-redux";
import { setUsers } from "../../redux/modules/gameSlice";
import MyBox from "./ele/MyBox";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../helpers/queryKeys";
import { SignAPI } from "../../api/axios";
const userId = Math.floor(Math.random() * 100);
const Game = () => {
  const [msgList, setMsgList] = useState([]);
  const { roomId } = useParams();
  const socketRef = useRef();
  const { data } = useQuery([queryKeys.MYINFO], SignAPI.myinfo, {
    staleTime: 30 * 60 * 1000,
    cacheTime: 30 * 60 * 1000,
    onSuccess: (res) => {},
    onError: () => {},
  });
  // const userId = data.data.userId
  const { users } = useSelector((state) => state.gameSlice.gameInfo);

  const myInfo = users.filter((user) => user.userId === userId);
  const others = users.filter((user) => user.userId !== userId);
  const dispatch = useDispatch();

  const preventHandler = (e) => {
    e.preventDefault();
    if (e.keyCode === 116) {
      const answer = window.confirm(
        "새로고침을 진행하면 로비로 나가집니다. 진행하시겠습니까?"
      );
      if (answer) window.location.reload();
      else return;
    }
  };

  useEffect(() => {
    document.onkeydown = preventHandler;
    socketRef.current = io.connect(process.env.REACT_APP_SERVER);
    socketRef.current.emit(eventName.JOIN, userId, roomId, (usersInRoom) => {
      dispatch(setUsers(usersInRoom));
    });
    return () => {
      document.onkeydown = null;
      socketRef.current.emit(eventName.ROOMOUT);
    };
  }, []);

  const createdAt = new Date().toLocaleString();
  useEffect(() => {
    socketRef.current.on(eventName.RECEIVE_MESSAGE, (msg) => {
      const myMsg = { msg, mine: false, createdAt };
      setMsgList((prev) => [...prev, myMsg]);
    });
  }, [socketRef.current]);

  return (
    <StWrapper>
      <Header />
      <StContainer>
        <StPeerWrapper>
          <UsersBox user={others[0] ? others[0] : null} />
          <UsersBox user={others[1] ? others[1] : null} />
          <UsersBox user={others[2] ? others[2] : null} />
        </StPeerWrapper>
        <CenterBox roomId={roomId} socket={socketRef} userId={userId} />
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
  );
};

export default Game;

const StWrapper = styled.div`
  background-image: url(${background});
  background-size: cover;
  height: 100vh;
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
  position: relative;
  height: 100%;
  width: 714px;
  background-image: url(${myUserBackground});

  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 6px;
  border: solid 1px #111;
  background-color: #eee;
`;
