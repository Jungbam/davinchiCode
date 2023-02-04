import { motion } from "framer-motion";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ICON } from "../../../helpers/Icons";
import DropdownMenu from "./DropdownMenu";

const Header = () => {
  const navigate = useNavigate();
  return (
    <Navbar>
      <NavbarInside>
        <StImg
          width={150}
          src={ICON.iconLobbyLogo}
          initial={{ x: -500 }}
          animate={{ x: 0 }}
          transition={{ delay: 1.3, type: "spring", stiffness: 120 }}
          onClick={() => navigate("/")}
        />
        <StMenuWrapper>
          <DropdownMenu />
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
`;

const StImg = styled(motion.img)`
  cursor: pointer;
  z-index: 10000;
`;
