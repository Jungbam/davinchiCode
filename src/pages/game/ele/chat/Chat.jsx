import React, { useState } from 'react'
import styled from 'styled-components';
import { eventName } from '../../../../helpers/eventName';
import Message from './Message';

const Chat = ({socket,roomID,msgList,setMsgList}) => {
  const [msg, setMsg] = useState('')

  const createdAt = new Date().toLocaleString()
  const addMyMessage=(msg)=>{
    const myMsg = {msg, mine:true, createdAt}
    setMsgList((prev) => [...prev, myMsg]);
    setMsg('')
  }
  const sendMessage = (e) => {
    if(e.keyCode===13){
      socket?.current.emit(eventName.SEND_MESSAGE, msg, roomID,addMyMessage);
    }
  };
  const sendMessageBtn = (e) => {
      socket?.current.emit(eventName.SEND_MESSAGE,msg, roomID,addMyMessage);
  };

  return (
  
    <StWrapper>
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
  height: 100%;
  width: 356px;
  background: #F8F8F8;
  border-radius: 10px;
  flex-direction: column;
`
const StMsgContainer = styled.div`
  display: flex;
  width: 100%;
  height: 138px;
  overflow: auto;
  background-color: white;
  border-radius: 6px 6px 0 0;
  padding: 9px 0 0 20px;
  flex-direction: column;
  justify-content: flex-end;
  gap:10px;
  `

const StBtnContainer = styled.div`
  display: flex;
  background-color: #555;
  width: 100%;
  height: 62px;
  display: flex;
  gap: 4px;
  border-radius: 0 0 6px 6px;
  display: flex;
  justify-content: space-between;
  padding: 10px;
`
const StInput = styled.input`
  width: 336px;
  height: 40px;
  border-radius: 4px;
  border: none;
  font-size: 14px;
  font-weight: 500;
  background: #FBFBFB;
  border-radius: 3px;
`
const StBtn = styled.button`
  width: 56px;
  height: 32px;
  background: #B5B5B5;
  border-radius: 3px;
`