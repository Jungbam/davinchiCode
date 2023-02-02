import React from "react";
import styled from "styled-components";
import DropdownMenu from "./DropdownMenu";

const Header = () => {
  return (
    <Navbar>
      <NavbarInside>
        <StLogoName>DAVINCI CODE</StLogoName>
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

const StLogoName = styled.div`
  font-size: 20px;
  font-weight: 800;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  text-align: left;
  color: #fff;
`;
const StMenuWrapper = styled.div`
  display: flex;
  position: relative;
`;
