import React from "react";

import styled from "styled-components";
import DropdownPlayerCount from "../../../common/elements/DropDownPlayerCount";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { RoomAPI } from "../../../../api/axios";
import { queryKeys } from "../../../../helpers/queryKeys";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateRoom = ({ closeModal, modal }) => {
  const navigate = useNavigate();
  const styles = { modal };
  const queryClient = useQueryClient();
  // State to store the form data
  const [roomName, setRoomName] = useState("");
  const [isSecret, setIsSecret] = useState(false);
  const [maxMembers, setMaxMembers] = useState(0);
  const [password, setPassword] = useState("");

  // Mutation function to send the POST request
  // const { mutate: createRoom } = useMutation(
  //   RoomAPI.postRoom({ roomName, maxMembers, password }),
  //   {
  //     onSuccess: (data) => {
  //       queryClient.invalidateQueries([queryKeys.ROOM_LIST]);
  //       alert("최신화 완료");
  //     },
  //     onError: (error) => {
  //       console.log(error);
  //     },
  //   }
  // );

  // Handle the form submission
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   // Send the POST request with the form data
  //   await createRoom();
  //   // Close the modal
  //   closeModal();
  // };

  const createRoomHandler = async () => {
    const { roomId } = await axios.post(
      "https://game.davinci-code.online/rooms",
      {
        roomName,
        maxMembers: 2,
        password,
      },
      {
        withCredentials: true,
      }
    );
    navigate(`/game/${roomId}`);
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
            <input
              type="checkbox"
              checked={!isSecret}
              onChange={() => setIsSecret(!isSecret)}
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
        <StButton color="#ffdf24" onClick={createRoomHandler}>
          확인
        </StButton>
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
