import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { BootStrap } from "../../BootStrap";
import DavinchiCard from "../ele/DavinchiCard";
import Timer from "../ele/Timer";

const SelectIndicatedUser = ({ indicatedUser, guessCard }) => {
  const {StBtn,StWrapper} = BootStrap
  const controledCard = indicatedUser[0]?.hand
  const [select, setSelect] = useState({ index: null, value: null });
  return (
    <StWrapper jus="center">
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
        <StBtn width="100px" height="30px" color="#ffdf24" fontSize="14px"
          onClick={()=>guessCard(indicatedUser, select)}>결정</StBtn>
      </StRow>
      <Timer timeOver={()=>guessCard(indicatedUser, { index: 0, value: 11 })}/>
    </StWrapper>
  );
};

export default SelectIndicatedUser;

const StValue = styled.span`
  width: 25px;
  height: 25px;
  text-align: center;
  align-items: center;
  font-weight: ${({ selected }) => {
    return selected ? "1000" : "400";
  }};
`;
const StCardContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 4px;
  width: 636px;
  height: 102px;
  align-items: center;
  background: #ddd;
  border-radius: 6px;
`;
const StValueContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  width: 636px;
  height: 32px;
  padding: 10px 20px;
  background-color: #f4f4f4;
  border-radius: 4px;
`;
const StCardBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 42px;
`;
const StSelect = styled.span`
  width: 34px;
  height: 20px;
  background: #111;
  color: rgba(255, 96, 28, 1);
  border-radius: 999px;
  font-size: 10px;
  text-align: center;
  align-items: center;
  margin: 0 auto;
`;
const StRow = styled.div`
  display: flex;
`;
