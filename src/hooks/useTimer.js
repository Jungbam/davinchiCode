import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";

const useTimer = (trigger, min) => {
  const [second, setSecond] = useState(String(min));
  const gameStart = useRef(null);
  const interval = useRef(null);
  const count = useRef(min);

  useEffect(() => {
    if (trigger) {
      interval.current = setInterval(() => {
        count.current -= 1;
        setSecond(min - String(min - count.current));
      }, 1000);
      gameStart.current = setTimeout(() => {}, min * 1000);
    } else {
      clearInterval(interval.current);
      clearTimeout(gameStart.current);
    }
    return () => clearTimeout(gameStart.current);
  }, [trigger]);

  return { second };
};

export default useTimer;
