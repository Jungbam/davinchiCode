import { motion } from "framer-motion";
import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { ICON } from "../../../helpers/Icons";

const scoreVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      delay: 1,
      duration: 0.3,
    },
  },
};

const changeVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
};

const EndingUser = ({ user, one, rank }) => {
  const [changing, setChanging] = useState(false);
  const [scoreValue, setScoreValue] = useState(user?.prevScore);
  const [trig, setTrig] = useState(false);
  const count = useRef(null);
  const scoreChange = useRef(null);
  const rankSrc = () => {
    switch (rank) {
      case 1:
        return (
          <Stimg width="19px" height="20px" src={ICON.RankOne} alt="순위" />
        );
      case 2:
        return (
          <Stimg width="19px" height="20px" src={ICON.RankSecond} alt="순위" />
        );
      case 3:
        return (
          <Stimg width="19px" height="20px" src={ICON.RankThird} alt="순위" />
        );
      case 4:
        return (
          <Stimg width="19px" height="20px" src={ICON.RankForth} alt="순위" />
        );
      default:
        return;
    }
  };
  useEffect(() => {
    count.current = setTimeout(() => {
      setChanging(true);
      setTrig(true);
    }, 1000);
    scoreChange.current = setTimeout(() => {
      setScoreValue(user?.score);
    }, 2000);
    return () => {
      clearTimeout(count.current);
      clearTimeout(scoreChange.current);
      setChanging(false);
    };
  }, []);
  return (
    <StRankBox one={one}>
      <StDescBox>
        {rankSrc()}
        <div>{user?.userName}</div>
      </StDescBox>
      <StDescBox>
        {trig ? (
          <motion.div
            style={{ fontSize: "14px", fontWeight: "600" }}
            variants={scoreVariants}
            initial="hidden"
            animate="visible"
          >
            {scoreValue}
          </motion.div>
        ) : (
          <StDiv>{scoreValue}</StDiv>
        )}

        {changing ? (
          <StScoreUp
            variants={changeVariants}
            initial="hidden"
            animate="visible"
            changed={user?.change}
          >
            {user?.change}
          </StScoreUp>
        ) : (
          <StScoreUpNull></StScoreUpNull>
        )}
      </StDescBox>
    </StRankBox>
  );
};

export default EndingUser;

const StRankBox = styled.div`
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
  text-align: left;
  color: #111;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 468px;
  height: 40px;
  border-radius: 4px;
  padding: 10px 20px;
  border: ${({ one }) => {
    return one ? "1px solid #000" : "1px solid #ddd";
  }};
  background-color: ${({ one }) => {
    return one ? "#ffdf24" : "#f1f1f1";
  }};
`;
const StDescBox = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;
const Stimg = styled.img`
  width: ${({ width }) => width || "220px"};
  height: ${({ height }) => height || "102px"};
  object-fit: contain;
`;
const StScoreUp = styled(motion.div)`
  width: 42px;
  height: 20px;
  font-size: 12px;
  font-weight: bold;
  line-height: 1;
  text-align: left;
  color: #000;
  border-radius: 999px;
  background-color: ${({ changed }) =>
    changed.includes("-") ? "#aaa" : "#ff601c"};
  display: flex;
  justify-content: center;
  align-items: center;
`;
const StScoreUpNull = styled.div`
  width: 42px;
  height: 20px;
  font-size: 12px;
  line-height: 1;
  background-color: none;
  border: none;
`;

const StDiv = styled.div`
  font-size: 14px;
  font-weight: 600;
`;
