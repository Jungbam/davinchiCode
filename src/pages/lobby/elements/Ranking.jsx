import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import IndividualRanking from "./rankingDetail/IndividualRanking";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import mockDataMy from "./roomListDetail/MockDataMy";
import { AnimatePresence, motion } from "framer-motion";
import { useCycle } from "framer-motion";
import { ICON } from "../../Icons";

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

const Ranking = () => {
  const [textIndex, setTextIndex] = useState(false);

  function numberWithCommas(x) {
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

  const { data, status } = useQuery(["PERSONAL_RANKING"], () => mockDataMy);

  return (
    <StRankingWrapper>
      <StRankingHeader>게임순위</StRankingHeader>
      <StIndividualWrapper>
        <IndividualRanking />
      </StIndividualWrapper>
      <StWrapper color="#efffec">
        <StRank>
          <StPlayerRanking>{mockDataMy.ranking}</StPlayerRanking>
          <StPlayerRankingActive>◀ {mockDataMy.change}</StPlayerRankingActive>
        </StRank>
        <StRankDetail>
          <StUserProfile src={mockDataMy.profileImageUrl} />
          <StUserName>{mockDataMy.username}</StUserName>
          <StUserScore>{numberWithCommas(mockDataMy.score)}</StUserScore>
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
            <img src={ICON.iconAlert} />
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
            <img src={ICON.iconAlert} />
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
