import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import mockData from "./MockDataRoom";
import { useNavigate } from "react-router-dom";
import { queryKeys } from "../../../../helpers/queryKeys";
import DisabledImage from "../../../../assets/images/lobby_disabled_room.png";
import { motion } from "framer-motion";
import { ICON } from "../../../../helpers/Icons";
import axios from "axios";
import { useEffect } from "react";

const RoomContents = ({ isWaiting, isPrivate, currentPage, setTotalPage }) => {
  const navigate = useNavigate();

  // const { data: rooms, status } = useQuery(
  //   [queryKeys.ROOM_LIST],
  //   async () => mockData.rooms,
  //   {
  //     staleTime: 2000,
  //     keepPreviousData: true,
  //   }
  // );
  const { data, status } = useQuery(
    ["posts", currentPage],
    async () =>
      axios.get(`https://game.davinci-code.online/rooms?page=${currentPage}`),
    {
      staleTime: 2000,
      keepPreviousData: true,
    }
  );
  useEffect(() => {
    if (data !== undefined) {
      setTotalPage(data.data.totalPage);
    }
  }, []);
  // const fetchPosts = async (pageNum) => {
  //   console.log("fetchPosts", pageNum);
  //   await axios.get(`https://game.davinci-code.online/rooms?page=${pageNum}`);
  // };

  // const { data, status } = useQuery(["fff"], () => fetchPosts(currentPage), {
  //   keepPreviousData: true,
  // });

  const handleEnterRoom = (roomId) => {
    navigate(`/game/${roomId}`);
  };

  console.log(data);

  return (
    <StWrapper>
      {status === "loading" && <div>Loading...</div>}
      {status === "success" && (
        <>
          {data?.data.rooms
            .filter(
              (room) =>
                (!isWaiting || room.isPlaying) && (!isPrivate || room.isPrivate)
            )
            .map((room, i) => (
              <StContainer
                key={`roomList${i}`}
                iswaiting={room.isPlaying.toString()}
              >
                <StLeft>
                  <StButton>
                    {room.currentMembers}/{room.maxMembers}
                  </StButton>
                  <StButton color="#00831D">
                    {room.isPlaying ? "진행" : "대기"}
                  </StButton>
                  <div>
                    <img
                      src={room.isPrivate ? ICON.iconLock : ICON.iconUnlock}
                      alt="공개설정"
                    />
                  </div>
                </StLeft>
                <StMiddle>
                  <StRoomNum>{room.roomId}</StRoomNum>
                  <StRoomName>{room.roomName}</StRoomName>
                </StMiddle>

                {!room.isPlaying ? (
                  <StEnterRoom
                    onClick={() => handleEnterRoom(room.roomId)}
                    disabled={room.isPlaying}
                    isplaying={room.isPlaying.toString()}
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
                    disabled={room.isPlaying}
                    isplaying={room.isPlaying.toString()}
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
    props.iswaiting === "true" ? `url(${DisabledImage})` : "#fff"};
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
  border: solid 1px ${(props) => (props.isplaying === "true" ? "#eee" : "#000")};

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

  cursor: ${(props) => (props.isplaying === "true" ? "default" : "pointer")};
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
