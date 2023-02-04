import { motion } from "framer-motion";
import React, { useState } from "react";
import styled from "styled-components";
import { ICON } from "../../../helpers/Icons";
import Moddal from "../../form/modal/Moddal";
import Logout from "../../form/modal/sign/Logout";
import DropdownMenu from "./DropdownMenu";

const Header = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <Navbar>
      <NavbarInside>
        <StImg
          width={150}
          src={ICON.iconLobbyLogo}
          initial={{ x: -500 }}
          animate={{ x: 0 }}
          transition={{ delay: 1.3, type: "spring", stiffness: 120 }}
          drag
          dragConstraints={{ left: 0, top: -10, right: 930, bottom: 10 }}
          dragElastic={2}
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
