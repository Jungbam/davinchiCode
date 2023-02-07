import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { BootStrap } from "../../BootStrap";
import { StButton } from "../../Button";
import DavinchiCard from "../ele/DavinchiCard";
import Timer from "../ele/Timer";
import Indicate from "./Indicate";
import JokerPosition from "./JokerPosition";

const SelectPosition = ({ card, cardPick, selectIndicaterCard }) => {
  const { blackCards, whiteCards } = useSelector(
    (state) => state.gameSlice.gameInfo
  );
  const { StWrapper, StCardArea } = BootStrap;
  if (blackCards === 0 && whiteCards === 0)
    return <Indicate selectIndicaterCard={selectIndicaterCard} />;
  if (card.value === 12)
    return <JokerPosition selectedCard={card} cardPick={cardPick} />;
  return (
    <StWrapper jus="center" gap="10px">
      <StCardArea height="80px" childwidth="56px" mgtop="0px" mgLeft="0px">
        <DavinchiCard card={card} />
      </StCardArea>
      <Stdiv>
        뽑으신 타일의 숫자는 <span>{card.value}</span>입니다!
      </Stdiv>
      <StDesc>오름차순으로 자동으로 배치됩니다.</StDesc>
      <StButton mgtop="27px" onClick={() => cardPick()}>
        확인
      </StButton>
      <Timer timeOver={() => cardPick()} />
    </StWrapper>
  );
};

export default SelectPosition;

const Stdiv = styled.div`
  margin-top: 10px;
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #444;
  & span {
    font-weight: bold;
  }
`;
const StDesc = styled.div`
  font-size: 12px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #888;
`;
