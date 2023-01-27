import React from "react";
import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { logout } from "../../../redux/modules/signSlice";
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

const ModalLogout = ({ modal, closeModal }) => {
  const dispatch = useDispatch();
  const styles = { modal };

  const logoutHandler = () => {
    dispatch(logout());
    closeModal();
  };

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

            <StLogoutComment>로그아웃 하시겠습니까?</StLogoutComment>
            <StLogoutBtnList>
              <StButton color="#fff" onClick={closeModal}>
                취소
              </StButton>
              <StButton color="#ffdf24" onClick={logoutHandler}>
                확인
              </StButton>
            </StLogoutBtnList>
          </StModal>
          <StBackDrop {...styles} onClick={closeModal}></StBackDrop>
        </>,
        document.getElementById("root")
      )}
    </>
  );
};

export default ModalLogout;

const StModal = styled.div`
  position: fixed;
  top: 50vh;
  left: 50vw;
  z-index: 140;
  transform: translate(-50%, -50%);
  display: ${({ modal }) => {
    return modal === "true" ? "flex" : "none";
  }};

  width: 288px;
  height: 160px;

  background-color: #ffffff;
  border: 1px solid #bbbbbb;
  border-radius: 6px;
  flex-direction: column;
  align-items: center;
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

const StLogoutComment = styled.div`
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;

  margin-top: 46px;
`;

const StLogoutBtnList = styled.div`
  width: 206px;
  height: 32px;
  display: flex;
  justify-content: space-between;
  margin-top: 26px;
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
