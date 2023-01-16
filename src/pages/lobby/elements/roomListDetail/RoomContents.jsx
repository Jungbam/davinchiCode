// import React, { useState } from "react";
// import { useQuery } from "react-query";
// import styled from "styled-components";
// import LockOrUnLock from "./RoomLock";

// const RoomContents = (props) => {
//   const [roomId, setRoomId] = useState(1);
//   const {
//     data: roomData,
//     status,
//     error,
//   } = useQuery(["roomData", roomId], async () => {
//     const response = await axios.get(`https://your-api-url/rooms/${roomId}`);
//     const data = await response.json();
//     return data;
//   });

//   return (
//     <StRoomContentWrapper>
//       {status === "loading" && <div>Loading...</div>}
//       {status === "error" && <div>Error: {error.message}</div>}
//       {status === "success" && (
//         <StRoomMain>
//           <LockOrUnLock locked={roomData.isPrivate} />
//           <StNumbParticipants>
//             {roomData.currentMembers}/{roomData.maxMembers}
//           </StNumbParticipants>
//           <StWaitingOrNot>
//             {roomData.isWaiting ? "대기" : "준비"}
//           </StWaitingOrNot>
//           <StRoomNumber>{roomData.roomId}</StRoomNumber>
//           <StRoomName>{roomData.roomName}</StRoomName>
//           <StEnterGame>입장</StEnterGame>
//         </StRoomMain>
//       )}
//     </StRoomContentWrapper>
//   );
// };

import React, { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import LockOrUnLock from "./RoomLock";
import mockData from "./MockDataRoom";

const RoomContents = (props) => {
  const [roomId, setRoomId, error] = useState(1);
  const { data: rooms, status } = useQuery("rooms", async () => mockData.rooms);

  return (
    <StRoomContentWrapper>
      {status === "loading" && <div>Loading...</div>}
      {status === "error" && <div>Error: {error.message}</div>}
      {status === "success" && (
        <>
          {rooms.map((room) => (
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
                  {room.isWaiting ? "대기" : "준비"}
                </StWaitingOrNot>
              </StQueue>
              <StNumber>
                <StRoomNumber>{room.roomId}</StRoomNumber>
              </StNumber>
              <StName>
                <StRoomName>{room.roomName}</StRoomName>
              </StName>
              <StBtnEnter>
                <StEnterGame>입장</StEnterGame>
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

const StLock = styled.div``;
const StParticipants = styled.div``;
const StQueue = styled.div``;
const StNumber = styled.div``;
const StName = styled.div``;
const StBtnEnter = styled.div``;

//그다음할것
const StNumbParticipants = styled.span``;
const StWaitingOrNot = styled.span``;
const StRoomNumber = styled.span``;
const StRoomName = styled.div``;
const StEnterGame = styled.button``;

export default RoomContents;
