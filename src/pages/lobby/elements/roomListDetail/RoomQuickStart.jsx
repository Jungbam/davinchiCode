import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { client } from "../../../../api/axios";
import mockData from "./MockDataRoom";
import styled from "styled-components";

const QuickStart = () => {
  const navigate = useNavigate();

  const { data: rooms, isLoading } = useQuery(["/main/rooms"], async () => {
    // const { data } = await axios.get("/main/rooms");
    // return data;
    return mockData.rooms;
  });

  const handleClick = async () => {
    if (!isLoading && rooms) {
      // Find the first room with isWaiting set to true and current members less than max members
      const availableRoom = rooms.find(
        (room) => room.isWaiting && room.currentMembers < room.maxMembers
      );
      if (availableRoom) {
        navigate(`/main/rooms/quickstart/${availableRoom.roomId}`);
      } else {
        // Create a new empty room and navigate to it
        const { data } = await client.post("/main/rooms");
        navigate(`/main/rooms/quickstart/${data.roomId}`);
      }
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return <ImmediateStart onClick={handleClick}>바로시작</ImmediateStart>;
};

const ImmediateStart = styled.button`
  width: 130px;
  height: 44px;
  border-radius: 6px;
  background: #222222;
  color: white;
`;

export default QuickStart;
