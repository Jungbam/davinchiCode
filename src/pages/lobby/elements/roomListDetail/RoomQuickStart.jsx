import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import mockData from "./MockDataRoom";
import styled from "styled-components";
import { queryKeys } from "../../../../helpers/queryKeys";
import { motion } from "framer-motion";

const buttonVariants = {
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.3,
      repeat: Infinity,
      repeatType: "reverse",
    },
  },
};

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
      <ImmediateStart
        variants={buttonVariants}
        whileHover="hover"
        onClick={handleClick}
      >
        바로 시작
      </ImmediateStart>
      ;
    </>
  );
};

const ImmediateStart = styled(motion.button)`
  background-color: #ffdf24;
  width: 130px;
  height: 44px;
  border-radius: 6px;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 18px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  text-align: center;
  color: #000;

  cursor: pointer;
`;

export default QuickStart;
