import React from "react";
import styled from "styled-components";
import Dropdown from "../../../components/common/elements/DropDown";
import RoomContents from "./roomListDetail/RoomContents";
import { useState } from "react";
import ModalCreateRoom from "./ModalCreateRoom";
import QuickStart from "./roomListDetail/RoomQuickStart";

const RoomList = () => {
  const [isWaiting, setIsWaiting] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false);
  const [showCreateRoom, setShowCreateRoom] = useState(false);

  const handleCheckboxChange = (isWaiting, isPrivate) => {
    setIsWaiting(isWaiting);
    setIsPrivate(isPrivate);
  };

  return (
    <StRoomWrapper>
      <StRoomHeader>
        <StRoomLists>방 리스트</StRoomLists>
      </StRoomHeader>
      <StRoomFunc>
        <StFuncFront>
          <StOpenRoom>
            <input
              type="checkbox"
              id="standby"
              checked={isWaiting}
              onChange={() => setIsWaiting(!isWaiting)}
            />
            <label htmlFor="standby"> 대기</label>
          </StOpenRoom>

          <StPrivateRoom>
            <input
              type="checkbox"
              id="privacyControl"
              checked={isPrivate}
              onChange={() => setIsPrivate(!isPrivate)}
            />
            <label htmlFor="privacyControl"> 비공개</label>
          </StPrivateRoom>
        </StFuncFront>
        <StFuncBack>
          <Dropdown />
          <StSearchBarStyle type="text" placeholder="Search.." />
          <StRefreshBtn type="submit">새로고침</StRefreshBtn>
        </StFuncBack>
      </StRoomFunc>
      <RoomContents
        handleCheckboxChange={handleCheckboxChange}
        isWaiting={isWaiting}
        isPrivate={isPrivate}
      />
      <StBotButtons>
        <StCreateRoomBtn onClick={() => setShowCreateRoom(true)}>
          방 만들기
        </StCreateRoomBtn>
        {showCreateRoom && (
          <ModalCreateRoom
            modal
            closeModal={() => {
              setShowCreateRoom(!showCreateRoom); // <- 이거를 내려받음 누구요
            }}
          ></ModalCreateRoom>
        )}
        <QuickStart>바로시작</QuickStart>
      </StBotButtons>
    </StRoomWrapper>
  );
};

const StRoomWrapper = styled.div`
  box-sizing: border-box;
  width: 650px;
  height: 766px;
  border: 1px solid black;
  border-radius: 12px;
`;

const StRoomHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 650px;
  height: 40px;
  background: #333333;
  border-radius: 12px 12px 0px 0px;
`;
const StRoomLists = styled.p`
  font-size: 20px;
  color: white;
`;
const StRoomFunc = styled.div`
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  align-items: center;

  height: 58px;
`;
const StFuncFront = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const StOpenRoom = styled.div`
  width: 70px;
  height: 26px;
  padding: 4px;
  border: 1px solid black;
  border-radius: 4px;
`;
const StPrivateRoom = styled.div`
  width: 80px;
  height: 26px;
  padding: 4px;
  border: 1px solid black;
  border-radius: 4px;
`;
const StFuncBack = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
`;

const StSearchBarStyle = styled.input`
  width: 200px;
  height: 34px;
`;
const StRefreshBtn = styled.button`
  width: 82px;
  height: 32px;
  border-radius: 4px;
`;
const StBotButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 88px;
  border-top: 1px solid black;
  gap: 10px;
`;
const StCreateRoomBtn = styled.button`
  width: 130px;
  height: 44px;
  border: 1px solid #222222;
  border-radius: 6px;
  opacity: 0.4;
`;

export default RoomList;
