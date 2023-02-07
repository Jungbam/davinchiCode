import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import Moddal from "../../../components/form/modal/Moddal";
import { ICON } from "../../../helpers/Icons";
import { BootStrap } from "../../BootStrap";

const EndingModal = ({ ending, endingHandler }) => {
  const { StWrapper } = BootStrap;
  const [changing, setChanging] = useState({
    
  })
  useEffect(() => {

  }, []);
  const { endingInfo } = useSelector((state) => state.gameSlice);

  return (
    <Moddal
      width="628px"
      height="438px"
      modal={ending}
      closeModal={endingHandler}
    >
      <StWrapper padding="30px" gap="26px">
        <Stimg src={ICON.RankGameOver} alt="게임오버" />
        <StUserContainer>
          <StRankBox one={true}>
            <StDescBox>
              <Stimg width="19px" height="20px" src={ICON.RankOne} alt="1등" />
              <div>{endingInfo[0]?.userName}</div>
            </StDescBox>
            <StDescBox>
              <div>{endingInfo[0]?.score}</div>
              <StScoreUp>
                {endingInfo[3] ? "+100" : endingInfo[2] ? "+70" : "+30"}
              </StScoreUp>
            </StDescBox>
          </StRankBox>
          {endingInfo[1] ? (
            <StRankBox>
              <StDescBox>
                <Stimg
                  width="19px"
                  height="20px"
                  src={ICON.RankSecond}
                  alt="2등"
                />
                <div>{endingInfo[1]?.userName}</div>
              </StDescBox>
              <StDescBox>
                <div>{endingInfo[1]?.score}</div>
                <StScoreUp color={endingInfo[3] ? "#00831d" : "#aaa"}>
                  {endingInfo[3] ? "+50" : endingInfo[2] ? "+40" : "-10"}
                </StScoreUp>
              </StDescBox>
            </StRankBox>
          ) : (
            <StRankNullBox></StRankNullBox>
          )}
          {endingInfo[2] ? (
            <StRankBox>
              <StDescBox>
                <Stimg
                  width="19px"
                  height="20px"
                  src={ICON.RankThird}
                  alt="3등"
                />
                <div>{endingInfo[2]?.userName}</div>
              </StDescBox>
              <StDescBox>
                <div>{endingInfo[2]?.score}</div>
                <StScoreUp color={endingInfo[3] ? "#00831d" : "#aaa"}>
                  {endingInfo[3] ? "+30" : "-20"}
                </StScoreUp>
              </StDescBox>
            </StRankBox>
          ) : (
            <StRankNullBox></StRankNullBox>
          )}
          {endingInfo[3] ? (
            <StRankBox>
              <StDescBox>
                <Stimg
                  width="19px"
                  height="20px"
                  src={ICON.RankForth}
                  alt="4등"
                />
                <div>{endingInfo[3]?.userName}</div>
              </StDescBox>
              <StDescBox>
                <div>{endingInfo[3]?.score}</div>
                <StScoreUp color="#aaa">-30</StScoreUp>
              </StDescBox>
            </StRankBox>
          ) : (
            <StRankNullBox></StRankNullBox>
          )}
        </StUserContainer>
        <StBtn onClick={endingHandler}>확인</StBtn>
      </StWrapper>
    </Moddal>
  );
};

export default EndingModal;

const Stimg = styled.img`
  width: ${({ width }) => width || "220px"};
  height: ${({ height }) => height || "102px"};
  object-fit: contain;
`;

const StUserContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;
const StRankBox = styled.div`
  font-size: 14px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  text-align: left;
  color: #111;

  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 468px;
  height: 40px;
  border-radius: 4px;
  padding: 10px 20px;

  border: ${({ one }) => {
    return one ? "1px solid #000" : "1px solid #ddd";
  }};
  background-color: ${({ one }) => {
    return one ? "#ffdf24" : "#f1f1f1";
  }};
`;
const StDescBox = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const StScoreUp = styled.div`
  width: 42px;
  height: 20px;
  font-size: 12px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  text-align: left;
  color: #000;
  border-radius: 999px;
  background-color: ${({ color }) => color || "#ff601c"};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StBtn = styled.button`
  margin-top: 10px;
  width: 150px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: solid 1px #000;
  background-color: #009320;
  border-radius: 6px;
  box-shadow: 0 3px 0 0 #000;

  font-size: 14px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  text-align: center;
  color: #000;
`;

const StRankNullBox = styled.div`
  width: 468px;
  height: 40px;
  border: none;
  background-color: none;
`;
