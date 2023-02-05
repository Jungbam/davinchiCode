import React, { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import styled from "styled-components";
import { eventName } from "../../../../helpers/eventName";
import { ICON } from "../../../../helpers/Icons";
import Message from "./Message";
const Chat = ({ socket, roomId, msgList, setMsgList }) => {
  const ref = useRef("");
  const [msg, setMsg] = useState("");

  const addMyMessage = (msg) => {
    const myMsg = { msg, mine: true };
    setMsgList((prev) => [...prev, myMsg]);
    setMsg("");
  };
  const sendMessage = (e) => {
    if (e.keyCode === 13) {
      if (msg === "") return;
      socket?.current.emit(eventName.SEND_MESSAGE, msg, roomId, addMyMessage);
    }
  };

  const sendMessageBtn = (e) => {
    if (msg === "") return;
    socket?.current.emit(eventName.SEND_MESSAGE, msg, roomId, addMyMessage);
  };

  useEffect(() => {
    ref.current.scrollTo(0, ref.current.scrollHeight);
  }, [msgList]);

  return (
    <StWrapper>
      <StMsgContainer ref={ref}>
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
            onKeyDown={sendMessage}
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
  width: 100%;
  height: 138px;
  background-color: white;
  border-radius: 6px 6px 0 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 20px 30px 10px 22px;
  overflow: scroll;
  justify-content: ${({ ref }) =>
    ref?.current.scrollHeight > 138 ? "row" : "flex-end"};
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
  color: #111;
  &:focus {
    outline: none;
  }
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
