import styled from "styled-components";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { queryKeys } from "../../../../helpers/queryKeys";
import DisabledImage from "../../../../assets/images/lobby_disabled_room.png";
import { motion } from "framer-motion";
import { ICON } from "../../../../helpers/Icons";
import { useState } from "react";
import { RoomAPI } from "../../../../api/axios";
import { BootStrap } from "../../../BootStrap";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Moddal from "../../../../components/form/modal/Moddal";

const RoomContents = ({
  isWaiting,
  isPrivate,
  currentPage,
  setTotalPage,
  search,
  searchType,
  roomsData,
  setRoomsData,
}) => {
  const [modal, setModal] = useState(false);
  const [inRoom, setInRoom] = useState(0);
  const [passwordError, setPasswordError] = useState("");
  const [inRoomPrivate, setInRoomPrivate] = useState(false);
  const [password, setPassword] = useState("");
  const { reFetch } = useSelector((state) => state.signSlice);
  const { StBtn, StWrapper } = BootStrap;
  const navigate = useNavigate();

  const { status } = useQuery(
    [queryKeys.ROOM_LIST, currentPage],
    () => RoomAPI.searchRoom({ currentPage, search, searchType }),
    {
      keepPreviousData: true,
      onSuccess: (data) => {
        setTotalPage((prev) => data.data.totalPage);
        setRoomsData(data.data.rooms);
      },
      onError: () => navigate("/error"),
    }
  );
  const enterInRoomHandler = (roomId, isPrivate) => {
    setModal(true);
    setInRoomPrivate(isPrivate);
    setInRoom(roomId);
  };
  const closeModalHandler = () => {
    setModal(false);
    setPassword("");
    setInRoom(0);
    setPasswordError("");
  };
  const { mutate: enterRoom } = useMutation(
    () => RoomAPI.inRoom(inRoom, password),
    {
      onSuccess: (data) => {
        switch (data.data.code) {
          case 1:
            navigate(`/game/${inRoom}`);
            break;
          case 101:
            setPasswordError("방이 없습니다.");
            break;
          case 102:
            setPasswordError("방의 인원이 꽉 차 입장이 불가합니다.");
            break;
          case 103:
            setPasswordError("게임이 이미 시작되었습니다.");
            break;
          case 104:
            setPasswordError("비밀번호가 일치하지 않습니다.");
            break;
          default:
            break;
        }
      },
      onError: (error) => {
        alert("방 입장 에러");
        navigate("/lobby");
      },
    }
  );
  useEffect(() => {}, [reFetch]);
  return (
    <>
      <StWrapper jus="flex-start" padding="7px 0">
        {status === "loading" && <div>Loading...</div>}
        {status === "success" && (
          <>
            {roomsData
              ?.filter(
                (room) =>
                  (!isWaiting || !room.isPlaying) &&
                  (!isPrivate || room.isPrivate)
              )
              .map((room, i) => (
                <StContainer
                  key={`roomList${i}`}
                  iswaiting={(
                    room.isPlaying || room.currentMembers === room.maxMembers
                  ).toString()}
                >
                  <StLeft>
                    <StButton
                      isplaying={
                        room.isPlaying ||
                        room.currentMembers === room.maxMembers
                      }
                      color="#111"
                    >
                      {room.currentMembers}/{room.maxMembers}
                    </StButton>
                    <StButton
                      isplaying={
                        room.isPlaying ||
                        room.currentMembers === room.maxMembers
                      }
                      color="#00831D"
                    >
                      {room.isPlaying ? "진행" : "대기"}
                    </StButton>
                    <div>
                      <img
                        src={room.isPrivate ? ICON.iconLock : ICON.iconUnlock}
                        alt="공개설정"
                      />
                    </div>
                  </StLeft>
                  <StMiddle
                    isplaying={
                      room.isPlaying || room.currentMembers === room.maxMembers
                    }
                  >
                    <StRoomNum>{room.roomId}</StRoomNum>
                    <StRoomName> {room.roomName}</StRoomName>
                  </StMiddle>

                  {!(
                    room.isPlaying || room.currentMembers === room.maxMembers
                  ) ? (
                    <StEnterRoom
                      onClick={() =>
                        enterInRoomHandler(room.roomId, room.isPrivate)
                      }
                      disabled={
                        room.isPlaying ||
                        room.currentMembers === room.maxMembers
                      }
                      isplaying={(
                        room.isPlaying ||
                        room.currentMembers === room.maxMembers
                      ).toString()}
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
                      disabled={
                        room.isPlaying ||
                        room.currentMembers === room.maxMembers
                      }
                      isplaying={(
                        room.isPlaying ||
                        room.currentMembers === room.maxMembers
                      ).toString()}
                    >
                      입장
                    </StEnterRoom>
                  )}
                </StContainer>
              ))}
          </>
        )}
      </StWrapper>
      {inRoomPrivate ? (
        <Moddal
          width="288px"
          height="200px"
          closeModal={closeModalHandler}
          modal={modal}
        >
          <StWrapper>
            <StDiv>게임방에 입장하시겠습니까?</StDiv>
            <StInputPass
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <StDesc>비밀번호 숫자 4자리 입력</StDesc>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                height: "18px",
                color: "#bd1010",
                fontSize: "12px",
              }}
            >
              {passwordError}
            </div>
            <StBtnBox>
              <StBtn
                color="#fff"
                width="100px"
                height="32px"
                fontSize="14px"
                onClick={closeModalHandler}
              >
                취소
              </StBtn>
              <StBtn
                color="#ffdf24"
                width="100px"
                height="32px"
                fontSize="14px"
                onClick={() => {
                  setPasswordError("");
                  enterRoom();
                }}
              >
                확인
              </StBtn>
            </StBtnBox>
          </StWrapper>
        </Moddal>
      ) : (
        <Moddal
          width="288px"
          height="160px"
          closeModal={closeModalHandler}
          modal={modal}
        >
          <StWrapper>
            <StDiv mgtop="45px">게임방에 입장하시겠습니까?</StDiv>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                height: "18px",
                color: "#bd1010",
                fontSize: "12px",
              }}
            >
              {passwordError}
            </div>
            <StBtnBox mgtop="6px">
              <StBtn
                color="#fff"
                width="100px"
                height="32px"
                fontSize="14px"
                onClick={closeModalHandler}
              >
                취소
              </StBtn>
              <StBtn
                color="#ffdf24"
                width="100px"
                height="32px"
                fontSize="14px"
                onClick={() => {
                  setPasswordError("");
                  enterRoom();
                }}
              >
                확인
              </StBtn>
            </StBtnBox>
          </StWrapper>
        </Moddal>
      )}
    </>
  );
};

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
  border: 1px solid ${({ isplaying, color }) => (isplaying ? "#666" : color)};
  color: ${({ isplaying, color }) => (isplaying ? "#666" : color)};
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
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  font-size: 14px;
  line-height: 17px;
  display: flex;
  align-items: center;
  color: ${({ isplaying }) => (isplaying ? "#666" : "#111")};
  margin-left: 30px;
`;

const StEnterRoom = styled(motion.button)`
  width: 48px;
  height: 26px;
  border-radius: 4px;
  border: solid 1px ${(props) => (props.isplaying === "true" ? "#888" : "#000")};
  font-size: 12px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  text-align: left;
  color: ${(props) => (props.isplaying === "true" ? "#888" : "#000")};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 50px;
  cursor: ${(props) => (props.isplaying === "true" ? "default" : "pointer")};
`;

const StRoomNum = styled.div`
  width: 50px;
  height: 16px;
`;

const StInputPass = styled.input`
  width: 140px;
  height: 40px;
  border-radius: 4px;
  border: solid 1px #ddd;
  background-color: #f9f9f9;
  font-size: 16px;
  font-weight: 500;
  color: #000;
  display: flex;
  text-align: center;
  margin-top: 4px;
  &:focus {
    outline: none;
  }
`;

const StBtnBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  margin-top: ${({ mgtop }) => mgtop || "10px"};
`;

const StRoomName = styled.div`
  width: 270px;
  height: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StDiv = styled.div`
  font-size: 16px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  margin-top: ${({ mgtop }) => mgtop || "25px"};
`;

const StDesc = styled.div`
  font-size: 12px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.17;
  letter-spacing: normal;
  text-align: left;
  color: #777;
`;
export default RoomContents;
