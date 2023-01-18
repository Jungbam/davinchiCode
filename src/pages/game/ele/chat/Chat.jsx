import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { socket } from '../../../../helpers/socket';
import Message from './Message';


const Chat = (roomID) => { // const {room} = useParams()
  const [msg, setMsg] = useState('')
  const [msgList, setMsgList] = useState([])

  const createdAt = new Date().toLocaleString()

  const addMyMessage=(msg)=>{
    const myMsg = {msg, mine:true, createdAt}
    setMsgList((prev) => [...prev, myMsg]);
    setMsg('')
  }
  const sendMessage = (e) => {
    if(e.keyCode===13){
      socket.emit("send_message", msg, roomID,addMyMessage);
    }
  };
  const sendMessageBtn = (e) => {
      socket.emit("send_message",msg, roomID,addMyMessage);
  };

  useEffect(()=>{
    return () => {
      socket.disconnect();
    };
  }, [])

  useEffect(()=>{
    socket.on('receive_message', (msg)=> {
      console.log('in')
      const myMsg = {msg, mine:false, createdAt}
      setMsgList(prev=>[...prev, myMsg])})
  },[socket])

  return (
  
    <StWrapper>
      <StTop></StTop>
      <StMsgContainer>
      {msgList?.map((el,i)=>{
        return <Message key={`comment${i}`}msg={el}/>
      })}
      </StMsgContainer>
      <StBtnContainer>
        <StInput type='text' value={msg} onChange={(e)=>setMsg(e.target.value)} placeholder='메시지를 입력하세요.' onKeyUp={sendMessage}/>
        <StBtn onClick={sendMessageBtn}>Enter</StBtn>
      </StBtnContainer>
    </StWrapper>
  )
}

export default Chat

const StWrapper = styled.div`
  display: flex;
  width: 320px;
  height: 766px;
  background: #F8F8F8;
  border: 1px solid #E0E0E0;
  border-radius: 10px;
  flex-direction: column;
`
const StTop = styled.div`
  width: 320px;
  height: 40px;
  background: #333333;
  border-radius: 12px 12px 0px 0px;
`
const StMsgContainer = styled.div`
  display: flex;
  width: 100%;
  height: 85%;
  overflow: auto;
  background-color: white;
  border-radius: 6px;
  border: 1px solid #ccc;
  flex-direction: column;
  justify-content: flex-end;
  gap:10px;
  `

const StBtnContainer = styled.div`
  position: absolute;
  display: flex;
  width: 320px;
  height: 69px;
  bottom: 0;
  background: #E1E1E1;
  border-radius: 0px 0px 10px 10px;
  justify-content: center;
  align-items: center;
  gap: 10px;
`
const StInput = styled.input`
  width: 229px;
  height: 32px;
  background: #FBFBFB;
  border-radius: 3px;
`
const StBtn = styled.button`
  width: 56px;
  height: 32px;
  background: #B5B5B5;
  border-radius: 3px;
`