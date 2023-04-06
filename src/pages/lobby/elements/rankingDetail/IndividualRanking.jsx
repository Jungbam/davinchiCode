import React from "react";
import styled from "styled-components";
import RankingListSkell from "../roomListDetail/RankingListSkell";

const IndividualRanking = ({ users, status }) => {
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  }
  const usersRanking = users
    ?.filter((el) => el.ranking !== null)
    .filter((el, i) => i < 10);

  if (status === "loading") return <RankingListSkell />;
  return (
    <>
      {usersRanking?.map((el, i) => (
        <StWrapper key={`individualRanking${i}`}>
          <StPlayerRanking>{el.ranking}</StPlayerRanking>
          <StRankDetail>
            <StUserProfile src={el.profileImageUrl} alt="프로필" />
            <StUserName>{el.username}</StUserName>
            <StUserScore>{numberWithCommas(el.score)}</StUserScore>
          </StRankDetail>
        </StWrapper>
      ))}
    </>
  );
};

const StWrapper = styled.div`
  background-color: ${({ color }) => color || "#fff"};
  width: 100%;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
  border-bottom: 1px solid #111;
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
  line-height: 1;
  text-align: left;
  color: #111;
  margin-left: 15px;
`;

const StUserScore = styled.div`
  font-size: 12px;
  line-height: 1;
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

export default IndividualRanking;
