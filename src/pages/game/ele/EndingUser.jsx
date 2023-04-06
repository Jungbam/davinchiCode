import { motion } from "framer-motion";
import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { ICON } from "../../../helpers/Icons";
import { Variants } from "../../../helpers/Variants";

const EndingUser = ({ user, val, rank }) => {
  const [changing, setChanging] = useState(false);
  const [scoreValue, setScoreValue] = useState(user?.prevScore);
  const [trig, setTrig] = useState(false);
  const count = useRef(null);
  const scoreChange = useRef(null);
  function numberWithCommas(x = 0) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  }
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
    <StRankBox val={val}>
      <StDescBox>
        {rankSrc()}
        <div>{user?.userName}</div>
      </StDescBox>
      <StDescBox>
        {trig ? (
          <motion.div
            style={{ fontSize: "14px", fontWeight: "600" }}
            variants={Variants.score}
            initial="hidden"
            animate="visible"
          >
            {numberWithCommas(scoreValue)}
          </motion.div>
        ) : (
          <StDiv variants={Variants.score} initial="hidden" animate="visible">
            {numberWithCommas(scoreValue)}
          </StDiv>
        )}

        {changing ? (
          <StScoreUp val={val} changed={user?.change}>
            <motion.span
              variants={Variants.change}
              initial="hidden"
              animate="visible"
            >
              {user?.change}
            </motion.span>
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
  border: ${({ val }) => {
    return val === "true" ? "1px solid #000" : "1px solid #ddd";
  }};
  background-color: ${({ val }) => {
    return val === "true" ? "#ffdf24" : "#f1f1f1";
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
const StScoreUp = styled(motion.button)`
  min-width: 42px;
  height: 20px;
  border: none;
  padding: 4px 6px;
  font-size: 12px;
  font-weight: bold;
  line-height: 1;
  color: #000;
  border-radius: 999px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ changed, one }) =>
    one ? "#ff601c" : changed.includes("-") ? "#aaa" : "#00831d"};
`;
const StScoreUpNull = styled.div`
  width: 42px;
  height: 20px;
  font-size: 12px;
  line-height: 1;
  background-color: none;
  border: none;
`;

const StDiv = styled(motion.div)`
  font-size: 14px;
  font-weight: 600;
`;
