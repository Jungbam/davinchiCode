import React, { useState } from "react";
import styled from "styled-components";
import IntroTile from "../logic/IntroTile";
import Ready from "../logic/Ready";
import { eventName } from "../../../helpers/eventName";
import { useDispatch } from "react-redux";
import Timer from "./Timer";
import Turn from "../logic/Turn";

const CenterBox = ({socket, roomID}) => {
  const [gameView, setGameView] = useState(<Ready readyHandler={readyHandler}/>)
  const [timer, setTimer] =useState(false)
  const dispatch = useDispatch()
  
  function readyHandler(){
    setGameView(<IntroTile selectTile={selectTile}/>)
    setTimer(true)
    // socket.current.emit(eventName.READY,{roomID : roomID,userID:123})
    // socket.current.on(eventName.GAME_START, ()=>{
    // setGameView(<IntroTile selectTile={selectTile}/>)
    // })
  };
  function selectTile(black){
    setGameView(<Turn/>)
        setTimer(false)
    // socket.current.emit(eventName.FIRST_DRAW, 123, black, roomID ,(myCards)=>{
    //   dispatch(setUsers(usersMok))
    // })
  }
  return (
    <StWrapper>
      <StGameField>
        <StOnGoingStatus>
          정말정말긴이름인데너무함님이 상대 지목을 진행 중입니다.
        </StOnGoingStatus>
        {gameView}
      </StGameField>
      {timer?<Timer/>:<StTimer/>}
    </StWrapper>
  );
};

export default CenterBox;

const StWrapper = styled.div`
  height: 364px;
  border: 1px solid #c2c2c2;
  width: 100%;
  margin-top: 8px;
  border-radius: 6px;
  border: solid 1px #111;
  background-color: #fff;
`;

const StGameField = styled.div`
  width: 100%;
  height: 324px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const StOnGoingStatus = styled.div`
  margin: 10px;
  background: #eeeeee;
  padding: 4px 16px;
  border-radius: 6px;
  border: solid 1px #111;
  background-color: #111;

  left: 0;
  top: 0;
  color: #ffdf24;
  font-family: Pretendard;
  font-size: 10px;
  font-weight: 500;
  display: inline-block;
  position: absolute;
  left: 0;
  top: 0;
`;

const StTimer = styled.div`
  height: 40px;
  border-top: solid 1px #ccc;
  background-color: #e1e1e1;
  border-radius: 0 0 6px 6px;

  display: flex;
  justify-content: center;
  align-items: center;

  gap: 5px;
  font-family: Pretendard;
  font-size: 10px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #222;
`;
