import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import SetUserInfo from "../../../pages/intro/kakao/SetUserInfo";
import exitModal from "../../../assets/icons/ico_modal_cancle.svg";
import { motion } from "framer-motion";

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

const ModalProfile = ({ children, modal, closeModal }) => {
  const styles = { modal };
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
            <SetUserInfo closeModal={closeModal} />
          </StModal>
          <StBackDrop {...styles} onClick={closeModal}></StBackDrop>
        </>,
        document.getElementById("root")
      )}
    </>
  );
};

export default ModalProfile;

const StModal = styled.div`
  position: fixed;
  top: 50vh;
  left: 50vw;
  z-index: 140;
  transform: translate(-50%, -50%);
  display: ${({ modal }) => {
    return modal === "true" ? "flex" : "none";
  }};
  width: 440px;
  height: 428px;
  background-color: #ffffff;
  border: 1px solid #bbbbbb;
  border-radius: 6px;
`;
const StBackDrop = styled.div`
  position: fixed;
  top: 0;
  z-index: 120;
  margin: 0;
  padding: 0;
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

const StButton = styled.div`
  width: 100px;
  height: 32px;
  background: ${({ color }) => color};
  border: 1px solid #000000;
  box-shadow: 0px 3px 0px #000000;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  font-weight: 700;
  font-size: 14px;
  line-height: 100%;
`;
