import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import LockOrUnLock from "./RoomLock";
import mockData from "./MockDataRoom";
import { useNavigate } from "react-router-dom";
import { queryKeys } from "../../../../helpers/queryKeys";

const RoomContents = (props) => {
  const navigate = useNavigate();

  const [isWaiting, setIsWaiting] = useState(props.isWaiting);
  const [isPrivate, setIsPrivate] = useState(props.isPrivate);

  useEffect(() => {
    props.handleCheckboxChange(isWaiting, isPrivate);
  }, [isWaiting, isPrivate]);

  const [roomId, setRoomId, error] = useState(1);
  const { data: rooms, status } = useQuery(
    [queryKeys.ROOM_LIST],
    async () => mockData.rooms
  );

  const handleEnterRoom = (roomId) => {
    navigate(`/game/${roomId}`);
  };

  return (
    <StRoomContentWrapper>
      {status === "loading" && <div>Loading...</div>}
      {status === "error" && <div>Error: {error.message}</div>}
      {status === "success" && (
        <>
          {rooms
            .filter(
              (room) =>
                (!isWaiting || room.isWaiting) && (!isPrivate || room.isPrivate)
            )
            .map((room) => (
              <StRoomMain key={room.roomId}>
                <StLock>
                  <LockOrUnLock locked={room.isPrivate} />
                </StLock>
                <StParticipants>
                  <StNumbParticipants>
                    {room.currentMembers}/{room.maxMembers}
                  </StNumbParticipants>
                </StParticipants>
                <StQueue>
                  <StWaitingOrNot>
                    {room.isWaiting ? "대기" : "게임중"}
                  </StWaitingOrNot>
                </StQueue>
                <StNumber>
                  <StRoomNumber>{room.roomId}</StRoomNumber>
                </StNumber>
                <StName>
                  <StRoomName>{room.roomName}</StRoomName>
                </StName>
                <StBtnEnter>
                  <StEnterGame onClick={() => handleEnterRoom(room.roomId)}>
                    입장
                  </StEnterGame>
                </StBtnEnter>
              </StRoomMain>
            ))}
        </>
      )}
    </StRoomContentWrapper>
  );
};

const StRoomContentWrapper = styled.div`
  width: 650px;
  height: 580px;
`;
const StRoomMain = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 640px;
  height: 44px;
  padding: 10px 18px;
  border: 1px solid #dedede;
  border-radius: 6px;
  gap: 50px;
  background: #ffffff;
`;

const StLock = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  width: 50px;
  height: 44px;
`;
const StParticipants = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  width: 30px;
  height: 44px;
`;
const StQueue = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  width: 80px;
  height: 44px;
`;
const StNumber = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  width: 50px;
  height: 44px;
`;
const StName = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  width: 380px;
  height: 44px;
`;
const StBtnEnter = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  width: 60px;
  height: 44px;
`;
const StNumbParticipants = styled.span``;
const StWaitingOrNot = styled.span``;
const StRoomNumber = styled.span``;
const StRoomName = styled.div``;
const StEnterGame = styled.button``;

export default RoomContents;
