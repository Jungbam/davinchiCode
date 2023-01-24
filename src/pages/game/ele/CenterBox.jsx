import React, { useState } from "react";
import styled from "styled-components";
import IntroTile from "../logic/IntroTile";
import Ready from "../logic/Ready";
import { eventName } from "../../../helpers/eventName";
import { useDispatch } from "react-redux";
import Turn from "../logic/Turn";
import SystemMessage from "../logic/SystemMessage";
import SelectPosition from "../logic/SelectPosition";
import { setUsers } from "../../../redux/modules/gameSlice";
import Indicate from "../logic/Indicate";
import SelectIndicatedUser from "../logic/SelectIndicatedUser";
import ResultSelect from "../logic/ResultSelect";

const CenterBox = ({socket, roomID}) => {
  const [gameView, setGameView] = useState(<Ready readyHandler={readyHandler}/>)
  const dispatch = useDispatch()
  
  // 게임 로직 순서대로 함수가 그려지도록(가독성) 함수선언식 사용
  function readyHandler(){
    setGameView(<IntroTile selectTile={selectTile}/>)
    // socket.current.emit(eventName.READY,roomID : roomID,userID:123)
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
    // socket.current.emit(eventName.COLOR_SELECTED, selectedColor,(card)=>{
    //   setGameView(<SelectPosition card={card}/>)
    //   setTimer(true)
    // })
    // 방에 다른 사람들
    // socket.current.on(event,(card)=>{
    //   setGameView(<SelectPosition card={card}/>)
    //   setTimer(true)
    // })
    const card = {
      // value : Math.floor(Math.random()*12),
      value : 12,
      color : selectedColor
    }
    setGameView(<SelectPosition card={card} cardPick={cardPick} selectIndicaterCard={selectIndicaterCard}/>)
  }
  function cardPick(resultArray=[]){
    // socket.current.emit(eventName, resultArray)
    // socket.current.on(evemtName,(gameInfo)=>{
    //   dispatch(setUsers(gameInfo))
    // })
    setGameView(<Indicate selectIndicaterCard={selectIndicaterCard}/>)
  }
  function selectIndicaterCard(indicatedUser){
    setGameView(<SelectIndicatedUser indicatedUser={indicatedUser} guessCard={guessCard}/>)
  }
  function guessCard(indicatedUser, select){
    // 추측할때 서버에 보내주는 값 : {userId : indicatedUser.userId, card :{cardIndex : 1, value : 4}}
    // const guessValue = {userId : indicatedUser.userId, card :select}
    // socket.current.emit(eventName.GUESS, guessValue)
    // socket.current.on(eventName.RESULT_GUESS, (result,gameInfo)=>{
    //   setGameView(<ResultSelect gameInfo={gameInfo} result={result}/>)
    // })
    const gameInfo ={
      blackCards: 4,
      whiteCards: 4,
      turn: 1,
      users: [
         {
            userId: 1,
            nickName: '익명1',
            userProfileImg: "https://cdn.pixabay.com/photo/2023/01/12/15/05/flamingo-7714344_640.jpg",
            isReady:false,
            hand: [ 
              {
                 color: 'black', 
                 value: '1', 
                 isOpen: false 
                }, 
              {
                 color: 'black', 
                 value: '3', 
                 isOpen: false 
                }, 
              {
                 color: 'white', 
                 value: '4', 
                 isOpen: false 
                }, 
             ]
          },
         {
            userId: 2,
            nickName: '익명2',
            userProfileImg: "https://cdn.pixabay.com/photo/2022/07/11/08/44/tower-7314495_1280.jpg",
            isReady:false,
            hand: [ 
              {
                 color: 'white', 
                 value: '1', 
                 isOpen: true 
                }, 
              {
                 color: 'black', 
                 value: 'Back', 
                 isOpen: false 
                }, 
              {
                 color: 'white', 
                 value: 'Back', 
                 isOpen: false 
                }, 
             ]
          },
         {
            userId: 3,
            nickName: '익명3',
            userProfileImg: "https://cdn.pixabay.com/photo/2023/01/12/07/19/rat-7713508_640.jpg",
            isReady:false,
            hand: [ 
              {
                 color: 'black', 
                 value: 'Back', 
                 isOpen: false 
                }, 
              {
                 color: 'black', 
                 value: 'Back', 
                 isOpen: false 
                }, 
              {
                 color: 'white', 
                 value: 'Back', 
                 isOpen: false 
                }, 
             ]
          },
        ]
      }
    const result = 'true'
    setGameView(<ResultSelect gameResult={gameInfo} result={result}/>)
  }
  return (
    <StWrapper>
      <StGameField>
        <SystemMessage/>
        {gameView}
      </StGameField>
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