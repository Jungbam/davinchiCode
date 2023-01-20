import React, { useState } from "react";
import styled from "styled-components";
import ModalProfile from "../../form/modal/ModalProfile";
import ModalLogout from "../../form/modal/ModalLogout";
import ModalDelAccount from "../../form/modal/ModalDelAccount";

function DropdownMenu() {
  const [showMenu, setShowMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const [showDelAccount, setShowDelAccount] = useState(false);
  return (
    <StMenuWrapper>
      <StButtonDesign onClick={() => setShowMenu(!showMenu)}>
        마이페이지
      </StButtonDesign>
      {showMenu && (
        <StMenuListWrapper>
          <StProfileUpdate onClick={() => setShowModal(true)}>
            프로필수정
          </StProfileUpdate>
          <StLogout onClick={() => setShowLogout(true)}>로그아웃</StLogout>
          <StDelAcc onClick={() => setShowDelAccount(true)}>회원탈퇴</StDelAcc>
        </StMenuListWrapper>
      )}
      {showModal && (
        <ModalProfile
          modal
          closeModal={() => {
            setShowModal(!showModal);
          }}
        >
          {/* Your modal content here */}
          {/* <button onClick={() => setShowModal(false)}>Close</button> */}
        </ModalProfile>
      )}
      {showLogout && (
        <ModalLogout
          modal
          closeModal={() => {
            setShowLogout(!showLogout);
          }}
        >
          {/* Your modal content here */}
          {/* <button onClick={() => setShowLogout(false)}>Close</button> */}
        </ModalLogout>
      )}
      {showDelAccount && (
        <ModalDelAccount
          modal
          closeModal={() => {
            setShowDelAccount(!showDelAccount);
          }}
        >
          {/* Your modal content here */}
          {/* <button onClick={() => setShowDelAccount(false)}>Close</button> */}
        </ModalDelAccount>
      )}
    </StMenuWrapper> // run gogo
  );
}

const StMenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 300px;
`;

const StButtonDesign = styled.button`
  border: 1px solid white;
  border-radius: 4px;
  padding: 10px;
  background-color: #111111;
  color: white;
  font-size: 12px;
  font-weight: bold;
`;

const StMenuListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
`;

const StProfileUpdate = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 50px;
  border: 1px solid black;
  font-size: 18px;
  font-weight: bold;
`;
const StLogout = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 50px;
  border: 1px solid black;
  font-size: 18px;
  font-weight: bold;
`;
const StDelAcc = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 50px;
  border: 1px solid black;
  font-size: 18px;
  font-weight: bold;
`;

export default DropdownMenu;
