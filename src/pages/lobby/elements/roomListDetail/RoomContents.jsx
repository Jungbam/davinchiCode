import styled from "styled-components";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { queryKeys } from "../../../../helpers/queryKeys";
import DisabledImage from "../../../../assets/images/lobby_disabled_room.png";
import { motion } from "framer-motion";
import { ICON } from "../../../../helpers/Icons";
import Modal from "../../../../components/form/modal/Modal";
import { useState } from "react";
import { RoomAPI } from "../../../../api/axios";
import { BootStrap } from "../../../BootStrap";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const RoomContents = ({ isWaiting, isPrivate, currentPage, setTotalPage }) => {
  const [modal, setModal] = useState(false);
  const [inRoom, setInRoom] = useState(0);
  const [inRoomPrivate, setInRoomPrivate] = useState(false);
  const [password, setPassword] = useState("");
  const { reFetch } = useSelector((state) => state.signSlice);
  const { StBtn, StWrapper } = BootStrap;
  const navigate = useNavigate();

  const { data, status } = useQuery(
    [queryKeys.ROOM_LIST, currentPage],
    () => RoomAPI.getRoom(currentPage),
    {
      keepPreviousData: true,
      onSuccess: (data) => {
        setTotalPage((prev) => data.data.totalPage);
      },
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
  };
  const { mutate } = useMutation(() => RoomAPI.inRoom(inRoom, password), {
    onSuccess: (data) => {
      if (data.status === 200) navigate(`/game/${inRoom}`);
    },
    onError: (error) => {
      // error에 대한 경우 처리
      alert("방 입장 에러");
      navigate("/");
    },
  });
  useEffect(() => {
    if (reFetch) {
    }
  }, [reFetch]);
  return (
    <>
      <StWrapper jus="flex-start" padding="20px 14px">
        {status === "loading" && <div>Loading...</div>}
        {status === "success" && (
          <>
            {data?.data.rooms
              .filter(
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
                    <StRoomName>{room.roomName}</StRoomName>
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
      <Modal
        width="288px"
        height="180px"
        modal={modal.toString()}
        closeModal={closeModalHandler}
      >
        <StWrapper jus="center" padding="10px">
          <p>{inRoom}번 방에 입장하시겠습니까?</p>
          {inRoomPrivate && (
            <StBtnBox>
              <label>비밀번호</label>
              <StInputPass
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></StInputPass>
            </StBtnBox>
          )}
          <StBtnBox>
            <StBtn
              color="#ffdf24"
              width="100px"
              height="32px"
              onClick={() => mutate()}
            >
              확인
            </StBtn>
            <StBtn
              color="#fff"
              width="100px"
              height="32px"
              onClick={closeModalHandler}
            >
              취소
            </StBtn>
          </StBtnBox>
        </StWrapper>
      </Modal>
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
  width: 60%;
  height: 30px;
  border-radius: 4px;
  padding: 12px 14px;
  border: solid 1px #ddd;
  background-color: #f9f9f9;
`;

const StBtnBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
`;

const StRoomName = styled.div`
  width: 270px;
  height: 16px;
`;

export default RoomContents;
