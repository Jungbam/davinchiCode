import React, { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Ready = ({ readyHandler, goSelecetTile }) => {
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

const StTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  width: 388px;
  height: 32px;

  border: 1px solid #111111;
  box-shadow: 0px 3px 0px #111;
  border-radius: 6px;

  margin-top: 100px;
`;

const StBtnList = styled.div`
  width: 266px;
  height: 44px;
  display: flex;
  justify-content: space-between;

  margin-top: 32px;
`;

const StBtn = styled.button`
  width: 130px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  background: ${({ color }) => color};
  border: 1px solid #000000;
  box-shadow: 0px 3px 0px #000000;
  border-radius: 6px;

  font-weight: 700;
  font-size: 18px;
  line-height: 100%;
  color: #111;
`;

const StReady = styled.div`
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;

  margin-top: 16px;
`;

const StConfirmBtn = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 32px;
  background: #ffdf24;
  border: 1px solid #000000;
  box-shadow: 0px 3px 0px #000000;
  border-radius: 6px;
  font-weight: 700;
  font-size: 14px;
  line-height: 100%;
  margin-top: 14px;
`;
