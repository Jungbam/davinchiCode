import { motion } from "framer-motion";
import React from "react";
import styled from "styled-components";
import { ICON } from "../../../helpers/Icons";
import DropdownMenu from "./DropdownMenu";

const Header = () => {
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

          // onClick={() => {
          //   window.location.replace("/lobby");
          // }}
        />
        {/* initial={{ y: -250 }}
        animate={{ y: -10 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 120 }} */}
        {/* initial={{ x: "-50vw", opacity: 0 }}
          animate={{
            x: 0,
            opacity: 1,
            transition: {
              type: "spring",
              delay: 0.5,
            },
          }} */}

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
