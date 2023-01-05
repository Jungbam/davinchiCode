import React, { useEffect, useRef, useState } from 'react'
import Peer from 'simple-peer';
import io from 'socket.io-client'
import styled from 'styled-components';
import Message from './Message';

const Chat = () => { // const {room} = useParams()
  // 채팅
  const room =3
  const [msg, setMsg] = useState('')
  const [msgList, setMsgList] = useState([])
  const [nickName, setNickName] = useState('')

  // peer.js로 화상 연결
  const [yourID, setYourID] = useState("");
  const [users, setUsers] = useState({});
  const [stream, setStream] = useState();
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);
  const userVideo = useRef();
  const partnerVideo = useRef();
  const socket = useRef();

  const createdAt = new Date().toLocaleString()
  
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

  useEffect(()=>{
    socket.current = io.connect("http://localhost:3001");
    socket.current.emit('join_room', room)
    //  socket.emit("nickname", nickName) // 카카오 닉네임으로 소켓 설정하기
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
        if (userVideo.current) userVideo.current.srcObject = stream;
      });
    socket.current.on("yourID", (id) => {
      setYourID(id);
    });
    socket.current.on("allUsers", (users) => {
      setUsers(users);
    });
    socket.current.on("hey", (data) => {
      setReceivingCall(true)
      setCaller(data.from)
      setCallerSignal(data.signal)
    });
    return () => {
      socket.current.disconnect();
    };
  }, [])

  function callPeer(id) {
    const peer = new Peer(
      {initiator : true,trickle : false,stream : stream}
    )
    peer.on('signal', data=>{
      socket.current.emit('callUser', {userToCall : id, signalData:data, from : yourID})
    })

    peer.on('stream', stream=>{
      partnerVideo.current.srcObject = stream
    })

    socket.current.on('callAccepted', signal =>{
      setCallAccepted(true)
      peer.signal(signal)
    })
  }

  function acceptCall() {
    setCallAccepted(true)
    const peer = new Peer({
      initiator:false, trickle:false, stream:stream
    })
    peer.on('signal', data=>{
      console.log(data)
      socket.current.emit('acceptCall', {signal:data,to:caller} 
      )})
    peer.on('stream', stream=>{
      partnerVideo.current.srcObject=stream
    })
    console.log(peer, callerSignal)
    peer.signal(callerSignal)
  }



  let incomingCall;
  if (receivingCall) {
    incomingCall = (
      <div>
        <h1>{caller} is calling you</h1>
        <button onClick={acceptCall}>Accept</button>
      </div>
    );
  }


  useEffect(()=>{
    socket.current.on('receive_message', (msg)=> {
      const myMsg = {msg, mine:false, createdAt}
      setMsgList(prev=>[...prev, myMsg])})
  },[socket])

  return (
    <>
    <div>
      <div>
        <video playsInline muted ref={userVideo} autoPlay />
        <video playsInline ref={partnerVideo} autoPlay />
      </div>
      <div>
        {Object.keys(users).map((key, i) => {
          if (key === yourID) {
            return null;
          }
          return (
            <button key={`rtcBtn${i}`} onClick={() => callPeer(key)}>
              Call {key}
            </button>
          );
        })}
      </div>
      <div>{incomingCall}</div>
    </div>
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