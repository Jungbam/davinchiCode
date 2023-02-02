import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { ICON } from "../../../helpers/Icons";
import { BootStrap } from "../../BootStrap";
import Timer from "../ele/Timer";

const MyTurn = ({ GameTurn }) => {
  const { StTitle, StBtn, StText, StWrapper } = BootStrap;
  const { gameInfo } = useSelector((state) => state.gameSlice);
  const [select, setSelect] = useState(null);
  return (
    <StWrapper gap="4px">
      <StTitle mgTop="30px" width="270px">
        가져올 타일의 색상을 정해주세요!
      </StTitle>
      <StLeftTyle>
        {gameInfo.blackCards && (
          <StText width="128px" fontSize="14px" color=" #888888" mgTop="10px" dir="column">
            <p>남은 검은색 타일</p><p>{gameInfo.blackCards}개</p>
          </StText>
        )}
        {gameInfo.blackCards && (
          <StText width="128px" fontSize="14px" color=" #888888" mgTop="10px" dir="column">
            <p>남은 흰색 타일</p><p>{gameInfo.whiteCards}개</p>
          </StText>
        )}
      </StLeftTyle>
      <StCardContainer>
        <StCardBox>
          <div>검은색 타일</div>
          {gameInfo.blackCards && (
            <StCard
              src={ICON.blackBack}
              alt="검은색"
              onClick={() => setSelect("black")}
            />
          )}
          {select === "black" ? <StSelect>선택</StSelect> : <StSelectNull />}{" "}
        </StCardBox>
        <StCardBox>
          <div>흰색 타일</div>
          {gameInfo.whiteCards && (
            <StCard
              src={ICON.whiteBack}
              alt="흰색"
              onClick={() => setSelect("white")}
            />
          )}
          {select === "white" ? <StSelect>선택</StSelect> : <StSelectNull />}
        </StCardBox>
      </StCardContainer>
      <StBtn
        width="100px"
        height="32px"
        fontSize="14px"
        color="#FFDF24"
        onClick={() => GameTurn(select)}
      >
        확인
      </StBtn>
      <Timer timeOver={()=>GameTurn(gameInfo.whiteCards?"white":"black")}/>
    </StWrapper>
  );
};

export default MyTurn;

const StCardContainer = styled.div`
  display: flex;
`;
const StCardBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  width: 128px;
  height: 150px;
  font-weight: 600;
  font-size: 12px;
  line-height: 14px;
`;

const StCard = styled.img`
  width: 56px;
  height: 80px;
  cursor: pointer;
`;
const StSelect = styled.button`
  width: 34px;
  height: 20px;
  font-family: PretendardVariable;
  font-size: 10px;
  font-weight: 600;
  border-radius: 999px;
  background-color: black;
  color: #ff601c;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
`;
const StSelectNull = styled.span`
  width: 34px;
  height: 20px;
  background-color: none;
  border: none;
`;
const StLeftTyle = styled.div`
  display: flex;
  gap: 10px;
  text-align: center;
`;
