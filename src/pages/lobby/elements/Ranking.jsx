import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import IndividualRanking from "./rankingDetail/IndividualRanking";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ICON } from "../../../helpers/Icons";
import { RoomAPI } from "../../../api/axios";

const TextVariants = {
  hidden: {
    y: -30,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 2,
    },
  },
  exit: {
    y: 30,
    opacity: 0,
  },
};

const a = (num) => {
  if (num > 0) return ICON.iconScorePlus;
  if (num < 0) return ICON.iconScoreMinus;
  if (!num) return ICON.iconScoreStable;
};

const Ranking = () => {
  const [textIndex, setTextIndex] = useState(false);

  function numberWithCommas(x = 0) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  }
  const handleInterval = () => {
    setTimeout(() => {
      setTextIndex((prev) => !prev);
    }, 8000);
  };

  useEffect(() => {
    handleInterval();
  }, [textIndex]);

  const { data } = useQuery(["PERSONAL_RANKING"], () => RoomAPI.showRanking(), {
    onSuccess: (data) => {},
  });

  const myData = useQuery(["MY_RANKING"], () => RoomAPI.showMyRanking(), {
    onSuccess: (data) => {},
  });

  return (
    <StRankingWrapper>
      <StRankingHeader>게임순위</StRankingHeader>
      <StIndividualWrapper>
        <IndividualRanking users={data?.data} />
      </StIndividualWrapper>
      <StWrapper color="#efffec">
        <StRank>
          <StPlayerRanking>{myData?.data?.data.ranking}</StPlayerRanking>
          <StPlayerRankingActive>
            <img
              src={a(
                myData?.data?.data.ranking - myData?.data?.data.prevRanking
              )}
              alt="순위"
            />{" "}
            {Math.abs(
              myData?.data?.data.ranking - myData?.data?.data.prevRanking
            )}
          </StPlayerRankingActive>
        </StRank>
        <StRankDetail>
          <StUserProfile src={myData?.data?.data.profileImageUrl} />
          <StUserName>{myData?.data?.data.username}</StUserName>
          <StUserScore>
            {numberWithCommas(myData?.data?.data.score)}
          </StUserScore>
        </StRankDetail>
      </StWrapper>

      <StRankingBottom>
        {textIndex ? (
          <StText
            key="0"
            variants={TextVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <img src={ICON.iconAlert} alt="게임이용" />
            장시간의 게임은 건강에 해롭습니다
          </StText>
        ) : (
          <StText
            key="1"
            variants={TextVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <img src={ICON.iconAlert} alt="랭킹갱신" />
            게임 순위는 1시간마다 업데이트됩니다
          </StText>
        )}
      </StRankingBottom>
    </StRankingWrapper>
  );
};

const StRankingWrapper = styled.div`
  border-radius: 6px;
  border: solid 1px #110;
  width: 420px;
  height: 100%;
`;

const StRankingHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 38px;
  border-radius: 5px 5px 0px 0px;
  background: #111111;

  font-size: 16px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #fff;
`;

const StIndividualWrapper = styled.div`
  height: 640px;
  background-color: #fff;
`;

const StRankingBottom = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 420px;
  height: 36px;
  border-radius: 0px 0px 5px 5px;
  background-color: #111111;

  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  text-align: left;
  color: #eee;
`;

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

const StText = styled(motion.div)`
  width: 100%;
  display: flex;
  justify-content: center;
  & img {
    margin-right: 4px;
  }
`;
export default Ranking;
