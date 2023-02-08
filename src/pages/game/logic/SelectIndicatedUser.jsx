import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { BootStrap } from "../../BootStrap";
import { StButton } from "../../Button";
import DavinchiCard from "../ele/DavinchiCard";
import Timer from "../ele/Timer";

const SelectIndicatedUser = ({ indicatedUser, guessCard }) => {
  const { StTitle, StWrapper } = BootStrap;
  const controledCard = indicatedUser[0]?.hand;
  const [select, setSelect] = useState({ index: null, value: null });
  return (
    <StWrapper>
      <StTitle width="299px" height="16px" mgtop="45px">
        숫자를 맞출 타일을 선택해주세요!
      </StTitle>
      <StCardContainer>
        {controledCard?.map((card, i) => (
          <StCardBox key={`${indicatedUser.userName}indicated${i}`}>
            <DavinchiCard
              card={card}
              size="lg"
              onClick={() =>
                setSelect((prev) => {
                  return { ...prev, index: i };
                })
              }
            />
            {select.index === i && <StSelect>선택</StSelect>}
          </StCardBox>
        ))}
      </StCardContainer>
      <StValueContainer>
        {new Array(13).fill("_").map((el, i) => (
          <StValue
            key={`indicatedCard${i}`}
            selected={select.value === i}
            onClick={() =>
              setSelect((prev) => {
                return { ...prev, value: i };
              })
            }
          >
            {i === 12 ? "JOKER" : i}
          </StValue>
        ))}
      </StValueContainer>
      <StRow>
        {select.index !== null && select.value !== null ? (
          <StButton
            mgtop="10px"
            variant="primary"
            onClick={() => guessCard(indicatedUser, select)}
          >
            결정
          </StButton>
        ) : (
          <StButton mgtop="10px" variant="gray" disabled>
            결정
          </StButton>
        )}
      </StRow>
      <Timer
        timeOver={() => guessCard(indicatedUser, { index: 0, value: 11 })}
      />
    </StWrapper>
  );
};

export default SelectIndicatedUser;

const StValue = styled.div`
  width: 44px;
  display: flex;
  justify-content: center;
  color: ${({ selected }) => (selected ? "#111" : "#888")};
  font-weight: ${({ selected }) => {
    return selected ? "bold" : "500";
  }};
  cursor: pointer;
`;
const StCardContainer = styled.div`
  margin-top: 12px;
  display: flex;
  justify-content: center;
  width: 636px;
  height: 102px;
  align-items: center;
  background: #eee;
  border-radius: 6px;
  gap: 4px;
`;
const StValueContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 636px;
  height: 32px;
  padding: 0 30px 0 20px;
  background-color: #f4f4f4;
  border: solid 1px #ccc;
  border-radius: 4px;
  & div:nth-child(13) {
    margin-left: 17px;
  }
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
const StRow = styled.div`
  display: flex;
`;
