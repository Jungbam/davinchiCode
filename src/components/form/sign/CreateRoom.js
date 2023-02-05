import React, { useEffect, useRef } from "react";

import styled from "styled-components";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { RoomAPI } from "../../../api/axios";

import { useNavigate } from "react-router-dom";
import { ICON } from "../../../helpers/Icons";

const CreateRoom = ({ closeModal, modal }) => {
  const ref = useRef("");
  const navigate = useNavigate();
  const [roomName, setRoomName] = useState("");
  const [maxMembers, setMaxMembers] = useState(4);
  const [isSecret, setIsSecret] = useState(false);
  const [password, setPassword] = useState("");
  const [roomModal, setRoomModal] = useState(false);

  const roomMembersHandler = (num) => {
    setMaxMembers(num);
    setRoomModal((prev) => !prev);
  };

  const passwordChecked = !isSecret || password.length === 4;

  const { mutate: createRoom } = useMutation(
    (aa) => RoomAPI.postRoom({ roomName: aa, maxMembers, password }),
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
    const aa =
      roomName === ""
        ? [
            "초보자 환영! 같이 배우면서 즐겨요.",
            "우리 같이 게임해요",
            "한 수 가르쳐 주실 분?",
            "모두 덤벼 봐!",
            "너만 오면 바로 고!",
          ][Math.floor(Math.random() * 5)]
        : roomName;
    createRoom(aa);
  };

  useEffect(() => {
    if (isSecret) {
      ref.current.focus();
    }
  });

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
        <Sta mgRight="30px">
          <div>인원설정</div>
          <StModalOpener
            onClick={() => {
              setRoomModal((prev) => !prev);
            }}
          >
            <span>{maxMembers}명</span>
            <img src={ICON.iconDropDown} alt="드롭다운" />
          </StModalOpener>
          <StModal roomModal={roomModal}>
            {[2, 3, 4].map((el, i) => (
              <button
                key={`roomMembers${i}`}
                onClick={() => roomMembersHandler(el)}
              >
                <span>{el}명</span>
              </button>
            ))}
          </StModal>
        </Sta>
        <Sta mgRight="4px">
          <div>공개설정</div>
          <StOpen
            onClick={() => {
              setIsSecret(!isSecret);
              setPassword("");
            }}
          >
            <img
              src={isSecret ? ICON.iconCheckBoxBlank : ICON.iconCheckBoxChecked}
              width={16}
              alt="체크박스"
            />
            <div>공개</div>
          </StOpen>
        </Sta>
        <Sta>
          <div style={{ width: "64px", height: "14px" }}></div>
          <StIsSecret
            onClick={() => {
              if (isSecret) {
                setPassword("");
              }
              setIsSecret(!isSecret);
            }}
          >
            <img
              src={isSecret ? ICON.iconCheckBoxChecked : ICON.iconCheckBoxBlank}
              width={16}
              alt="체크박스"
            />
            <div>비공개</div>
            <input
              ref={ref}
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
        </Sta>
      </StSettingRoom>
      <StSecretDesc>비밀번호 숫자 4자리 입력</StSecretDesc>
      <StBtnList>
        <StButton color="#fff" onClick={closeModal}>
          취소
        </StButton>
        <StCheckBtn
          disabled={!passwordChecked}
          passwordChecked={passwordChecked.toString()}
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

const StCheckBtn = styled.button`
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
  margin-right: ${({ mgRight }) => mgRight};
  & div {
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
    height: 32px;
    border: 0.3px solid #dddddd;
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
  cursor: pointer;
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
  margin-top: 4px;
  width: 140px;
  height: 40px;
  background-color: #f9f9f9;
  border: 1px solid #dddddd;
  border-radius: 4px;

  padding-left: 10px;
  font-weight: 500;
  font-size: 14px;
  line-height: 14px;

  display: flex;

  margin-left: 5px;
  gap: 2px;
  align-items: center;
  cursor: pointer;
  & input:focus {
    outline: none;
  }
  & input:hover {
    cursor: text;
  }
  & img {
    cursor: pointer;
  }
  & div {
    font-size: 14px;
    font-weight: 500;
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

  color: #777;
`;
