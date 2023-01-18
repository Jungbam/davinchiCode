import styled from "styled-components";
import Header from "../../components/common/elements/Header";
import UsersBox from "./ele/UsersBox";
import CenterBox from "./ele/CenterBox";
import Peer from "simple-peer";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { ICON } from "../Icons";
import Chat from "./ele/chat/Chat";
import { io } from "socket.io-client";
import { eventName } from "../../helpers/eventName";
import background from "../../assets/images/background.png";
import myUserBackground from "../../assets/images/myUserBackground.png";
import otherUserBackground from "../../assets/images/otherUserBackground.png";
import Video from "./ele/chat/Video";

const Game = () => {
  const {roomID} = useParams()
  const [peers, setPeers] = useState([]);
  const peersRef = useRef([]);
  const userVideo = useRef();
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io.connect(process.env.REACT_APP_SERVER);
    navigator.mediaDevices
      .getUserMedia({ video: {  width:' 354.82px',height: '231.89px'}, audio: true })
      .then((stream) => {
        userVideo.current.srcObject = stream;
        socketRef.current.emit("joined", roomID);
        socketRef.current.on("all users", (users) => {
          const peers = [];
          users.forEach((userID) => {
            const peer = createPeer(userID, socketRef.current.id, stream);
            peersRef.current.push({
              peerID: userID,
              peer,
            });
            peers.push(peer);
          });
          setPeers(peers);
        });

        socketRef.current.on("user joined", (payload) => {
          const peer = addPeer(payload.signal, payload.callerID, stream);
          peersRef.current.push({
            peerID: payload.callerID,
            peer,
          });
          setPeers((users) => [...users, peer]);
        });

        socketRef.current.on("receiving returned signal", (payload) => {
          const item = peersRef.current.find((p) => p.peerID === payload.id);
          item.peer.signal(payload.signal);
        });
      });
  }, []);

  function createPeer(userToSignal, callerID, stream) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });
    peer.on("signal", (signal) => {
      socketRef.current.emit("sending signal", {
        userToSignal,
        callerID,
        signal,
      });
    });
    return peer;
  }

  function addPeer(incomingSignal, callerID, stream) {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });
    peer.on("signal", (signal) => {
      socketRef.current.emit("returning signal", { signal, callerID });
    });
    peer.signal(incomingSignal);
    return peer;
  }
  return (
    <>
      <Header />
      <StWrapper>
        <StContainer>
              <StPeerWrapper>
        {peers[0]?
          <StOtherUsers>
            <StUserInfo>
              <Video key={0} peer={peers[0]} />
              <SelectBtn> 지목 </SelectBtn>
            </StUserInfo>
            <StCardArea>
            </StCardArea>
          </StOtherUsers>
          :
          <UsersBox></UsersBox>}
           {peers[1]?
          <StOtherUsers>
            <StUserInfo>
              <Video key={1} peer={peers[1]} />
              <SelectBtn> 지목 </SelectBtn>
            </StUserInfo>
            <StCardArea>
            </StCardArea>
          </StOtherUsers>:
          <UsersBox></UsersBox>}
           {peers[2]?
          <StOtherUsers>
            <StUserInfo>
              <Video key={2} peer={peers[2]} />
              <SelectBtn> 지목 </SelectBtn>
            </StUserInfo>
            <StCardArea>
            </StCardArea>
          </StOtherUsers>:
          <UsersBox></UsersBox>}
              </StPeerWrapper>
          <CenterBox  roomID={roomID} socket={socketRef} />
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
            <Chat roomID={roomID} socket={socketRef} />
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
