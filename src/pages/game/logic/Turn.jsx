import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import MyTurn from "./MyTurn";
import OtherTurn from "./OtherTurn";
import useSound from "use-sound";
import { Sounds } from "../../../pages/sounds";

const Turn = ({ GameTurn, userId }) => {
  const [play] = useSound(Sounds.Test);
  useEffect(() => {
    play();
  }, []);
  const { turn } = useSelector((state) => state.gameSlice.gameInfo);
  if (turn === userId) return <MyTurn GameTurn={GameTurn} />;
  else return <OtherTurn />;
};

export default Turn;
