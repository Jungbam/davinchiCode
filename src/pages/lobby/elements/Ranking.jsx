import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import IndividualRanking from "./rankingDetail/IndividualRanking";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ICON } from "../../../helpers/Icons";
import { RoomAPI, SignAPI } from "../../../api/axios";
import { useNavigate } from "react-router-dom";
import { Variants } from "../../../helpers/Variants";

const Ranking = () => {
  const [textIndex, setTextIndex] = useState(false);
  const navigate = useNavigate();
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

  const { status, data } = useQuery(
    ["PERSONAL_RANKING"],
    () => RoomAPI.showRanking(),
    {
      staleTime:
        ((59 - new Date().getMinutes()) * 60 + (60 - new Date().getSeconds())) *
        1000,
      onError: () => navigate("/error"),
    }
  );

  const { status: myStatus, data: myData } = useQuery(
    ["MY_RANKING"],
    () => SignAPI.myinfo(),
    {
      staleTime:
        ((59 - new Date().getMinutes()) * 60 + (60 - new Date().getSeconds())) *
        1000,
      onError: () => navigate("/error"),
    }
  );

  return (
    <StRankingWrapper>
      <StRankingHeader>게임순위</StRankingHeader>
      <StIndividualWrapper>
        <IndividualRanking users={data?.data} status={status} />
      </StIndividualWrapper>
      {myStatus === "loading" && (
        <StWrapper color="#efffec">
          <Sta>
            <StA></StA>
            <StB></StB>
          </Sta>
          <Stb></Stb>
          <Stc></Stc>
          <Std></Std>
        </StWrapper>
      )}
      {myStatus === "success" && (
        <StWrapper color="#efffec">
          <StMyText>나의 랭킹</StMyText>
          <StPlayerRanking>{myData?.data.ranking}</StPlayerRanking>
          <StRankDetail>
            <StUserProfile src={myData?.data.profileImageUrl} />
            <StRankDetailBox>
              <StUserName>{myData?.data.username}</StUserName>
              <StUserScore>{numberWithCommas(myData?.data.score)}</StUserScore>
            </StRankDetailBox>
          </StRankDetail>
        </StWrapper>
      )}

      <StRankingBottom>
        {textIndex ? (
          <StText
            key="0"
            variants={Variants.text}
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
            variants={Variants.text}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <img src={ICON.iconAlert} alt="랭킹갱신" />
            게임 순위는 실시간으로 업데이트됩니다
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
const StMyText = styled.span`
  font-weight: 700;
  font-size: 14px;
  color: #00831d;
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
  gap: 15px;
`;

const StRankDetail = styled.div`
  width: 250px;
  height: 34px;
  margin-right: 10px;
  padding-left: 15px;
  display: flex;
  align-items: center;
`;

const StRankDetailBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
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
  font-weight: 700;
  line-height: 1;
  text-align: left;
  color: #111;
  margin-left: 25px;
`;

const StUserScore = styled.div`
  font-size: 12px;
  line-height: 1;
  text-align: left;
  color: #333;
  margin-left: 25px;
`;

const StPlayerRanking = styled.span`
  font-size: 14px;
  font-weight: bold;
  line-height: 1;
  text-align: left;
  color: #111;
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

const Sta = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-right: 41px;
  width: 26px;
  height: 33px;
`;

const StA = styled.div`
  width: 14px;
  height: 14px;
  border-radius: 2px;
  background-image: linear-gradient(
    to right,
    #d6eed1 0%,
    #e8ffe3 51%,
    #d6eed1 100%
  );
`;

const StB = styled.div`
  width: 26px;
  height: 14px;
  border-radius: 2px;
  background-image: linear-gradient(
    to right,
    #d6eed1 0%,
    #e8ffe3 51%,
    #d6eed1 100%
  );
`;

const Stb = styled.div`
  width: 34px;
  height: 34px;
  border-radius: 999px;
  background-image: linear-gradient(
    to right,
    #d6eed1 0%,
    #e8ffe3 51%,
    #d6eed1 100%
  );
`;
const Stc = styled.div`
  width: 74px;
  height: 20px;
  border-radius: 2px;
  background-image: linear-gradient(
    to right,
    #d6eed1 0%,
    #e8ffe3 51%,
    #d6eed1 100%
  );

  margin-right: 80px;
`;
const Std = styled.div`
  width: 74px;
  height: 14px;
  border-radius: 2px;
  background-image: linear-gradient(
    to right,
    #d6eed1 0%,
    #e8ffe3 51%,
    #d6eed1 100%
  );
`;
