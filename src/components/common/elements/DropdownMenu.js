import React, { useState } from "react";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import SetUserInfo from "../../../pages/intro/kakao/SetUserInfo";
import Logout from "../../form/sign/Logout";
import DelAccount from "../../form/sign/DelAccount";
import Moddal from "../../form/modal/Moddal";

function DropdownMenu({ userInfo }) {
  const [showMenu, setShowMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const [showDelAccount, setShowDelAccount] = useState(false);
  return (
    <StMenuWrapper>
      <StButtonDesign
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ delay: 1.3, type: "spring", stiffness: 200 }}
        onClick={() => setShowMenu((prev) => !prev)}
      >
        마이페이지
      </StButtonDesign>
      <AnimatePresence>
        {showMenu && (
          <StMenuList
            initial={{ y: -40, opacity: 0 }}
            animate={{
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.1,
                ease: "easeInOut",
                type: "spring",
                mass: 0.7,
              },
            }}
            exit={{ opacity: 0, y: -10, transition: { duration: 1 } }}
          >
            <StMenu
              bottom="1px"
              onClick={() => {
                setShowModal(true);
                setShowMenu((prev) => !prev);
              }}
            >
              내 프로필 설정
            </StMenu>
            <StMenu
              onClick={() => {
                setShowLogout(true);
                setShowMenu((prev) => !prev);
              }}
            >
              로그아웃
            </StMenu>
            <StMenu
              top="1px"
              onClick={() => {
                setShowDelAccount(true);
                setShowMenu((prev) => !prev);
              }}
            >
              회원탈퇴
            </StMenu>
          </StMenuList>
        )}
      </AnimatePresence>
      {showModal && (
        <Moddal
          modal={showModal}
          closeModal={() => {
            setShowModal((prev) => !prev);
          }}
          width="440px"
          height="428px"
        >
          <SetUserInfo
            closeModal={() => {
              setShowModal((prev) => !prev);
            }}
            userInfo={userInfo}
          />
        </Moddal>
      )}
      {showLogout && (
        <Moddal
          modal={showLogout}
          closeModal={() => {
            setShowLogout((prev) => !prev);
          }}
          width="288px"
          height="160px"
        >
          <Logout closeModal={() => setShowLogout((prev) => !prev)} />
        </Moddal>
      )}
      {showDelAccount && (
        <Moddal
          modal={showDelAccount}
          closeModal={() => {
            setShowDelAccount((prev) => !prev);
          }}
          width="440px"
          height="338px"
        >
          <DelAccount
            closeModal={() => {
              setShowDelAccount((prev) => !prev);
            }}
          />
        </Moddal>
      )}
    </StMenuWrapper>
  );
}

const StMenuWrapper = styled.div`
  display: flex;
  z-index: 1;
`;

const StButtonDesign = styled(motion.button)`
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
