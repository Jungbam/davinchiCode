import { motion } from "framer-motion";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ICON } from "../../../helpers/Icons";
import GameInfo from "../../intro/kakao/ele/GameInfo";
import Moddal from "../../../components/form/modal/Moddal";
import ComplaintBug from "../../../components/common/complaintbug/ComplaintBug";
import DropdownMenu from "./DropdownMenu";

const Header = () => {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [infoModal, setInfoModal] = useState(false);
  const setInfoModalHandler = () => {
    setInfoModal((prev) => !prev);
  };
  const setModalHandler = () => {
    setModal((prev) => !prev);
  };

  const { userInfo } = useSelector((state) => state.signSlice);
  return (
    <Navbar>
      <Moddal
        modal={infoModal}
        closeModal={setInfoModalHandler}
        width="628px"
        height="600px"
      >
        <GameInfo closeModal={setInfoModalHandler} />
      </Moddal>
      <Moddal
        modal={modal}
        closeModal={setModalHandler}
        width="440px"
        height="396px"
      >
        {modal && <ComplaintBug closeModal={setModalHandler} />}
      </Moddal>
      <NavbarInside>
        <StImg
          width={150}
          src={ICON.iconLobbyLogo}
          initial={{ x: -500 }}
          animate={{ x: 0 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 120 }}
          onClick={() => navigate("/")}
        />
        <StMenuWrapper>
          <StHeaderBtn onClick={setInfoModalHandler}>
            <img src={ICON.iconAlert} alt="게임 설명" />
            <div>게임설명</div>
          </StHeaderBtn>
          <StHeaderBtn onClick={setModalHandler}>
            <img src={ICON.iconSirenHeader} alt="버그 신고" />
            <div>버그신고</div>
          </StHeaderBtn>
          <DropdownMenu userInfo={userInfo} />
        </StMenuWrapper>
      </NavbarInside>
    </Navbar>
  );
};

export default Header;

const Navbar = styled.div`
  color: #ffffff;
  background-color: #111;
  color: #aaaaaa;
  height: 46px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
`;

const NavbarInside = styled.div`
  width: 1080px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StMenuWrapper = styled.div`
  display: flex;
  position: relative;
  gap: 10px;
`;

const StImg = styled(motion.img)`
  cursor: pointer;
  z-index: 1000;
`;

const StHeaderBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 76px;
  height: 26px;
  border: solid 1px #000;
  background-color: #232323;
  border-radius: 5px;
  color: #ccc;

  font-style: normal;
  font-weight: bold;
  gap: 2px;
  & div {
    font-size: 12px;
  }
  cursor: pointer;
`;
