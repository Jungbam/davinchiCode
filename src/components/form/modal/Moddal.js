import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import styled from "styled-components";
import exitModal from "../../../assets/icons/ico_modal_cancle.svg";
import useSound from "use-sound";
import { Sounds } from "../../../helpers/sounds";

const buttonVariants = {
  hover: {
    scale: 1.1,
    textShadow: "0px 0px 8px rgb(255,255,255)",
    boxShadow: "0px 0px 8px rgb(255,255,255)",
    transition: {
      duration: 0.3,
    },
  },
};

const backdrop = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
};

const modalVariants = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      delay: 0.3,
    },
  },
};

const Moddal = ({ modal, width, height, closeModal, children }) => {
  const styles = { width, height };
  const [click] = useSound(Sounds.Click);
  return (
    <AnimatePresence>
      {modal && (
        <StBackDrop
          variants={backdrop}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={closeModal}
        >
          <StModal
            {...styles}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            onClick={(e) => {
              e.stopPropagation();
              click();
            }}
          >
            <StBtnArea>
              <StExitBtn
                variants={buttonVariants}
                whileHover="hover"
                onClick={closeModal}
                src={exitModal}
              />
            </StBtnArea>
            {children}
          </StModal>
        </StBackDrop>
      )}
    </AnimatePresence>
  );
};

export default Moddal;

const StBackDrop = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StModal = styled(motion.div)`
  width: ${({ width }) => width || "629px"};
  height: ${({ height }) => height || "576px"};
  margin: 0 auto;
  border-radius: 6px;
  background-color: #fff;
  flex-direction: column;
  align-content: center;
  z-index: 2;
  color: #111;
`;

const StExitBtn = styled(motion.img)`
  display: absolute;
  cursor: pointer;
`;

const StBtnArea = styled.div`
  padding: 16px;
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;
