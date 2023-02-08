import React from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import styled from "styled-components";
import { motion } from "framer-motion";
import { RoomAPI } from "../../../../api/axios";

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
  const navigate = useNavigate();

  const { mutate: searchRoom } = useMutation(() => RoomAPI.quickStart(), {
    onSuccess: ({ data }) => {
      navigate(`/game/${data}`);
    },
    onError: (error) => {
      navigate("/error");
    },
  });

  const quickStartHandler = () => {
    searchRoom();
  };

  return (
    <>
      <ImmediateStart
        variants={buttonVariants}
        whileHover="hover"
        onClick={quickStartHandler}
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
  border: none;

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
