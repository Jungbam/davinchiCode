import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { ICON } from "../../../helpers/Icons";

const OtherTurn = ({ text }) => {
  const { gameInfo } = useSelector((state) => state.gameSlice);
  const turnUser = gameInfo.users.filter((el) => el.userId === gameInfo.turn);
  return (
    <StWrapper>
      <StCardContainer>
        <StImg src={ICON.xlblackBack} alt="다빈치 코드" />
        <StImg src={ICON.xlwhiteBack} alt="다빈치 코드" />
      </StCardContainer>
      <StP>
        <StName>{turnUser[0]?.userName}</StName>님이 {text}를 진행중입니다.
      </StP>
    </StWrapper>
  );
};

export default OtherTurn;

const StWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
`;

const StCardContainer = styled.div`
  margin-top: 120px;
  display: flex;
  gap: 20px;
`;
const StImg = styled.img`
  width: 56px;
  height: 80px;
`;
const StP = styled.p`
  font-size: 14px;
  font-weight: 500;
`;
const StName = styled.span`
  font-weight: bold;
  color: #111;
`;
