import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const SystemMessage = () => {
  const { gameInfo, gameStart } = useSelector((state) => state.gameSlice);
  const turnUser = gameInfo?.users.filter((el) => el?.userId === gameInfo.turn);
  if (!gameStart) return <></>;
  return (
    turnUser && (
      <StOnGoingStatus>{turnUser[0]?.userName}님의 차례입니다.</StOnGoingStatus>
    )
  );
};

export default SystemMessage;

const StOnGoingStatus = styled.div`
  margin: 10px;
  background: #eeeeee;
  padding: 4px 16px;
  border-radius: 6px;
  border: solid 1px #111;
  background-color: #111;

  left: 0;
  top: 0;
  color: #ffdf24;
  font-size: 10px;
  font-weight: 500;
  display: inline-block;
  position: absolute;
  left: 0;
  top: 0;
`;
