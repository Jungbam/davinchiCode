import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import styled from "styled-components";
import exitModal from "../../../assets/icons/ico_modal_cancle.png";
import useSound from "use-sound";
import { Sounds } from "../../../helpers/sounds";
import { Variants } from "../../../helpers/Variants";

const Moddal = ({ modal, width, height, closeModal, children }) => {
  const styles = { width, height };
  const xNumber = Number(height.replace("px", ""));
  const [click] = useSound(Sounds.Click);
  return (
    <AnimatePresence>
      {modal && (
        <StBackDrop
          xnumber={xNumber}
          variants={Variants.backdrop}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={closeModal}
        >
          <StModal
            {...styles}
            variants={Variants.modal}
            initial="hidden"
            animate="visible"
            onClick={(e) => {
              e.stopPropagation();
              click();
            }}
          >
            <StBtnArea>
              <StExitBtn
                variants={Variants.button}
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
  z-index: 10000;
  display: flex;
  justify-content: center;
  padding-top: ${({ xnumber }) => 432 - xnumber / 2 + "px"};
`;

const StModal = styled(motion.div)`
  width: ${({ width }) => width || "629px"};
  height: ${({ height }) => height || "576px"};
  margin: 0 auto;
  border-radius: 6px;
  background-color: #fff;
  flex-direction: column;
  align-content: center;
  z-index: 10001;
  color: #111;
`;

const StExitBtn = styled(motion.img)`
  width: 30px;
  height: 30px;
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
