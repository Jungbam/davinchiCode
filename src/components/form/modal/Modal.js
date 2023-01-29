import { motion } from "framer-motion";
import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import exitModal from "../../../assets/icons/ico_modal_cancle.svg";

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

const Modal = ({ children, modal, closeModal, width, height }) => {
  const styles = { modal, width, height };
  return (
    <>
      {ReactDOM.createPortal(
        <>
          <StModal {...styles}>
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
          <StBackDrop {...styles} onClick={closeModal}></StBackDrop>
        </>,
        document.getElementById("root")
      )}
    </>
  );
};

export default Modal;

const StModal = styled(motion.div)`
  position: absolute;
  top: 50vh;
  left: 50vw;
  z-index: 140;
  transform: translate(-50%, -50%);
  display: ${({ modal }) => {
    return modal === "true" ? "flex" : "none";
  }};

  width: ${({ width }) => width || "629px"};
  height: ${({ height }) => height || "576px"};
  border-radius: 6px;
  background-color: #fff;
  flex-direction: column;
  align-content: center;
`;

const StBackDrop = styled.div`
  position: fixed;
  top: 0;
  z-index: 120;
  display: ${({ modal }) => {
    return modal === "true" ? "block" : "none";
  }};

  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
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
