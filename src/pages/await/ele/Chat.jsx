import React, { useEffect, useRef, useState } from 'react'
import Peer from 'simple-peer';
import io from 'socket.io-client'
import styled from 'styled-components';
import Message from './Message';
import Video from './Video';

const Chat = () => { // const {room} = useParams()
  const room =3
  const [msg, setMsg] = useState('')
  const [msgList, setMsgList] = useState([])
  const [nickName, setNickName] = useState('')
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
  useEffect(()=>{
    // 채팅
    socket.current = io.connect("http://localhost:3001");
    socket.current.emit('join_room', room)
    //  socket.emit("nickname", nickName) // 카카오 닉네임으로 소켓 설정하기

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