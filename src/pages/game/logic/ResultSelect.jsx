import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import useSound from "use-sound";
import { Sounds } from "../../../helpers/sounds";
import { setUsers } from "../../../redux/modules/gameSlice";
import { BootStrap } from "../../BootStrap";
import DavinchiCard from "../ele/DavinchiCard";

const ResultSelect = ({ gameResult, security, result, goStop }) => {
  const { StWrapper, StCardArea } = BootStrap;
  const timer = useRef(null);
  const setView = useRef(null);
  const dispatch = useDispatch();
  const [play] = useSound(Sounds.Success);
  const { indicated, gameInfo } = useSelector((state) => state.gameSlice);
  const indicatedUser = gameInfo?.users?.filter(
    (el) => el.userId === indicated
  );
  const turnUser = gameInfo?.users?.filter((el) => el.userId === gameInfo.turn);

  useEffect(() => {
    if (result) play();
    else play();
    timer.current = setTimeout(() => {
      dispatch(setUsers(gameResult));
    }, 2000);
    setView.current = setTimeout(() => {
      goStop(result, security);
    }, 3000);
    return () => {
      clearTimeout(timer.current);
      clearTimeout(setView.current);
    };
  }, []);

  useEffect(() => {}, [result]);

  return (
    <StWrapper>
      <StReult>
        <StText>타일 맞추기 {result ? "성공!" : "실패!"}</StText>
        <StUnderLine result={result.toString()} />
      </StReult>
      <StP>
        <span>{turnUser[0]?.userName}</span>님이 타일 맞추기에{" "}
        {result ? "성공!" : "실패!"}
        하셨습니다.
      </StP>
      <StP>
        <span>
          {result ? indicatedUser[0]?.userName : turnUser[0]?.userName}
        </span>
        님의 타일이 공개됩니다.
      </StP>
      <StCardArea childwidth="56px" height="80px" gap="20px">
        <DavinchiCard card={{ value: "Back", color: "white" }} size="xl" />
        <DavinchiCard card={{ value: "Back", color: "black" }} size="xl" />
      </StCardArea>
    </StWrapper>
  );
};

export default ResultSelect;

const StReult = styled.div`
  position: relative;

  margin: 84px 0 10px 0;
  font-weight: 700;
  font-size: 26px;
  line-height: 31px;
  display: flex;
  justify-content: center;
`;

const StUnderLine = styled.div`
  position: absolute;
  width: 186px;
  height: 16px;
  background: #cecece;
  background: ${({ result }) => {
    return result ? "#FFDF24" : "#cecece;";
  }};
  bottom: 0;
`;

const StText = styled.div`
  z-index: 300;
`;

const StP = styled.p`
  font-size: 14px;
  line-height: 18px;
  & span {
    font-weight: 700;
  }
`;
