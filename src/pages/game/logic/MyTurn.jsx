import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { ICON } from "../../../helpers/Icons";
import { BootStrap } from "../../../styles/BootStrap";
import { StButton } from "../../../components/common/Button";
import Timer from "../ele/Timer";
import Indicate from "./Indicate";

const MyTurn = ({ GameTurn, selectIndicaterCard, userId }) => {
  const { StTitle, StWrapper } = BootStrap;
  const { gameInfo } = useSelector((state) => state.gameSlice);
  const [select, setSelect] = useState(null);
  const { blackCards, whiteCards } = useSelector(
    (state) => state.gameSlice.gameInfo
  );
  if (blackCards === 0 && whiteCards === 0)
    return (
      <Indicate selectIndicaterCard={selectIndicaterCard} userId={userId} />
    );
  return (
    <StWrapper gap="4px">
      <StTitle mgtop="30px" width="270px">
        가져올 타일의 색상을 정해주세요!
      </StTitle>
      <StTileNumber>
        {gameInfo.blackCards === 0 || (
          <div>
            남은 검은색 타일 <span>{gameInfo.blackCards}개</span>
          </div>
        )}
        {gameInfo.whiteCards === 0 || (
          <div>
            남은 흰색 타일 <span>{gameInfo.whiteCards}개</span>
          </div>
        )}
      </StTileNumber>
      <StCardContainer>
        {gameInfo.blackCards === 0 || (
          <StCardBox>
            <div>검은색 타일</div>
            <StCard
              src={ICON.xlblackBack}
              alt="검은색"
              onClick={() => setSelect("black")}
            />
            {gameInfo.blackCards === 0 ? (
              <StDiv>남아있는 타일이 없습니다</StDiv>
            ) : select === "black" ? (
              <StSelect>선택</StSelect>
            ) : (
              <StSelectNull />
            )}
          </StCardBox>
        )}
        {gameInfo.blackCards === 0 || gameInfo.whiteCards === 0 || (
          <StLine></StLine>
        )}
        {gameInfo.whiteCards === 0 || (
          <StCardBox>
            <div>흰색 타일</div>
            <StCard
              src={ICON.xlwhiteBack}
              alt="흰색"
              onClick={() => setSelect("white")}
            />
            {gameInfo.whiteCards === 0 ? (
              <StDiv>남아있는 타일이 없습니다</StDiv>
            ) : select === "white" ? (
              <StSelect>선택</StSelect>
            ) : (
              <StSelectNull />
            )}
          </StCardBox>
        )}
      </StCardContainer>
      <StButton
        variant={select ? "primary" : "gray"}
        onClick={() => GameTurn(select)}
        disabled={!select}
      >
        확인
      </StButton>
      <Timer
        timeOver={() => GameTurn(gameInfo.whiteCards ? "white" : "black")}
      />
    </StWrapper>
  );
};

export default MyTurn;

const StCardContainer = styled.div`
  display: flex;
  gap: 25px;
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
const StTileNumber = styled.div`
  margin-top: 5px;
  display: flex;
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;
  color: #888888;
  gap: 10px;
  margin-bottom: 10px;
  & span {
    font-weight: bold;
    color: #222;
  }
`;

const StLine = styled.div`
  background-color: #ddd;
  width: 1px;
  height: 79px;
  margin-top: 24px;
`;

const StDiv = styled.div`
  width: 130px;
  height: 12px;
  font-size: 10px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #888;
  display: flex;
  justify-content: center;
`;
