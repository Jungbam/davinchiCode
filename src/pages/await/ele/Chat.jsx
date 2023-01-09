import React, { useEffect, useRef, useState } from 'react'
import Peer from 'simple-peer';
import io from 'socket.io-client'
import styled from 'styled-components';
import Message from './Message';
import Video from './Video';

const Chat = () => { // const {room} = useParams()
  // 채팅
  const room =3
  const [msg, setMsg] = useState('')
  const [msgList, setMsgList] = useState([])
  const [nickName, setNickName] = useState('')
  const socket = useRef();

  const createdAt = new Date().toLocaleString()

  // 화상채팅
  const [peers, setPeers] = useState([]);
  const userVideo = useRef();
  const peersRef = useRef([]);

  // 채팅  
  const addMyMessage=(msg)=>{
    const myMsg = {msg, mine:true, createdAt}
    setMsgList((prev) => [...prev, myMsg]);
    setMsg('')
  }

  const sendMessage = (e) => {
    if(e.keyCode===13){
      nickName?
      socket.current.emit("whisper", nickName, msg, addMyMessage):
      socket.current.emit("send_message", { msg, room },addMyMessage);
    }
  };

  const sendMessageBtn = (e) => {
    nickName?
      socket.current.emit("whisper", nickName, msg, addMyMessage):
      socket.current.emit("send_message", { msg, room },addMyMessage);
  };

  const setNickNameHandler = ()=>{
    socket.current.emit("nickName", nickName)
    setNickName('')
  }

  // 화상채팅
  const createPeer=(userToSignal, callerID, stream)=> {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });
    
    peer.on("signal", (signal) => {
      socket.current.emit("sending signal", {
        userToSignal,
        callerID,
        signal,
      });
    });

    return peer;
  }
  const addPeer=(incomingSignal, callerID, stream)=> {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socket.current.emit("returning signal", { signal, callerID });
    });

    peer.signal(incomingSignal);

    return peer;
  }
  useEffect(()=>{
    // 채팅
    socket.current = io.connect("http://localhost:3001");
    socket.current.emit('join_room', room)
    //  socket.emit("nickname", nickName) // 카카오 닉네임으로 소켓 설정하기
    
    // 화상채팅
    navigator.mediaDevices
    .getUserMedia({ video: {height : '300px', width :'200px' }, audio: true })
    .then((stream) => {
      userVideo.current.srcObject = stream;
      socket.current.emit("joinRtcRoom", room);
      socket.current.on("all_users", (RtcUsers) => {
          const peers = [];
          RtcUsers.forEach((userID) => {
            const peer = createPeer(userID, socket.current.id, stream);
            peersRef.current.push({
              peerID: userID,
              peer,
            });
            peers.push(peer);
          });
          setPeers(peers);
        });

        socket.current.on("user joined", (payload) => {
          const peer = addPeer(payload.signal, payload.callerID, stream);
          peersRef.current.push({
            peerID: payload.callerID,
            peer,
          });
          setPeers((users) => [...users, peer]);
        });

        socket.current.on("receiving returned signal", (payload) => {
          const item = peersRef.current.find((p) => p.peerID === payload.id);
          item.peer.signal(payload.signal);
        });
      });    

    return () => {
      socket.current.disconnect();
    };
  }, [])

  useEffect(()=>{
    socket.current.on('receive_message', (msg)=> {
      const myMsg = {msg, mine:false, createdAt}
      setMsgList(prev=>[...prev, myMsg])})
  },[socket])

  return (
  <>
    <StRtcWrapper>
      <StMyVideo muted ref={userVideo} autoPlay playsInline />
      {peers.map((peer, index) => {
        return <Video key={index} peer={peer} />})}
    </StRtcWrapper>
    <StWrapper>
      <input value={nickName} onChange={(e)=>setNickName(e.target.value)}/>
      <button onClick={setNickNameHandler}>닉네임 설정</button>
      <StMsgContainer>
      {msgList?.map((el,i)=>{
        return <Message key={`comment${i}`}msg={el}/>
      })}
      </StMsgContainer>
      <StBtnContainer>
      <input type='text' value={msg} onChange={(e)=>setMsg(e.target.value)} placeholder='메시지를 입력하세요.' onKeyUp={sendMessage}/>
      <button onClick={sendMessageBtn}>Enter</button>
      </StBtnContainer>
    </StWrapper>
  </>
  )
}

export default Chat

const StRtcWrapper = styled.div`
  padding: 20px;
  display: flex;
  height: 100vh;
  width: 90%;
  margin: auto;
  flex-wrap: wrap;
`;
const StMyVideo = styled.video`
  height: 40%;
  width: 50%;
`;
const StWrapper = styled.div`
display: flex;
width: 40%   ;
height: 600px;
border-radius: 12px;
box-shadow: 2px 2px 6px #333;
padding: 5px;
flex-direction: column;
gap: 10px;
`
const StMsgContainer = styled.div`
  display: flex;
  width: 100%;
  height: 90%;
  overflow: auto;
  background-color: white;
  border-radius: 6px;
  border: 1px solid #ccc;
  flex-direction: column;
  justify-content: flex-end;
  padding:10px;
  gap:10px
`
const StBtnContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`