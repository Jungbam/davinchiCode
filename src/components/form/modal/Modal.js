import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

const Modal = ({ children, modal, closeModal, width, height }) => {
  const styles = { modal, width, height };
  return (
    <>
      {ReactDOM.createPortal(
        <>
          <StModal {...styles}>{children}</StModal>
          <StBackDrop {...styles} onClick={closeModal}></StBackDrop>
        </>,
        document.getElementById("root")
      )}
    </>
  );
};

export default Modal;

const StModal = styled.div`
  position: absolute;
  top: 50vh;
  left: 50vw;
  z-index: 140;
  transform: translate(-50%, -50%);
  display: ${({ modal }) => {
    return modal ? "flex" : "none";
    //스위치문으로 부트스랩만들기 @@ 뭐일떄 return 사이즈랑 색깔
  }};

  width: ${({ width }) => width || "629px"};
  height: ${({ height }) => height || "576px"};
  border-radius: 6px;
  border: solid 1px #bbb;
  background-color: #fff;

  flex-direction: column;
  justify-content: center;
  align-content: center;
`;

const StBackDrop = styled.div`
  position: fixed;
  top: 0;
  z-index: 120;
  display: ${({ modal }) => {
    return modal ? "block" : "none";
  }};

  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
`;
