import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import DropdownPlayerCount from "../../common/elements/DropDownPlayerCount";

const ModalCreateRoom = ({ children, modal, closeModal }) => {
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
            <StTopHeader>
              <h3>방만들기</h3>
            </StTopHeader>

            <StRoomName>
              <h4>방 제목</h4>
              <StRoomNameInput type="text"></StRoomNameInput>
            </StRoomName>

            <StChangePlayerNumb>
              <StPlayerCount>인원설정</StPlayerCount>
              <DropdownPlayerCount />
            </StChangePlayerNumb>

            <StSetPrivacy>
              <h4>공개설정</h4>
              <StCheckBoxes>
                <div>
                  <input type="checkbox" id="standby" />
                  <label htmlFor="standby"> 공개</label>
                </div>
                <div>
                  <input type="checkbox" id="standby" />
                  <label htmlFor="standby"> 비공개</label>
                </div>
              </StCheckBoxes>
              <StInputPassword type="text"></StInputPassword>
            </StSetPrivacy>

            <StBtnRoom>
              <button>취소</button>
              <button>완료</button>
            </StBtnRoom>
          </StModal>
          <StBackDrop {...styles} onClick={closeModal}></StBackDrop>
        </>,
        document.getElementById("root")
      )}
    </>
  );
};

export default ModalCreateRoom;

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
  height: 285px;
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

const StTopHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 70px;
`;

const StRoomName = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  height: 50px;
`;

const StRoomNameInput = styled.input`
  width: 280px;
  height: 25px;
`;

const StChangePlayerNumb = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 50px;
`;
const StPlayerCount = styled.h4`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 88px;
  height: 100%;
  margin-left: 14px;
`;

const StSetPrivacy = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 50px;
  margin-left: 14px;
`;

const StCheckBoxes = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  width: 120px;
  height: 100%;
  margin-left: 30px;
  gap: 10px;
`;

const StInputPassword = styled.input`
  width: 80px;
  height: 25px;
`;

const StBtnRoom = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  width: 100%;
  height: 70px;
  gap: 18px;
`;
