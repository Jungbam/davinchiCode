import React from "react";
import { useState } from "react";
import styled from "styled-components";
import DavinchiCard from "../ele/DavinchiCard";

const SelectIndicatedUser = ({ indicatedUser, guessCard }) => {
  const controledCard = indicatedUser[0]?.hand
  const [select, setSelect] = useState({ index: null, value: null });

  return (
    <div>
      <StCardContainer>
        {controledCard?.map((card,i) => (
          <StCardBox key={`${indicatedUser.userName}indicated${i}`}>
            <DavinchiCard card={card} onClick={()=>setSelect(prev=>{return{...prev, index : i}})}/>
            {select.index===i&&<StSelect>선택</StSelect>}
          </StCardBox>
        ))}
      </StCardContainer>
      <StValueContainer>
        {new Array(13).fill('_').map((el,i)=>(
          <StValue key={`indicatedCard${i}`} selected={select.value===i} onClick={()=>setSelect(prev=>{return{...prev, value : i}})}>{i===12?'joker':i}</StValue>
          ))}
      </StValueContainer>
      <StRow>
        <button onClick={()=>guessCard(indicatedUser, select)}>결정</button>
      </StRow>
    </div>
  );
};

export default SelectIndicatedUser;

const StValue = styled.div`
  width: 25px;
  height: 25px;
  font-weight: ${({ selected }) => {
    return selected ? "1000" : "400";
  }};
  border: 1px solid grey;
`;
const StCardContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 102px;
  align-items: center;
  background: #ddd;
  border-radius: 6px;
`;
const StValueContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 637px;
  height: 32px;
  padding: 10px 20px;
`;
const StCardBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 42px;
`;
const StSelect = styled.span`
  width: 34px;
  height: 20px;
  background: #111;
  color: rgba(255, 96, 28, 1);
  border-radius: 999px;
`;
const StRow = styled.div`
  display: flex;
`;
