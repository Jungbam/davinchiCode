import React, { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Ready = ({readyHandler,goSelecetTile}) => {
  const [ready, setReady] = useState(false)
  const [second, setSecond] = useState(String(5))
  const {gameInfo, trigger} = useSelector(state=>state.gameSlice)
  const readyMembers = gameInfo?.users.filter(el=>el.isReady===true)
  const gameStart = useRef(null)
  const interval = useRef(null)
  const count = useRef(5);
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onReadyHandler = ()=>{
    setReady(prev=>!prev)
    readyHandler()
  }
  const goBackHandler = ()=>{
    navigate('/lobby')
  }
  useEffect(()=>{
    if(trigger){
      interval.current = setInterval(()=>{
      count.current -= 1;
      setSecond(5-String(5-count.current));
      },1000)
      gameStart.current = setTimeout(()=>{
        goSelecetTile()
      },5000)
    }else{
      clearInterval(interval.current)
      clearTimeout(gameStart.current)
    }
    return ()=>{
      clearTimeout(gameStart.current)
      clearInterval(interval.current)
    }
  },[trigger])
  return (
    <StWrapper>
      {trigger?<p>{second}초 후 게임이 시작됩니다.</p>:<p>{readyMembers.length}명 준비완료</p>}
      <StConfirmBtn onClick={onReadyHandler} disabled={trigger}>{ready?'준비취소':'준비완료'}</StConfirmBtn>
      <StConfirmBtn onClick={goBackHandler}>방 나가기</StConfirmBtn>
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
