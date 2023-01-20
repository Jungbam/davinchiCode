import React from "react";
import styled from "styled-components";
import mockDataLead from "../roomListDetail/MockDataLeader";
import { queryKeys } from "../../../../helpers/queryKeys";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const IndividualRanking = () => {
  const { data, status, error } = useQuery(
    [queryKeys.USER_RANKING],
    () => mockDataLead
  );

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "error") {
    return <div>An error occurred: {error.message}</div>;
  }

  if (status === "success") {
    return (
      <>
        {data &&
          data.map((item) => (
            <StIndividualBox key={item.username}>
              <StIndvFirst>
                <StIndvFirstTop>
                  <StPlayerRanking>{item.ranking}</StPlayerRanking>
                </StIndvFirstTop>
                <StIndvFirstBottom>
                  <StPlayerRankingActive>{item.change}</StPlayerRankingActive>
                </StIndvFirstBottom>
              </StIndvFirst>

              <StIndvSec>
                <StPlayerProfile src={item.profileImageUrl} />
                <StPlayerName>{item.username}</StPlayerName>
              </StIndvSec>

              <StIndvThrdBot>
                <StPlayerOverallScore>{item.score}</StPlayerOverallScore>
              </StIndvThrdBot>

              {/* <StIndvForth>
                <StPlayerTier>{item.rank}</StPlayerTier>
              </StIndvForth> */}
            </StIndividualBox>
          ))}
      </>
    );
  }
};

const StIndividualBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 420px;
  height: 64px;
  border: 1px solid #e6e6e6;
  background-color: white;
`;

const StIndvFirst = styled.div`
  display: flex;
  flex-direction: column;
`;

const StIndvFirstTop = styled.div`
  display: flex;
  flex-direction: row;
  width: 50px;
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
  width: 50px;
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
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 180px;
  height: 72px;
  gap: 20px;
`;
const StPlayerProfile = styled.img``;

// const StIndvThrd = styled.div`
//   display: flex;
//   flex-direction: row;
//   align-items: center;
//   justify-content: flex-end;
//   width: 100px;
//   height: 72px;
// `;

// const StIndvThrdTop = styled.div`
//   display: flex;
//   flex-direction: row;
//   justify-content: flex-start;
//   align-items: center;
//   width: 100%;
//   height: 36px;
// `;
const StPlayerName = styled.span`
  font-weight: bold;
`;
const StIndvThrdBot = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: 100px;
  height: 36px;
`;
const StPlayerOverallScore = styled.span``;

// const StIndvForth = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;
// const StPlayerTier = styled.span`
//   display: inline-block;
//   border: 1px solid black;
// `;
export default IndividualRanking;
