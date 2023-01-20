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
                <StRoomFirst>
                  <StParticipants>
                    <StNumbParticipants>
                      {room.currentMembers}/{room.maxMembers}
                    </StNumbParticipants>
                  </StParticipants>
                  <StQueue>
                    <StWaitingOrNot>
                      {room.isWaiting ? "대기" : "진행"}
                    </StWaitingOrNot>
                  </StQueue>
                  <StLock>
                    <LockOrUnLock locked={room.isPrivate} />
                  </StLock>
                </StRoomFirst>
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 650px;
  height: 570px;
  margin-top: 10px;
  gap: 6px;
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
  gap: 10px;
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
  width: 80px;
  height: 44px;
`;
const StName = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: flex-start;
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
const StNumbParticipants = styled.span`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  width: 50px;
  height: 26px;
  padding: 6px;
  border: 1px solid black;
  border-radius: 14px;
  font-size: 12px;
  font-weight: bold;
  color: black;
`;
const StWaitingOrNot = styled.span`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  width: 50px;
  height: 26px;
  padding: 6px;
  border: 1px solid green;
  border-radius: 14px;
  font-size: 12px;
  font-weight: bold;
  color: green;
`;

const StRoomFirst = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  width: 150px;
  height: 26px;
`;
const StRoomNumber = styled.span``;
const StRoomName = styled.div``;
const StEnterGame = styled.button`
  width: 60px;
  padding: 6px;
  background-color: white;
  font-size: 14px;
  font-weight: bold;
`;

export default RoomContents;
