import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

const ModalLogout = ({ children, modal, closeModal }) => {
  // 얘는
  /*
  Modal 사용법
  <Modal /> 컴포넌트를 사용할 때 props를 반드시 내려주세요
  props :: chidren(안에 넣을 애들), modal(이게 있어야 display가 none이 아닙니다 closeModal = 닫기 함수입니다)
  끗
  */

  const styles = { modal };
  return (
    <>
      {ReactDOM.createPortal(
        <>
          <StModal {...styles}>
            {children}
            <StLogoutTop>
              <h3>로그아웃 하시겠습니까?</h3>
            </StLogoutTop>
            <StLogoutBot>
              <button>취소</button>
              <button>확인</button>
            </StLogoutBot>
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
  top: 25%;
  left: 35%;
  z-index: 140;
  transform: translate(-50%, -50%);
  display: ${({ modal }) => {
    return modal ? "flex" : "none";
  }};
  width: 300px;
  height: 154px;
  background-color: white;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  border-radius: 12px;
  box-shadow: 2px 2px 6px black;
`;
const StBackDrop = styled.div`
  position: fixed;
  top: 0;
  z-index: 120;
  margin: 0;
  padding: 0;
  display: ${({ modal }) => {
    return modal ? "block" : "none";
  }};
  width: 100vw;
  height: 100vh;
  background-color: rgba(141, 141, 141, 0.8);
`;

const StLogoutTop = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  width: 100%;
  height: 50%;
  font-size: 18px;
`;
const StLogoutBot = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50%;
  gap: 34px;
`;
