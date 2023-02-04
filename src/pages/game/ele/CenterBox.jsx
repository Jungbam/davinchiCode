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
  setEndingInfo,
  setGameStart,
  setIndicater,
  setInit,
  setInitReadyBtn,
  setRoom,
  setTrigger,
  setUsers,
} from "../../../redux/modules/gameSlice";
import Indicate from "../logic/Indicate";
import SelectIndicatedUser from "../logic/SelectIndicatedUser";
import ResultSelect from "../logic/ResultSelect";
import GoStop from "../logic/GoStop";
import { useEffect } from "react";
import EndingModal from "./EndingModal";
import ThrowMine from "../logic/ThrowMine";
import { IMG } from "../../../helpers/image";
import useSounds from "../../../hooks/useSounds";

const CenterBox = ({ socket, userId }) => {
  const SoundEffect = useSounds()
  const [gameView, setGameView] = useState(
    <Ready readyHandler={readyHandler} goSelecetTile={goSelecetTile} />
  );
  const [ending, setEnding] = useState(false);
  const dispatch = useDispatch();

  function readyHandler() {
    socket.current.emit(eventName.READY);
  }
  function goSelecetTile() {
    setGameView(<IntroTile selectTile={selectTile} />);
  }
  function selectTile(black) {
    socket.current.emit(eventName.FIRST_DRAW, black, (myCards) => {
      dispatch(setUsers(myCards));
    });
  }
  function GameTurn(selectedColor) {
    socket.current.emit(
      eventName.COLOR_SELECTED,
      selectedColor,
      (card) => {
        setGameView(
          <SelectPosition
            card={card}
            cardPick={cardPick}
            selectIndicaterCard={selectIndicaterCard}
          />
        );
      }
    );
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
    socket.current.emit(eventName.GUESS, indicatedUser[0].userId, guessValue);
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
      setGameView(<Turn GameTurn={GameTurn} userId={userId} />);
    } else {
      setGameView(<ThrowMine userId={userId} openMine={openMine} />);
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
    setGameView(<Turn GameTurn={GameTurn} userId={userId} />);
  }
  function openMine(userId, select) {
    const openMine = { ...select };
    socket.current.emit(eventName.GUESS, userId, openMine);
    setGameView(<Turn GameTurn={GameTurn} userId={userId} />);
  }
  function endingHandler() {
    dispatch(setInit());
    setEnding(false);
    setGameView(<Ready readyHandler={readyHandler} goSelecetTile={goSelecetTile} />);
  }

  useEffect(() => {
    socket.current?.on(eventName.GAME_START, () => {
      dispatch(setInitReadyBtn());
      dispatch(setTrigger(true));
    });
    socket.current?.on(eventName.ADD_READY, (gameInfo,roomInfo) => {
      dispatch(setInitReadyBtn(true));
      dispatch(setUsers(gameInfo));
      dispatch(setRoom(roomInfo))
    });
    socket.current?.on(eventName.DRAW_RESULT, (gameInfo) => {
      setGameView(<Turn GameTurn={GameTurn} userId={userId} />);
      dispatch(setGameStart(true))
      dispatch(setUsers(gameInfo));
    });
    socket.current?.on(eventName.ONGOING, (gameInfo) => {
      setGameView(
        <Indicate selectIndicaterCard={selectIndicaterCard} userId={userId} />
      );
      dispatch(setUsers(gameInfo));
    });
    socket.current?.on(eventName.RESULT_GUESS, (result, security, gameInfo) => {
      if(result) SoundEffect.success()
      else SoundEffect.fail()
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
      setGameView(<Turn GameTurn={GameTurn} userId={userId} />);
    });
    socket.current?.on(eventName.GAMEOVER, (endingInfo, gameInfo) => {
      dispatch(setEndingInfo(endingInfo));
      dispatch(setUsers(gameInfo));
      dispatch(setTrigger(false));
      setEnding(true);
    });
    socket.current?.on(eventName.LEAVE_USER, (gameInfo)=>{
      dispatch(setUsers(gameInfo))
    })
    return () => {
    };
  }, [socket.current]);

  return (
    <StWrapper>
      <StGameField>
        <SystemMessage />
        {gameView}
      </StGameField>
      <EndingModal
        ending={ending}
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
  background-color: whitesmoke;
  background-image: url(${IMG.gameBackground});
`;
const StGameField = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border: 1px double transparent;
`;
