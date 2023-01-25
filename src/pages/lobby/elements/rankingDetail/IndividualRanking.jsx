import React from "react";
import styled from "styled-components";
import mockDataLead from "../roomListDetail/MockDataLeader";
import { queryKeys } from "../../../../helpers/queryKeys";
import { useQuery } from "@tanstack/react-query";

const IndividualRanking = ({ color }) => {
  const { data, status, error } = useQuery(["userRanking"], () => mockDataLead);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "error") {
    return <div>An error occurred: {error.message}</div>;
  }
  if (status === "success") {
    return (
      <>
        {mockDataLead.map((el, i) => (
          <StWrapper key={`individualRanking${i}`}>
            <StRank>
              <StPlayerRanking>{el.ranking}</StPlayerRanking>
              <StPlayerRankingActive>◀ {el.change}</StPlayerRankingActive>
            </StRank>
            <StRankDetail>
              <StUserProfile src={el.profileImageUrl} />
              <StUserName>{el.username}</StUserName>
              <StUserScore>{el.score}</StUserScore>
            </StRankDetail>
          </StWrapper>
        ))}
      </>
    );
  }
};

const StWrapper = styled.div`
  background-color: ${({ color }) => color || "#fff"};
  width: 100%;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
  border-bottom: 1px solid #ddd;
`;

const StRank = styled.div`
  width: 40px;
  height: 34px;
  /* border: 1px solid green; */
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const StRankDetail = styled.div`
  width: 292px;
  height: 34px;

  margin-right: 10px;
  display: flex;
  align-items: center;
`;

const StUserProfile = styled.img`
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: 1px solid #111;
  object-fit: cover;
`;

const StUserName = styled.div`
  width: 150px;
  font-size: 14px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  text-align: left;
  color: #111;
  margin-left: 15px;
`;

const StUserScore = styled.div`
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  text-align: left;
  color: #333;
  margin-left: 20px;
`;

const StPlayerRanking = styled.span`
  font-size: 14px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  text-align: left;
  color: #111;
`;

const StPlayerRankingActive = styled.div`
  font-size: 12px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  text-align: left;
  color: #ff601c;
`;

export default IndividualRanking;
