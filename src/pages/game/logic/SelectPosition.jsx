import React from "react";
import styled from "styled-components";
import { BootStrap } from "../../../styles/BootStrap";
import { StButton } from "../../../components/common/Button";
import DavinchiCard from "../ele/DavinchiCard";
import Timer from "../ele/Timer";
import JokerPosition from "./JokerPosition";

const SelectPosition = ({ card, cardPick, selectIndicaterCard, userId }) => {
  const { StWrapper, StCardArea } = BootStrap;
  if (card.value === 12)
    return <JokerPosition selectedCard={card} cardPick={cardPick} />;
  return (
    <StWrapper jus="center" gap="10px">
      <StCardArea height="80px" childwidth="56px" mgtop="0px" mgLeft="0px">
        <DavinchiCard card={card} size="lg" />
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
