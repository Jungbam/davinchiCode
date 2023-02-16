import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Moddal from "../../../components/form/modal/Moddal";
import { ICON } from "../../../helpers/Icons";
import { BootStrap } from "../../../styles/BootStrap";
import EndingUser from "./EndingUser";

const EndingModal = ({ ending = true, endingHandler = () => {} }) => {
  const { StWrapper } = BootStrap;
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
          <EndingUser val={"true"} user={endingInfo[0]} rank={1} />
          {endingInfo[1] ? (
            <EndingUser val={"false"} user={endingInfo[1]} rank={2} />
          ) : (
            <StRankNullBox></StRankNullBox>
          )}
          {endingInfo[2] ? (
            <EndingUser val={"false"} user={endingInfo[2]} rank={3} />
          ) : (
            <StRankNullBox></StRankNullBox>
          )}
          {endingInfo[3] ? (
            <EndingUser val={"false"} user={endingInfo[3]} rank={4} />
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
  line-height: 1;
  text-align: center;
  color: #000;
`;
const StRankNullBox = styled.div`
  width: 468px;
  height: 40px;
  border: none;
  background-color: none;
`;
