import React from "react";
import { useSelector } from "react-redux";
import OtherTurn from "./OtherTurn";
import ThrowMine from "./ThrowMine";

const NoSecurity = ({ userId, openMine }) => {
  const { turn } = useSelector((state) => state.gameSlice.gameInfo);
  if (turn === userId) return <ThrowMine userId={userId} openMine={openMine} />;
  else return <OtherTurn text="버릴 패 선택하기" />;
};

export default NoSecurity;
