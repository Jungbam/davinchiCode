import React, { useState } from "react";
import styled from "styled-components";
import IntroTile from "../logic/IntroTile";
import Ready from "../logic/Ready";
import { eventName } from "../../../helpers/eventName";
import { useDispatch } from "react-redux";
import Turn from "../logic/Turn";
import SystemMessage from "../logic/SystemMessage";
import SelectPosition from "../logic/SelectPosition";

const CenterBox = ({socket, roomID}) => {
  const [gameView, setGameView] = useState(<Ready readyHandler={readyHandler}/>)
  const dispatch = useDispatch()
  
  // 게임 로직 순서대로 함수가 그려지도록(가독성) 함수선언식 사용
  function readyHandler(){
    setGameView(<IntroTile selectTile={selectTile}/>)
    // socket.current.emit(eventName.READY,{roomID : roomID,userID:123})
    // socket.current.on(eventName.GAME_START, ()=>{
    // setGameView(<IntroTile selectTile={selectTile}/>)
    // })
  };
  function selectTile(black){
    setGameView(<Turn GameTurn={GameTurn}/>)
    // socket.current.emit(eventName.FIRST_DRAW, 123, black, roomID ,(myCards)=>{
    //   dispatch(setUsers(myCards))
    // })
    // socket.current.on(eventName,(gameInfo)=>{
    //   setGameView(<Turn GameTurn={GameTurn}/>)
    //   setTimer(false)
    //   dispatch(setUsers(gameInfo))
    // })
  }
  function GameTurn(selectedColor){
    // socket.current.emit(eventName, selectedColor)
    // socket.current.on(event,(card)=>{
    //   setGameView(<SelectPosition card={card}/>)
    //   setTimer(true)
    // })
    const card = {
      value : Math.floor(Math.random()*12),
      color : selectedColor
    }
    setGameView(<SelectPosition card={card} cardPick={cardPick}/>)
  }
  function cardPick(resultArray=[]){
    socket.current.emit(eventName, )
  }
  return (
    <StWrapper>
      <StGameField>
        <SystemMessage/>
        {gameView}
      </StGameField>
      {/* {timer?<Timer timeOver={timeOver}/>:<StTimer/>} */}
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
