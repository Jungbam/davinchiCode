import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { BootStrap } from "../../../styles/BootStrap";
import { StButton } from "../../../components/common/Button";
import DavinchiCard from "../ele/DavinchiCard";
import Timer from "../ele/Timer";

const ThrowMine = ({ userId, openMine }) => {
  const { users } = useSelector((state) => state.gameSlice.gameInfo);
  const [select, setSelect] = useState(null);
  const mine = users.filter((el) => el?.userId === userId)[0]?.hand;
  const { StTitle, StWrapper } = BootStrap;
  const openIt = mine?.filter((el) => el?.isOpen === false)[0];
  return (
    <StWrapper>
      <StTitle width="299px" height="16px" mgtop="45px">
        숫자를 맞출 타일을 선택해주세요!
      </StTitle>
      <StCardContainer>
        {mine?.map((card, i) => (
          <StCardBox key={`${mine.userName}indicated${i}`}>
            {card.isOpen ? <StOpen>OUT</StOpen> : <StOpenNull></StOpenNull>}
            <DavinchiCard card={card} size="lg" onClick={() => setSelect(i)} />
            {select === i && <StSelect>선택</StSelect>}
          </StCardBox>
        ))}
      </StCardContainer>
      <StButton mgtop="10px" variant="primary" onClick={() => openMine(select)}>
        결정
      </StButton>
      <Timer timeOver={() => openMine(openIt)} />
    </StWrapper>
  );
};

export default ThrowMine;

const StCardContainer = styled.div`
  margin-top: 12px;
  display: flex;
  justify-content: center;
  width: 636px;
  height: 118px;
  align-items: center;
  background: #eee;
  border-radius: 6px;
  gap: 4px;
`;
const StCardBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 42px;
  & img {
    cursor: pointer;
  }
`;
const StSelect = styled.div`
  width: 34px;
  height: 20px;
  background: #111;
  color: rgba(255, 96, 28, 1);
  border-radius: 999px;
  font-size: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
`;
const StOpen = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 20px;
  border-radius: 4px;
  background: #ffdf24;
  font-size: 10px;
  font-weight: bold;
  border: 1px solid #111111;
  margin: 0 auto;
`;
const StOpenNull = styled.span`
  width: 32px;
  height: 20px;
  background: none;
  border: none;
`;
