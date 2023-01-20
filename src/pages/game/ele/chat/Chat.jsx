import React, { useState } from "react";
import styled from "styled-components";
import { eventName } from "../../../../helpers/eventName";
import Message from "./Message";
import { ICON } from "../../../Icons";

const Chat = ({ socket, roomID, msgList, setMsgList }) => {
  const [msg, setMsg] = useState("");

  const createdAt = new Date().toLocaleString();
  const addMyMessage = (msg) => {
    const myMsg = { msg, mine: true, createdAt };
    setMsgList((prev) => [...prev, myMsg]);
    setMsg("");
  };
  const sendMessage = (e) => {
    if (e.keyCode === 13) {
      socket?.current.emit(eventName.SEND_MESSAGE, msg, roomID, addMyMessage);
    }
  };
  const sendMessageBtn = (e) => {
    socket?.current.emit(eventName.SEND_MESSAGE, msg, roomID, addMyMessage);
  };

  return (
    <StWrapper>
      <StMsgContainer>
        {msgList?.map((el, i) => {
          return <Message key={`comment${i}`} msg={el} />;
        })}
      </StMsgContainer>
      <StBtnContainer>
        <StInputBox>
          <StInput
            type="text"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            placeholder="채팅을 시작해보세요!"
            onKeyUp={sendMessage}
          />
          <img onClick={sendMessageBtn} src={ICON.iconSend} alt="icon" />
        </StInputBox>
      </StBtnContainer>
    </StWrapper>
  );
};

export default Chat;

const StWrapper = styled.div`
  display: flex;
  height: 100%;
  width: 356px;
  background: #f8f8f8;
  border-radius: 10px;
  flex-direction: column;
`;
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
  gap: 10px;
`;

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
`;
const StInput = styled.input`
  border: none;
  font-size: 14px;
  font-weight: 500;
  width: 270px;
  color: #7a7a7a;
  &:focus {
    outline: none;
  }
`;
const StBtn = styled.button`
  width: 56px;
  height: 32px;
  background: #b5b5b5;
  border-radius: 3px;
`;

const StInputBox = styled.div`
  width: 336px;
  height: 40px;
  border-radius: 4px;
  border: none;
  font-size: 14px;
  font-weight: 500;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 14px;
  & img {
    cursor: pointer;
  }
`;
