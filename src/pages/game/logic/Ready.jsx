import React, { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { BootStrap } from "../../BootStrap";

const Ready = ({ readyHandler, goSelecetTile }) => {
  const { StTitle, StBtn, StBtnList } = BootStrap;
  const [ready, setReady] = useState(false);
  const [second, setSecond] = useState(String(5));
  const { gameInfo, trigger } = useSelector((state) => state.gameSlice);
  const readyMembers = gameInfo?.users.filter((el) => el.isReady === true);
  const gameStart = useRef(null);
  const interval = useRef(null);
  const count = useRef(5);
  const navigate = useNavigate();

  const onReadyHandler = () => {
    setReady((prev) => !prev);
    readyHandler();
  };
  const goBackHandler = () => {
    navigate("/lobby");
  };

  useEffect(() => {
    if (trigger) {
      interval.current = setInterval(() => {
        count.current -= 1;
        setSecond(5 - String(5 - count.current));
      }, 1000);
      gameStart.current = setTimeout(() => {
        goSelecetTile();
      }, 5000);
    } else {
      clearInterval(interval.current);
      clearTimeout(gameStart.current);
    }
    return () => {
      clearTimeout(gameStart.current);
      clearInterval(interval.current);
    };
  }, [trigger]);
  return (
    <StWrapper>
      <StTitle>참여자가 모두 준비완료를 누르면 게임이 시작됩니다.</StTitle>
      {trigger ? (
        <StReady>{second}초 후 게임이 시작됩니다.</StReady>
      ) : (
        <StReady>준비완료 ({readyMembers.length}/4)</StReady>
      )}
      <StBtnList>
        <StBtn color="#ffdf24" onClick={onReadyHandler} disabled={trigger}>
          {ready ? "준비취소" : "준비완료"}
        </StBtn>
        <StBtn color="#fff" onClick={goBackHandler}>
          방 나가기
        </StBtn>
      </StBtnList>
    </StWrapper>
  );
};

export default Ready;

const StWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
`;

const StReady = styled.div`
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;

  margin-top: 16px;
`;
