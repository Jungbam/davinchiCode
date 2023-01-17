import React from "react";
import styled from "styled-components";
import LobbyHeader from "../../components/common/elements/LobbyHeader";
import Ranking from "./elements/Ranking";
import RoomList from "./elements/RoomList";

const Lobby = () => {
  return (
    <>
      <StLobbyFrame>
        <LobbyHeader />
        <StDiv>
          <Ranking />
          <RoomList />
        </StDiv>
      </StLobbyFrame>
    </>
  );
};

const StLobbyFrame = styled.div`
  width: 1536px;
  height: 864px;
  border: 1px solid black;
`;

const StDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 24px;
`;
export default Lobby;
