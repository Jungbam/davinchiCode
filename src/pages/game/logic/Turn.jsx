import React from "react";
import { useSelector } from "react-redux";
import MyTurn from "./MyTurn";
import OtherTurn from "./OtherTurn";

const Turn = ({ GameTurn, userId }) => {
  const { turn } = useSelector((state) => state.gameSlice.gameInfo);
  if (turn === userId) return <MyTurn GameTurn={GameTurn} />;
  else return <OtherTurn text="타일 뽑기"/>;
};

export default Turn;
