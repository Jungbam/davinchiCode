import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import Modal from "../../form/modal/Modal";
import SetUserInfo from "../../../pages/intro/kakao/SetUserInfo";
import Logout from "../../form/modal/sign/Logout";
import DelAccount from "../../form/modal/sign/DelAccount";

function DropdownMenu() {
  const [showMenu, setShowMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const [showDelAccount, setShowDelAccount] = useState(false);
  return (
    <StMenuWrapper>
      <StButtonDesign onClick={() => setShowMenu((prev) => !prev)}>
        마이페이지
      </StButtonDesign>
      {showMenu && (
        <StMenuList
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1, transition: { duration: 1 } }}
          exit={{ y: 60, transition: { duration: 2 } }}
        >
          <StMenu bottom="1px" onClick={() => setShowModal(true)}>
            내 프로필 설정
          </StMenu>
          <StMenu onClick={() => setShowLogout(true)}>로그아웃</StMenu>
          <StMenu top="1px" onClick={() => setShowDelAccount(true)}>
            회원탈퇴
          </StMenu>
        </StMenuList>
      )}
      <Modal
        modal={showModal.toString()}
        closeModal={() => {
          setShowModal((prev) => !prev);
        }}
        width="440px"
        height="428px"
      >
        <SetUserInfo
          closeModal={() => {
            setShowModal(!showModal);
          }}
        />
      </Modal>
      <Modal
        modal={showLogout.toString()}
        closeModal={() => {
          setShowLogout((prev) => !prev);
        }}
        width="288px"
        height="160px"
      >
        <Logout closeModal={setShowLogout} />
      </Modal>
      <Modal
        modal={showDelAccount.toString()}
        closeModal={() => {
          setShowDelAccount((prev) => !prev);
        }}
        width="440px"
        height="338px"
      >
        <DelAccount closeModal={setShowDelAccount} />
      </Modal>
    </StMenuWrapper>
  );
}

const StMenuWrapper = styled.div`
  display: flex;
  z-index: 1;
`;

const StButtonDesign = styled.button`
  width: 80px;
  height: 26px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 2px;
  border: solid 1px #fff;
  background-color: transparent;

  font-size: 12px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  text-align: center;
  color: #fff;
`;

const StMenuList = styled(motion.div)`
  position: absolute;
  top: 30px;
  right: 0;
  width: 105px;
  height: 90px;
  border-radius: 6px;
  border: solid 1px #333;
  background-color: #000;

  & div {
    cursor: pointer;
  }
`;

const StMenu = styled.div`
  width: 102px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 0.83;
  letter-spacing: normal;
  text-align: left;
  color: #ff601c;

  border-bottom: ${({ bottom }) => `solid ${bottom} #333` || "none"};
  border-top: ${({ top }) => `solid ${top} #333` || "none"};
`;
export default DropdownMenu;
