import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import DropdownPlayerCount from "../../../components/common/elements/DropDownPlayerCount";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { RoomAPI } from "../../../api/axios";
import { queryKeys } from "../../../helpers/queryKeys";

const ModalCreateRoom = ({ children, modal, closeModal }) => {
  const styles = { modal };
  const queryClient = useQueryClient();
  const [roomName, setRoomName] = useState("");
  const [maxMembers, setMaxMembers] = useState(0);
  const [password, setPassword] = useState("");

  const { mutate: createRoom } = useMutation(
    async () => {
      const roomData = { roomName, maxMembers, password };
      const { data } = await RoomAPI.postRoom(roomData);
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries([queryKeys.ROOM_LIST]);
        alert("최신화 완료");
      },
      onError: (error) => {
      },
    }
  );

  const handleRoomNameChange = (e) => {
    setRoomName(e.target.value);
  };
  const handleMaxMembersChange = (e) => {
    setMaxMembers(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    closeModal();
  };

  return (
    <>
      {ReactDOM.createPortal(
        <>
          <StModal {...styles}>
            {children}
            <StTopHeader>
              <h3>방만들기</h3>
            </StTopHeader>
            <StRoomName>
              <h4>방 제목</h4>
              <StRoomNameInput
                type="text"
                onChange={handleRoomNameChange}
              ></StRoomNameInput>
            </StRoomName>
            <StChangePlayerNumb>
              <StPlayerCount>인원설정</StPlayerCount>
              <DropdownPlayerCount onChange={handleMaxMembersChange} />
            </StChangePlayerNumb>
            <StSetPrivacy>
              <h4>공개설정</h4>
              <StCheckBoxes>
                <div>
                  <input
                    type="checkbox"
                    id="standby"
                    onChange={handlePasswordChange}
                  />
                  <label htmlFor="standby"> 공개</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="inGame"
                    onChange={handlePasswordChange}
                  />
                  <label htmlFor="standby"> 비공개</label>
                </div>
              </StCheckBoxes>
              <StInputPassword type="text"></StInputPassword>
            </StSetPrivacy>
            <StBtnRoom>
              <button {...styles} onClick={closeModal}>
                취소
              </button>
              <button onClick={handleSubmit}>완료</button>
            </StBtnRoom>
          </StModal>
          <StBackDrop {...styles} onClick={closeModal}></StBackDrop>
        </>,
        document.getElementById("root")
      )}
    </>
  );
};

export default ModalCreateRoom;

const StModal = styled.div`
  position: fixed;
  top: 25%;
  left: 35%;
  z-index: 140;
  transform: translate(-50%, -50%);
  display: ${({ modal }) => {
    return modal ? "flex" : "none";
  }};
  width: 400px;
  height: 285px;
  background-color: white;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  border-radius: 12px;
  box-shadow: 2px 2px 6px black;
`;
const StBackDrop = styled.div`
  position: fixed;
  top: 0;
  z-index: 120;
  margin: 0;
  padding: 0;
  display: ${({ modal }) => {
    return modal ? "block" : "none";
  }};
  width: 100vw;
  height: 100vh;
  background-color: rgba(141, 141, 141, 0.8);
`;

const StTopHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 70px;
`;

const StRoomName = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  height: 50px;
`;

const StRoomNameInput = styled.input`
  width: 280px;
  height: 25px;
`;

const StChangePlayerNumb = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 50px;
`;
const StPlayerCount = styled.h4`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 88px;
  height: 100%;
  margin-left: 14px;
`;

const StSetPrivacy = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 50px;
  margin-left: 14px;
`;

const StCheckBoxes = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  width: 120px;
  height: 100%;
  margin-left: 30px;
  gap: 10px;
`;

const StInputPassword = styled.input`
  width: 80px;
  height: 25px;
`;

const StBtnRoom = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  width: 100%;
  height: 70px;
  gap: 18px;
`;
