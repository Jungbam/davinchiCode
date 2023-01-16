import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

const ModalDelAccount = ({ children, modal, closeModal }) => {
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
            <StDelHeader>
              <h3>회원탈퇴</h3>
            </StDelHeader>

            <StImgSet>
              <img alt="" />
            </StImgSet>

            <StMainDesc>
              <StDesc>
                <h4>탈퇴 시 회원님의 계정에 저장된 모든 정보가</h4>
                <h4>영구적으로 삭제되며, 다시는 복구할 수 없습니다.</h4>
                <h6>
                  내용에 동의하여 탈퇴를 원하실 경우, 아래의 "동의하기" 항목을
                  체크해주세요.
                </h6>
              </StDesc>
            </StMainDesc>

            <StMainApproval>
              <StApproval>
                <div>
                  <input type="checkbox" id="agreeToTerm" />
                  <label htmlFor="standby"> 동의하기</label>
                </div>
                <StWordingDiv>
                  <h6>회원탈퇴 시 처리사항 안내 내용을 확인하였으며</h6>
                  <h6>회원탈퇴에 동의합니다.</h6>
                </StWordingDiv>
              </StApproval>
            </StMainApproval>

            <StButtons>
              <button>취소</button>
              <button>확인</button>
            </StButtons>
          </StModal>
          <StBackDrop {...styles} onClick={closeModal}></StBackDrop>
        </>,
        document.getElementById("root")
      )}
    </>
  );
};

export default ModalDelAccount;

const StModal = styled.div`
  position: fixed;
  top: 25%;
  left: 35%;
  z-index: 140;
  transform: translate(-50%, -50%);
  display: ${({ modal }) => {
    return modal ? "flex" : "none";
  }};
  width: 400px;
  height: 443px;
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

const StDelHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50px;
`;

const StImgSet = styled.div`
  width: 100%;
  height: 150px;
`;
const StMainDesc = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 80px;
`;

const StDesc = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 340px;
  height: 80px;
  text-align: center;
  gap: 8px;
`;

const StMainApproval = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StApproval = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 80%;
  height: 80px;
  border: 1px solid black;
`;
const StWordingDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const StButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 80px;
  gap: 20px;
`;
