import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { ICON } from "../../../helpers/Icons";

const OtherTurn = ({ text }) => {
  const { gameInfo } = useSelector((state) => state.gameSlice);
  const turnUser = gameInfo.users.filter((el) => el.userId === gameInfo.turn);
  return (
    <>
      <StCardArea>
        <img src={ICON.blackBack} alt="다빈치 코드" />
        <img src={ICON.whiteBack} alt="다빈치 코드" />
      </StCardArea>
      <StText>
        <span>{turnUser[0]?.userName}</span>님이 {text}를 진행중입니다.
      </StText>
    </>
  );
};

export default OtherTurn;

const StText = styled.div`
  margin-top: ${({ mgTop }) => mgTop || "20px"};
  width: 100%;
  display: flex;
  justify-content: center;
  font-size: 14px;
  line-height: 17px;
  & span {
    font-weight: 700;
  }
`;

const StCardArea = styled.div`
  margin-top: 120px;
  width: 1078px;
  height: 80px;
  display: flex;
  justify-content: center;
  gap: 20px;
`;
