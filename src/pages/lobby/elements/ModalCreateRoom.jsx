import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import DropdownPlayerCount from "../../../components/common/elements/DropDownPlayerCount";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { RoomAPI } from "../../../api/axios";
import { queryKeys } from "../../../helpers/queryKeys";
import exitModal from "../../../assets/icons/ico_modal_cancle.svg";
import { motion } from "framer-motion";

const buttonVariants = {
  hover: {
    scale: 1.1,
    textShadow: "0px 0px 8px rgb(255,255,255)",
    boxShadow: "0px 0px 8px rgb(255,255,255)",
    transition: {
      duration: 0.3,
    },
  },
};

const ModalCreateRoom = ({ children, modal, closeModal }) => {
  const styles = { modal };
  const queryClient = useQueryClient();
  // State to store the form data
  const [roomName, setRoomName] = useState("");
  const [maxMembers, setMaxMembers] = useState(0);
  const [password, setPassword] = useState("");

  // Mutation function to send the POST request
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
        console.log(error);
      },
    }
  );

  // Handle the form input changes
  const handleRoomNameChange = (e) => {
    setRoomName(e.target.value);
  };
  const handleMaxMembersChange = (e) => {
    setMaxMembers(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // Handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Send the POST request with the form data
    await createRoom();
    // Close the modal
    closeModal();
  };

  return (
    <>
      {ReactDOM.createPortal(
        <>
          <StModal {...styles}>
            <StBtnArea>
              <StExitBtn
                variants={buttonVariants}
                whileHover="hover"
                onClick={closeModal}
                src={exitModal}
              />
            </StBtnArea>
            <StHeadText>방 만들기</StHeadText>
            <StRoomName>
              <label>방 제목</label>
              <input
                type="text"
                placeholder="초보자 환영! 같이 배우면서 즐겨요."
              />
            </StRoomName>
            <StSettingRoom>
              <Sta>
                <label>인원설정</label>
                <select>
                  <option>4명</option>
                  <option>3명</option>
                  <option>2명</option>
                </select>
              </Sta>
              <Stb>
                <label>공개설정</label>
                <StOpen>
                  <input type="checkbox" />
                  <div>공개</div>
                </StOpen>
              </Stb>
              <StIsSecret>
                <input type="checkbox" />
                <div>비공개</div>
                <input type="text" placeholder="0000" maxLength={4} />
              </StIsSecret>
            </StSettingRoom>
            <StSecretDesc>비밀번호 숫자 4자리 입력</StSecretDesc>
            <StBtnList>
              <StButton color="#fff" onClick={closeModal}>
                취소
              </StButton>
              <StButton color="#ffdf24">확인</StButton>
            </StBtnList>
            {/* 
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
            </StBtnRoom> */}
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
  top: 50%;
  left: 50%;
  z-index: 140;
  transform: translate(-50%, -50%);
  display: ${({ modal }) => {
    return modal ? "flex" : "none";
  }};
  width: 440px;
  height: 327px;

  background-color: #ffffff;
  border: 1px solid #bbbbbb;
  border-radius: 6px;
  flex-direction: column;
  align-items: center;
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
  background-color: rgba(0, 0, 0, 0.5);
`;

const StExitBtn = styled(motion.img)`
  display: absolute;
  cursor: pointer;
`;

const StBtnArea = styled.div`
  padding: 16px;
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const StHeadText = styled.div`
  width: 114px;
  height: 32px;
  text-align: center;
  font-weight: 700;
  font-size: 20px;
  line-height: 20px;
  margin-top: 20px;
`;

const StRoomName = styled.div`
  width: 320px;
  height: 65px;
  margin-top: 24px;

  & label {
    font-weight: 700;
    font-size: 12px;
    line-height: 14px;
  }
  & input {
    margin-top: 6px;
    width: 320px;
    height: 40px;
    border: 1px solid #dddddd;
    border-radius: 4px;
    background-color: #f9f9f9;
    padding-left: 14px;

    font-weight: 500;
    font-size: 14px;
    line-height: 14px;
  }
  & input:focus {
    outline: none;
  }
`;

const StBtnList = styled.div`
  width: 206px;
  height: 32px;
  display: flex;
  justify-content: space-between;
  margin-top: 34px;
`;

const StButton = styled.div`
  width: 100px;
  height: 32px;
  background: ${({ color }) => color};
  border: 1px solid #000000;
  box-shadow: 0px 3px 0px #000000;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  font-weight: 700;
  font-size: 14px;
  line-height: 100%;
`;

const StSettingRoom = styled.div`
  margin-top: 8px;
  width: 320px;
  height: 60px;
  display: flex;
`;

const Sta = styled.div`
  width: 70px;
  height: 60px;
  margin-right: 30px;
  & label {
    font-weight: 700;
    font-size: 12px;
    line-height: 14px;
  }
  & select {
    margin-top: 4px;
    width: 100%;
    height: 40px;
    border: 1px solid #dddddd;
    border-radius: 4px;
    background-color: #f9f9f9;
    padding-left: 14px;

    font-weight: 500;
    font-size: 14px;
    line-height: 14px;
  }
`;

const Stb = styled.div`
  width: 70px;
  height: 60px;
  margin-right: 6px;
  & label {
    font-weight: 700;
    font-size: 12px;
    line-height: 14px;
  }
  & select {
    margin-top: 4px;
    width: 100%;
    height: 40px;
    border: 1px solid #dddddd;
    border-radius: 4px;
    background-color: #f9f9f9;
    padding-left: 14px;

    font-weight: 500;
    font-size: 14px;
    line-height: 14px;
  }
`;

const StOpen = styled.div`
  margin-top: 4px;
  width: 74px;
  height: 40px;
  border: 1px solid #dddddd;
  border-radius: 4px;
  background-color: #f9f9f9;
  font-weight: 500;
  font-size: 14px;
  line-height: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2px;
  & input {
    width: 13px;
    height: 13px;
  }
  & div {
    font-weight: 500;
    font-size: 14px;
    line-height: 14px;
  }
`;

const StIsSecret = styled.div`
  width: 140px;
  height: 40px;
  background-color: #f9f9f9;
  border: 1px solid #dddddd;
  border-radius: 4px;
  margin-top: 23px;
  padding: 0 14px;
  font-weight: 500;
  font-size: 14px;
  line-height: 14px;

  display: flex;

  margin-left: 5px;

  align-items: center;
  & input:focus {
    outline: none;
  }
  & input[type="checkbox"] {
    margin-right: 2px;
  }
  & input[type="text"] {
    width: 52px;
    height: 14px;
    font-weight: 500;
    font-size: 14px;
    line-height: 14px;
    padding-left: 8.5px;
    border: none;
    background-color: #f9f9f9;
    font-family: "Pretendard Variable";
    font-style: normal;
  }
`;

const StSecretDesc = styled.div`
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;
  display: flex;
  justify-content: flex-end;
  width: 320px;
  margin-top: 7px;
  color: #777;
`;
///@@
const StTopHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 70px;
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
