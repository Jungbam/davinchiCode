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
            <StLabelWait htmlFor="standby"> 대기방</StLabelWait>
          </StOpenRoom>

          <StPrivateRoom>
            <input
              type="checkbox"
              id="privacyControl"
              checked={isPrivate}
              onChange={() => setIsPrivate(!isPrivate)}
            />
            <StLabelPrivate htmlFor="privacyControl"> 비공개</StLabelPrivate>
          </StPrivateRoom>
        </StFuncFront>
        <StFuncBack>
          <StDropDown>
            <Dropdown />
          </StDropDown>
          <StSearchBarStyle type="text" placeholder="방 제목을 입력해주세요" />
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
        <QuickStart>바로 시작</QuickStart>
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
  background-color: rgba(144,144,144,0.8);
`;

const StRoomHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 650px;
  height: 40px;
  background: #111111;
  border-radius: 12px 12px 0px 0px;
`;
const StRoomLists = styled.p`
  color: white;
  font-size: 20px;
  font-weight: bold;
`;
const StRoomFunc = styled.div`
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  align-items: center;
  height: 58px;
  background-color: #4a4a4a;
`;
const StFuncFront = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  background-color: #4a4a4a;
`;

const StOpenRoom = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 70px;
  height: 26px;
  padding: 4px;
  border: 1px solid black;
  border-radius: 4px;
  background-color: white;
  font-weight: bold;
  font-size: 14px;
  gap: 4px;
`;

const StLabelWait = styled.label``;

const StPrivateRoom = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 26px;
  padding: 4px;
  border: 1px solid black;
  border-radius: 4px;
  background-color: green;
  font-weight: bold;
  font-size: 14px;
  gap: 4px;
`;

const StLabelPrivate = styled.label``;
const StFuncBack = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const StDropDown = styled.div``;

const StSearchBarStyle = styled.input`
  width: 260px;
  height: 26px;
  border: 1px solid black;
  border-radius: 4px;
  background-color: #333333;
`;
const StRefreshBtn = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 82px;
  height: 26px;
  padding: 8px;
  border: 1px solid black;
  border-radius: 4px;
  background-color: #232323;
  color: white;
  font-size: 14px;
  font-weight: bold;
`;
const StBotButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 100px;
  border-top: 1px solid black;
  border-bottom-left-radius: 14px;
  border-bottom-right-radius: 14px;
  gap: 10px;
  background-color: #111111;
`;
const StCreateRoomBtn = styled.button`
  width: 130px;
  height: 44px;
  border-radius: 6px;
  font-weight: bold;
  background-color: #ffffff;
`;

export default RoomList;
