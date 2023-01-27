import React, { useState } from "react";
import styled from "styled-components";
import IntroTile from "../logic/IntroTile";
import Ready from "../logic/Ready";
import { eventName } from "../../../helpers/eventName";
import { useDispatch } from "react-redux";
import Turn from "../logic/Turn";
import SystemMessage from "../logic/SystemMessage";
import SelectPosition from "../logic/SelectPosition";
import {
  setIndicater,
  setInit,
  setTrigger,
  setUsers,
} from "../../../redux/modules/gameSlice";
import Indicate from "../logic/Indicate";
import SelectIndicatedUser from "../logic/SelectIndicatedUser";
import ResultSelect from "../logic/ResultSelect";
import GoStop from "../logic/GoStop";
import { useEffect } from "react";
import EndingModal from "./EndingModal";

const CenterBox = ({ socket, roomId,userId }) => {
  const [gameView, setGameView] = useState(
    <Ready readyHandler={readyHandler} goSelecetTile={goSelecetTile}/>
  );
  const [ending, setEnding] = useState(false);
  const dispatch = useDispatch();

  function readyHandler() {
    socket.current.emit(eventName.READY,userId)
  }
  function goSelecetTile(){
    setGameView(<IntroTile selectTile={selectTile}/>)
  }
  function selectTile(black) {
    socket.current.emit(eventName.FIRST_DRAW, userId, black ,(myCards)=>{
      dispatch(setUsers(myCards))
    })
  }
  function GameTurn(selectedColor) {
    socket.current.emit(eventName.COLOR_SELECTED, userId,selectedColor,(card)=>{
      setGameView(<SelectPosition card={card} cardPick={cardPick} selectIndicaterCard={selectIndicaterCard}/>)
    })
  }
  function cardPick(resultArray = []) {
    setGameView(<Indicate selectIndicaterCard={selectIndicaterCard} />);
  }
  function selectIndicaterCard(indicatedUser) {
    setGameView(
      <SelectIndicatedUser
        indicatedUser={indicatedUser}
        guessCard={guessCard}
      />
    );
  }
  function guessCard(indicatedUser, select) {
    const guessValue = {...select}
    socket.current.emit(eventName.GUESS, indicatedUser,guessValue)
  }
  function goStop(result) {
    if (result)
      setGameView(<GoStop nextTurn={nextTurn} goingContinue={goingContinue} />);
    else {
      setGameView(<Turn GameTurn={GameTurn} userId={userId}/>);
    }
  }
  function goingContinue() {
    dispatch(setIndicater(null));
    setGameView(<Indicate selectIndicaterCard={selectIndicaterCard} />);
  }
  function nextTurn() {
    socket.current.emit(eventName.NEXT_TURN)
    // dispatch(setIndicater(null));
    // dispatch(setUsers(nextGameInfo));
    // setGameView(<Turn GameTurn={GameTurn} />);
  }
  function endingHandler() {
    dispatch(setInit());
    setGameView(<Ready readyHandler={readyHandler} />);
  }
  
  useEffect(()=>{
    socket.current?.on(eventName.GAME_START, ()=>{
      dispatch(setTrigger())
    })
    socket.current?.on(eventName.ADD_READY,(gameInfo)=>{
      dispatch(setUsers(gameInfo))
    } )
    socket.current?.on(eventName.DRAW_RESULT,(gameInfo)=>{
      setGameView(<Turn GameTurn={GameTurn} userId={userId}/>)
      dispatch(setUsers(gameInfo))
    })
      socket.current?.on(eventName.RESULT_GUESS, (result,gameInfo)=>{
        setGameView(<ResultSelect gameInfo={gameInfo} result={result} goStop={goStop}/>)
      })
     socket.current?.on(eventName.NEXT_GAMEINFO,(nextGameInfo)=>{
        dispatch(setUsers(nextGameInfo))
        setGameView(<Indicate/>)
      })
    socket.current?.on(eventName.GAMEOVER,()=>{
      setEnding(true)
    })
    return ()=>{
      setEnding(false)
      dispatch(setInit())
    }
  },[socket.current])

  return (
    <StWrapper>
      <StGameField>
        <SystemMessage />
        {gameView}
      </StGameField>
      <EndingModal
        ending={ending}
        setEnding={setEnding}
        endingHandler={endingHandler}
      />
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
