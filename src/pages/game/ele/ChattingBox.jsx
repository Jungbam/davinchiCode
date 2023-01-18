import React from "react";
import styled from "styled-components";
import { ICON } from "../../Icons";

const ChattingBox = () => {
  return (
    <StWrapper>
      <StChat>
        <StChatting>
          <div>사용자1</div>
          <div>안녕하세요, 레디 부탁합니다</div>
        </StChatting>
        <StChatting>
          <div>사용자2</div>
          <div>넵 레디요~</div>
        </StChatting>
      </StChat>
      <StInputArea>
        <StInputBox>
          <StInput placeholder="채팅을 시작해보세요!" />
          <img src={ICON.iconSend} alt="icon" />
        </StInputBox>
      </StInputArea>
    </StWrapper>
  );
};

export default ChattingBox;

const StWrapper = styled.div`
  height: 100%;
  width: 356px;
  border-radius: 6px;
  border: 1px solid #111;
`;

const StChat = styled.div`
  background-color: #fff;
  width: 100%;
  height: 138px;
  border-radius: 6px 6px 0 0;
  padding: 9px 0 0 20px;
`;

const StInputArea = styled.div`
  background-color: #555;
  width: 100%;
  height: 62px;
  display: flex;
  gap: 4px;
  border-radius: 0 0 6px 6px;
  padding: 10px;
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

const StChatting = styled.div`
  font-size: 12px;
  & div:nth-child(1) {
    font-weight: 700;
    margin-bottom: 6px;
  }
  margin-bottom: 10px;
`;
