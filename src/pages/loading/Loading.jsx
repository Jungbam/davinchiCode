import { motion, useCycle, AnimatePresence, useAnimation } from "framer-motion";
import React from "react";
import styled from "styled-components";

const loaderVariants = {
  animationOne: {
    x: [-20, 20],
    y: [0, -30],
    transition: {
      x: { yoyo: Infinity, duration: 0.5 },
      y: { yoyo: Infinity, duration: 0.25, ease: "easeOut" },
    },
  },
  animationTwo: {
    y: [0, -40],
    x: 0,
    transition: {
      y: {
        yoyo: Infinity,
        duration: 0.25,
        ease: "easeOut",
      },
    },
  },
};

const Loading = () => {
  const { start, stop } = useAnimation();

  const [animation, cycleAnimation] = useCycle("animationOne", "animationTwo");
  // const controls = useAnimation();
  return (
    <AnimatePresence>
      <StWrapper>
        <motion.div
          className="loader"
          variants={loaderVariants}
          animate={animation}
          // loop={Infinity}
        ></motion.div>
        <div onClick={() => cycleAnimation()}>Cycle Loader</div>
        <StContainer>로딩 이미지</StContainer>
        <StDiv as={motion.div} variants={loaderVariants} animate="animationOne">
          로딩 중입니다.
        </StDiv>
      </StWrapper>
    </AnimatePresence>
  );
};

export default Loading;

const StWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const StContainer = styled.div`
  width: 300px;
  height: 300px;
  background-color: #d9d9d9;
  color: #444;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const StDiv = styled.div`
  font-size: 18px;
  font-weight: 500;
  color: #ffdf24;
  margin-top: 30px;
`;
