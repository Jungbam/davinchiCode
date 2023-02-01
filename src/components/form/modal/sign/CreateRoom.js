import React from "react";

import styled from "styled-components";
import DropdownPlayerCount from "../../../common/elements/DropDownPlayerCount";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { RoomAPI } from "../../../../api/axios";

import { useNavigate } from "react-router-dom";
import { ICON } from "../../../../helpers/Icons";

const CreateRoom = ({ closeModal, modal }) => {
  const navigate = useNavigate();
  const [roomName, setRoomName] = useState("");
  const [maxMembers, setMaxMembers] = useState("4명");
  const [isSecret, setIsSecret] = useState(false);
  const [password, setPassword] = useState("");
  const [roomModal, setRoomModal] = useState(false);

  const roomMembersHandler = (num) => {
    setMaxMembers(num);
    setRoomModal((prev) => !prev);
  };

  const passwordChecked =
    (!isSecret || password.length === 4) && roomName !== "";

  const { mutate: createRoom } = useMutation(
    () => RoomAPI.postRoom({ roomName, maxMembers, password }),
    {
      onSuccess: ({ data }) => {
        navigate(`/game/${data.roomId}`);
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  const createRoomHandler = () => {
    createRoom();
  };

  return (
    <StWrapper>
      <StHeadText>방 만들기</StHeadText>
      <StRoomName>
        <label>방 제목</label>
        <input
          type="text"
          placeholder="초보자 환영! 같이 배우면서 즐겨요."
          onChange={(e) => setRoomName(e.target.value)}
          value={roomName}
        />
      </StRoomName>
      <StSettingRoom>
        <Sta>
          <label>인원설정</label>
          <StModalOpener
            onClick={() => {
              setRoomModal((prev) => !prev);
            }}
          >
            <span>{maxMembers}</span>
            <img src={ICON.iconDropDown} />
          </StModalOpener>
          <StModal roomModal={roomModal}>
            {["2명", "3명", "4명"].map((el, i) => (
              <button
                key={`roomMembers${i}`}
                onClick={() => roomMembersHandler(el)}
              >
                <span>{el}</span>
              </button>
            ))}
          </StModal>
        </Sta>
        <Stb>
          <label>공개설정</label>
          <StOpen>
            <input
              type="checkbox"
              checked={!isSecret}
              onChange={() => {
                setIsSecret(!isSecret);
                setPassword("");
              }}
            />
            <div>공개</div>
          </StOpen>
        </Stb>
        <StIsSecret>
          <input
            type="checkbox"
            checked={isSecret}
            onChange={() => setIsSecret(!isSecret)}
          />
          <div>비공개</div>
          <input
            type="text"
            placeholder="0000"
            value={password}
            disabled={!isSecret}
            maxLength={4}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </StIsSecret>
      </StSettingRoom>
      <StSecretDesc>비밀번호 숫자 4자리 입력</StSecretDesc>
      <StBtnList>
        <StButton color="#fff" onClick={closeModal}>
          취소
        </StButton>
        <StCheckBtn
          passwordChecked={passwordChecked.toString()}
          disabled={!passwordChecked}
          onClick={createRoomHandler}
        >
          확인
        </StCheckBtn>
      </StBtnList>
    </StWrapper>
  );
};

export default CreateRoom;

const StWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
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

const StCheckBtn = styled.div`
  width: 100px;
  height: 32px;
  background: ${({ passwordChecked }) =>
    passwordChecked === "true" ? "#ffdf24" : "#DDDDDD;"};
  border: 1px solid #000000;
  box-shadow: 0px 3px 0px #000000;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: ${({ passwordChecked }) =>
    passwordChecked === "true" ? "pointer" : "default"};

  color: ${({ passwordChecked }) =>
    passwordChecked === "true" ? "#111" : "#616161"};

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
`;

const StModalOpener = styled.button`
  margin-top: 4px;
  width: 100%;
  height: 40px;
  border: 1px solid #dddddd;
  border-radius: 4px;
  background-color: #f9f9f9;

  font-weight: 500;
  font-size: 14px;
  line-height: 14px;

  display: flex;
  justify-content: flex-end;
  align-items: center;
  & span {
    margin-right: 10px;
  }
`;

const StModal = styled.div`
  display: ${({ roomModal }) => (roomModal ? "flex" : "none")};
  flex-direction: column;
  z-index: 100000;
  position: relative;
  & button {
    margin-top: 4px;
    width: 100%;
    height: 35px;
    border: 1px solid #dddddd;
    border-radius: 2px;
    background-color: #f9f9f9;

    font-weight: 500;
    font-size: 14px;
    line-height: 14px;
    padding-left: 13px;
    margin: 0;
    display: flex;
    align-items: center;
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
    padding-left: 5px;
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
