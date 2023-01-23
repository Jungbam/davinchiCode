import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { ICON } from '../../Icons';

const Timer = () => {
  const [second, setSecond] = useState(String(30).padStart(2, '0'));
  const count = useRef(30);
  const interval = useRef(null);

  useEffect(() => {
    interval.current = setInterval(() => {
      count.current -= 1;
      setSecond(30-String(30-count.current).padStart(2, '0'));
      return ()=>{clearInterval(interval.current)}
    }, 1000);
  }, []);
  useEffect(() => {
    if (count.current <= 0) {
      clearInterval(interval.current)
      alert('시간오버')
    }
  }, [second]);

  return (
    <StTimer>
      <img src={ICON.iconTimer} alt="icon" />
      <StTimerBar>
          <StTimeLimit timer={second}/>
      </StTimerBar>
      <StSecond second={second}>{second} 초</StSecond>
    </StTimer>
  );
};

export default Timer;
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
const StTimerBar = styled.div`
  width: 486px;
  height: 16px;
  border: solid 1px #000;
  background-color: #fff;
  border-radius: 4px;
`;
const StTimeLimit = styled.div`
  width: ${({ timer }) => {
    return `${(486*timer/30)}px`;
  }};
  height: 100%;
  background-color: #009320;
  border-radius: 3px 0 0 3px;
`;
const StSecond = styled.span`
color : ${({ second }) => {
  if(second<10) return `red`;
  else return 'black'
  }};
  
`