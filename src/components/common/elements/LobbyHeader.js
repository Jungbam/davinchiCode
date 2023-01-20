import React from "react";
import styled from "styled-components";
import DropdownMenu from "./MenuLists";

const LobbyHeader = () => {
  return (
    <>
      <StLobbyWrapper>
        <StLobbyHead>
          <StLogoName>DAVINCI CODE</StLogoName>
          <StMenuWrapper>
            <DropdownMenu />
          </StMenuWrapper>
        </StLobbyHead>
      </StLobbyWrapper>
    </>
  );
};
const StLobbyWrapper = styled.div`
  width: 100%;
`;

const StLobbyHead = styled.div`
  display: flex;
  justify-content: space-between;
  width: 1534px;
  height: 48px;
  border: 1px solid black;
  background-color: #111111;
  color: white;
`;
const StLogoName = styled.span`
  display: flex;
  align-items: center;
  margin-left: 220px;
  font-size: 19px;
  font-weight: bold;
`;
const StMenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export default LobbyHeader;
