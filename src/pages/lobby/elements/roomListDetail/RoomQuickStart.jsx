import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { client } from "../../../../api/axios";
import mockData from "./MockDataRoom";
import styled from "styled-components";
import { queryKeys } from "../../../../helpers/queryKeys";
import ModalCreateRoom from "../ModalCreateRoom";

const QuickStart = () => {
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();

  const { data: rooms, isLoading } = useQuery(
    [queryKeys.ROOM_LIST],
    async () => {
      // const { data } = await axios.get("/main/rooms");
      // return data;
      return mockData.rooms;
    }
  );

  const handleClick = async () => {
    if (!isLoading && rooms) {
      const availableRoom = rooms.find(
        (room) => room.isWaiting && room.currentMembers < room.maxMembers
      );
      if (availableRoom) {
        navigate(`/game/${availableRoom.roomId}`);
      } else {
      }
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }
  // 문제 : ModalCreateRoom
  return (
    <>
      <ModalCreateRoom modal={modal} closeModal={() => setModal(false)} />
      <ImmediateStart onClick={handleClick}>바로 시작</ImmediateStart>;
    </>
  );
};

const ImmediateStart = styled.button`
  width: 130px;
  height: 44px;
  border-radius: 6px;
  background: yellow;
  color: black;
  font-weight: bold;
`;

export default QuickStart;
