import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import mockData from "./MockDataRoom";
import { useNavigate } from "react-router-dom";
import { queryKeys } from "../../../../helpers/queryKeys";
import DisabledImage from "../../../../assets/images/lobby_disabled_room.png";
import { motion } from "framer-motion";
import { ICON } from "../../../../helpers/Icons";
const RoomContents = ({ isWaiting, isPrivate }) => {
  const navigate = useNavigate();

  const { data: rooms, status } = useQuery(
    [queryKeys.ROOM_LIST],
    async () => mockData.rooms
  );

  const handleEnterRoom = (roomId) => {
    navigate(`/game/${roomId}`);
  };

  return (
    <StWrapper>
      {status === "loading" && <div>Loading...</div>}
      {status === "success" && (
        <>
          {rooms
            .filter(
              (room) =>
                (!isWaiting || room.isWaiting) && (!isPrivate || room.isPrivate)
            )
            .map((room, i) => (
              <StContainer
                key={`roomList${i}`}
                iswaiting={room.isWaiting.toString()}
              >
                <StLeft>
                  <StButton>
                    {room.currentMembers}/{room.maxMembers}
                  </StButton>
                  <StButton color="#00831D">
                    {room.isWaiting ? "대기" : "진행"}
                  </StButton>
                  <div>
                    <img
                      src={room.isPrivate ? ICON.iconLock : ICON.iconUnlock} alt="공개설정"
                    />
                  </div>
                </StLeft>
                <StMiddle>
                  <StRoomNum>{room.roomId}</StRoomNum>
                  <StRoomName>{room.roomName}</StRoomName>
                </StMiddle>

                {room.isWaiting ? (
                  <StEnterRoom
                    onClick={() => handleEnterRoom(room.roomId)}
                    disabled={!room.isWaiting.toString()}
                    iswaiting={room.isWaiting.toString()}
                    whileHover={{
                      color: "#fff",
                      backgroundColor: "#000",
                      scale: 1.1,
                    }}
                    transition={{ type: "spring" }}
                  >
                    입장
                  </StEnterRoom>
                ) : (
                  <StEnterRoom
                    disabled={!room.isWaiting.toString()}
                    iswaiting={room.isWaiting.toString()}
                  >
                    입장
                  </StEnterRoom>
                )}
              </StContainer>
            ))}
        </>
      )}
    </StWrapper>
  );
};

const StWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  gap: 4px;
  padding: 20px 14px;
`;

const StContainer = styled.div`
  width: 608px;
  height: 46px;
  background: ${(props) =>
    props.iswaiting === "true" ? "#fff" : `url(${DisabledImage})`};
  background-size: cover;
  border: 1px solid #bcbcbc;
  border-radius: 6px;
  padding: 10px 18px;
  display: flex;
  align-items: center;
`;

const StLeft = styled.div`
  width: 94px;
  height: 20px;

  display: flex;
  gap: 4px;
`;

const StButton = styled.div`
  width: 34px;
  height: 20px;

  border: 1px solid ${({ color }) => color || "#111"};
  color: ${({ color }) => color || "#111"};
  border-radius: 999px;

  display: flex;
  justify-content: center;
  align-items: center;

  font-weight: 500;
  font-size: 10px;
  line-height: 12px;
`;

const StMiddle = styled.div`
  width: 380px;
  display: flex;
  gap: 30px;

  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  display: flex;
  align-items: center;

  color: #000000;

  margin-left: 30px;
`;

const StEnterRoom = styled(motion.button)`
  width: 48px;
  height: 26px;
  border-radius: 4px;
  border: solid 1px ${(props) => (props.iswaiting === "true" ? "#000" : "#aaa")};

  font-size: 12px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  text-align: left;
  color: #222;

  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 50px;

  cursor: ${(props) => (props.disabled ? "default" : "pointer")};
`;

const StRoomNum = styled.div`
  width: 30px;
  height: 16px;

  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  display: flex;
  align-items: center;

  color: #000000;
`;

const StRoomName = styled.div`
  width: 270px;
  height: 16px;
`;

export default RoomContents;
