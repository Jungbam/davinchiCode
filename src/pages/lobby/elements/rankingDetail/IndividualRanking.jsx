import React from "react";
import styled from "styled-components";

const IndividualRanking = () => {
  return (
    <StIndividualBox>
      <StIndvFirst>
        <StIndvFirstTop>
          <StPlayerRanking>1</StPlayerRanking>
        </StIndvFirstTop>
        <StIndvFirstBottom>
          <StPlayerRankingActive>332,341</StPlayerRankingActive>
        </StIndvFirstBottom>
      </StIndvFirst>
      <StIndvSec>
        <StPlayerProfile src="../../../../assets/img/profileIcon.png" />
      </StIndvSec>
      <StIndvThrd>
        <StIndvThrdTop>
          <StPlayerName>NamePlacement</StPlayerName>
        </StIndvThrdTop>
        <StIndvThrdBot>
          <StPlayerOverallScore>12,321,032</StPlayerOverallScore>
        </StIndvThrdBot>
      </StIndvThrd>
      <StIndvForth>
        <StPlayerTier>티어</StPlayerTier>
      </StIndvForth>
    </StIndividualBox>
  );
};

const StIndividualBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 420px;
  height: 72px;
  border: 1px solid black;
`;

const StIndvFirst = styled.div`
  display: flex;
  flex-direction: column;
`;

const StIndvFirstTop = styled.div`
  display: flex;
  flex-direction: row;
  width: 72px;
  height: 36px;
`;
const StPlayerRanking = styled.span`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-weight: bold;
  font-size: 20px;
`;

const StIndvFirstBottom = styled.div`
  display: Flex;
  flex-direction: row;
  width: 72px;
  height: 36px;
`;
const StPlayerRankingActive = styled.span`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  font-size: 11px;
`;
const StIndvSec = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 72px;
`;
const StPlayerProfile = styled.img``;

const StIndvThrd = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 180px;
  height: 72px;
`;

const StIndvThrdTop = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 36px;
`;
const StPlayerName = styled.span`
  font-weight: bold;
`;
const StIndvThrdBot = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 36px;
`;
const StPlayerOverallScore = styled.span``;

const StIndvForth = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const StPlayerTier = styled.span`
  display: inline-block;
  border: 1px solid black;
`;
export default IndividualRanking;
