import React from "react";
import useSound from "use-sound";
import { Sounds } from "../helpers/sounds";

const useSounds = () => {
  const [success] = useSound(Sounds.Success);
  const [fail] = useSound(Sounds.Fail);
  const [Ten] = useSound(Sounds.Ten);
  const [GameOver] = useSound(Sounds.GameOver);
  const [Turn] = useSound(Sounds.Turn);
  const [Click] = useSound(Sounds.Click);
  const SoundEffect = {
    success,
    fail,
    Ten,
    GameOver,
    Turn,
    Click,
  };
  return SoundEffect;
};

export default useSounds;
