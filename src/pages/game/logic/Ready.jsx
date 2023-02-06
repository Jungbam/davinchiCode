import React, { useState, useEffect } from "react";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { BootStrap } from "../../BootStrap";
import { StButton } from "../../Button";

const Ready = ({ readyHandler, goSelecetTile }) => {
  const { StTitle, StBtnList } = BootStrap;
  const [ready, setReady] = useState(false);
  const [second, setSecond] = useState(String(5));
  const [throttle, setThrottle] = useState(false)
  const { gameInfo, trigger } = useSelector((state) => state.gameSlice);
  const { roomInfo } = useSelector((state) => state.gameSlice);
  
  const readyMembers = gameInfo?.users.filter((el) => el?.isReady === true);
  const gameStart = useRef(null);
  const interval = useRef(null);
  const count = useRef(5);
  const navigate = useNavigate();
  
  const onReadyHandler = () => {
    if(throttle) return
    if(!throttle){
      setThrottle(true)
      setReady((prev) => !prev);
      readyHandler();
      setTimeout(async()=>{
        setThrottle(false)
      },1000)
    }
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
        <StReady>게임이 시작됩니다. 남은시간 {second}초</StReady>
      ) : (
        <StReady>
          준비완료 ({readyMembers?.length}/{roomInfo?.maxMembers})
        </StReady>
      )}
      <StBtnList>
        {trigger ? (
          <StButton
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            variant="gray"
            size="md"
            disabled
          >
            준비취소
          </StButton>
        ) : ready ? (
          <StButton
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            variant="secondary"
            size="md"
            onClick={onReadyHandler}
          >
            준비취소
          </StButton>
        ) : (
          <StButton
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            variant="primary"
            size="md"
            onClick={onReadyHandler}
          >
            준비완료
          </StButton>
        )}
        <StButton size="md" onClick={goBackHandler}>
          방 나가기
        </StButton>
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
