import React from "react";
import styled from "styled-components";
import IndividualRanking from "./rankingDetail/IndividualRanking";
import Tooltip from "../../../components/common/elements/Tooltip";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import mockDataMy from "./roomListDetail/MockDataMy";

const Ranking = () => {
  const { data, status } = useQuery(["PERSONAL_RANKING"], () => mockDataMy);
  return (
    <StRankingWrapper>
      <StRankingHeader>
        <StRankingTitle>게임순위</StRankingTitle>
      </StRankingHeader>
      <StIndividualWrapper>
        <IndividualRanking />
      </StIndividualWrapper>
      <StPersonalBox>
        {status === "loading" && <div>Loading...</div>}
        {status === "error" && <div>Error: {data.error.message}</div>}
        {status === "success" && mockDataMy && (
          <>
            <StMyRankTop>
              <StMyRankTopLeft>
                <StMyRankingTag>내 순위</StMyRankingTag>
                <StMyRanking>{mockDataMy.ranking}</StMyRanking>
              </StMyRankTopLeft>
              <StMyRankTopRight>
                <StMyRankingActive>{mockDataMy.change}</StMyRankingActive>
              </StMyRankTopRight>
            </StMyRankTop>

            <StSectionDivider />

            <StMyRankBottom>
              <StMyRankBottomLeft>
                <StMyProfile src={mockDataMy.profileImageUrl}></StMyProfile>
              </StMyRankBottomLeft>
              <StMyRankBottomMid>
                <StMyOverallScore>{mockDataMy.score}</StMyOverallScore>
                <StMyName>{mockDataMy.username}</StMyName>
              </StMyRankBottomMid>
              <StMyRankBottomRight>
                <StMyTier>{mockDataMy.rank}</StMyTier>
                <Tooltip>
                  <div>
                    <h3>티어</h3>
                  </div>
                  <StDiaTier>
                    <p>다이아 상위 10%</p>
                  </StDiaTier>
                  <StGoldTier>
                    <p>골드 상위 50%</p>
                  </StGoldTier>
                  <StSilverTier>
                    <p>실버 상위 80%</p>
                  </StSilverTier>
                  <StBronzeTier>
                    <p>브론즈 상위 100%</p>
                  </StBronzeTier>
                </Tooltip>
              </StMyRankBottomRight>
            </StMyRankBottom>
          </>
        )}
      </StPersonalBox>
    </StRankingWrapper>
  );
};

const StRankingWrapper = styled.div`
  width: 422px;
  height: 766px;
  border: 1px solid black;
  border-radius: 12px;
`;

const StRankingHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 420px;
  height: 40px;
  background: #333333;
  border-radius: 12px 12px 0px 0px;
`;

const StRankingTitle = styled.p`
  font-size: 20px;
  color: white;
`;
const StIndividualWrapper = styled.div`
  height: 604px;
`;

const StPersonalBox = styled.div`
  width: 420px;
  height: 122px;
  border-top: 1px solid black;
  border-bottom: 2px;
`;

const StMyRankTop = styled.div`
  display: flex;
  flex-direction: row;
  width: 420;
  height: 26px;
`;
const StMyRankTopLeft = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 4px;
  margin-top: 2px;
  margin-left: 14px;
`;
const StMyRankingTag = styled.div`
  display: inline-block;
  padding: 5px;
  border: 1.5px solid black;
  border-radius: 12px;
  font-size: 10px;
`;

const StMyRanking = styled.div``;

const StMyRankTopRight = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 30px;
`;
const StMyRankingActive = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 11px;
`;

const StSectionDivider = styled.div`
  border-top: 1px solid black;
  margin-top: 6px;
`;

const StMyRankBottom = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 420px;
  height: 86px;
`;

const StMyRankBottomLeft = styled.div`
  display: flex;
  flex-direction: row;
  gap: 6px;
`;
const StMyProfile = styled.img``;

const StMyRankBottomMid = styled.div`
  display: flex;
  flex-direction: column-reverse;
`;

const StMyOverallScore = styled.span``;
const StMyName = styled.span`
  font-weight: bold;
`;

const StMyRankBottomRight = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const StMyTier = styled.span`
  display: inline-block;
  border: 1px solid black;
  padding: 4px;
  border-radius: 12px;
`;

const StDiaTier = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  height: 40px;
`;
const StGoldTier = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  height: 40px;
`;

const StSilverTier = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  height: 40px;
`;

const StBronzeTier = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  height: 40px;
`;
export default Ranking;
