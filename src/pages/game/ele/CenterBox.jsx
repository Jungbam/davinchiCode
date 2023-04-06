import React, { useState } from "react";
import styled from "styled-components";
import { eventName } from "../../../helpers/eventName";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  setEndingInfo,
  setGameStart,
  setIndicater,
  setInit,
  setInitReadyBtn,
  setRoom,
  setTrigger,
  setUsers,
} from "../../../redux/modules/gameSlice";

// 메모이제이션 작업

import Indicate from "../logic/Indicate";
import SelectIndicatedUser from "../logic/SelectIndicatedUser";
import SystemMessage from "../logic/SystemMessage";
import SelectPosition from "../logic/SelectPosition";
import ResultSelect from "../logic/ResultSelect";
import GoStop from "../logic/GoStop";
import Ready from "../logic/Ready";
import IntroTile from "../logic/IntroTile";
import EndingModal from "./EndingModal";
import useSounds from "../../../hooks/useSounds";
import NoSecurity from "../logic/NoSecurity";

import Turn from "../logic/Turn";
import { useCallback } from "react";
const CenterBox = ({ socket, userId }) => {
  const SoundEffect = useSounds();
  const readyHandler = useCallback(() => {
    socket.current.emit(eventName.READY);
  }, [socket]);
  const [gameView, setGameView] = useState(
    <Ready readyHandler={readyHandler} goSelecetTile={goSelecetTile} />
  );
  const [ending, setEnding] = useState(false);
  const dispatch = useDispatch();

  function goSelecetTile() {
    setGameView(<IntroTile selectTile={selectTile} />);
  }
  function selectTile(black) {
    socket.current.emit(eventName.FIRST_DRAW, black, (myCards) => {
      dispatch(setUsers(myCards));
    });
  }
  function GameTurn(selectedColor) {
    socket.current.emit(eventName.COLOR_SELECTED, selectedColor, (card) => {
      setGameView(
        <SelectPosition
          card={card}
          userId={userId}
          cardPick={cardPick}
          selectIndicaterCard={selectIndicaterCard}
        />
      );
    });
  }
  function cardPick(resultArray = null) {
    socket.current.emit(eventName.PLACE_JOKER, resultArray);
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
    const guessValue = { ...select };
    socket.current.emit(eventName.GUESS, indicatedUser[0]?.userId, guessValue);
  }
  function goStop(result, security) {
    dispatch(setIndicater(null));
    if (result)
      setGameView(
        <GoStop
          nextTurn={nextTurn}
          goingContinue={goingContinue}
          userId={userId}
        />
      );
    else if (!result && security) {
      setGameView(
        <Turn
          GameTurn={GameTurn}
          userId={userId}
          selectIndicaterCard={selectIndicaterCard}
        />
      );
    } else {
      setGameView(<NoSecurity userId={userId} openMine={openMine} />);
    }
  }
  function goingContinue() {
    dispatch(setIndicater(null));
    setGameView(
      <Indicate selectIndicaterCard={selectIndicaterCard} userId={userId} />
    );
  }
  function nextTurn() {
    socket.current.emit(eventName.NEXT_TURN);
    setGameView(
      <Turn
        GameTurn={GameTurn}
        userId={userId}
        selectIndicaterCard={selectIndicaterCard}
      />
    );
  }
  function openMine(selectIndex) {
    socket.current.emit(eventName.OPEN_MINE, selectIndex);
  }
  function endingHandler() {
    setEnding(false);
    setGameView(
      <Ready readyHandler={readyHandler} goSelecetTile={goSelecetTile} />
    );
  }

  useEffect(() => {
    socket.current?.on(eventName.GAME_START, (roomInfo) => {
      dispatch(setInitReadyBtn());
      dispatch(setTrigger(true));
      dispatch(setRoom(roomInfo));
    });
    socket.current?.on(eventName.ADD_READY, (gameInfo, roomInfo) => {
      dispatch(setInitReadyBtn(true));
      dispatch(setUsers(gameInfo));
      dispatch(setRoom(roomInfo));
    });
    socket.current?.on(eventName.DRAW_RESULT, (gameInfo) => {
      setGameView(
        <Turn
          GameTurn={GameTurn}
          userId={userId}
          selectIndicaterCard={selectIndicaterCard}
        />
      );
      dispatch(setGameStart(true));
      dispatch(setUsers(gameInfo));
    });
    socket.current?.on(eventName.ONGOING, (gameInfo) => {
      setGameView(
        <Indicate selectIndicaterCard={selectIndicaterCard} userId={userId} />
      );
      dispatch(setUsers(gameInfo));
    });
    socket.current?.on(eventName.RESULT_GUESS, (result, security, gameInfo) => {
      if (result) SoundEffect.success();
      else SoundEffect.fail();
      setGameView(
        <ResultSelect
          gameResult={gameInfo}
          security={security}
          result={result}
          goStop={goStop}
        />
      );
    });
    socket.current?.on(eventName.NEXT_GAMEINFO, (nextGameInfo) => {
      dispatch(setUsers(nextGameInfo));
      setGameView(
        <Turn
          GameTurn={GameTurn}
          userId={userId}
          selectIndicaterCard={selectIndicaterCard}
        />
      );
    });
    socket.current?.on(eventName.GAMEOVER, (endingInfo, gameInfo) => {
      SoundEffect.GameOver();
      dispatch(setInit());
      dispatch(setEndingInfo(endingInfo));
      dispatch(setUsers(gameInfo));
      dispatch(setTrigger(false));
      setEnding(true);
    });
    socket.current?.on(eventName.LEAVE_USER, (gameInfo, roomInfo) => {
      dispatch(setUsers(gameInfo));
      dispatch(setRoom(roomInfo));
    });
    return () => {};
  }, [socket.current]);

  return (
    <StWrapper>
      <StGameField>
        <SystemMessage />
        {gameView}
      </StGameField>
      <EndingModal ending={ending} endingHandler={endingHandler} />
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
  background-color: #f6f6f6;
`;
const StGameField = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border: 1px double transparent;
`;
