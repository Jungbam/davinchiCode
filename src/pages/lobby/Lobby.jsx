import React from "react";
import styled from "styled-components";
import LobbyHeader from "../../components/common/elements/LobbyHeader";
import Ranking from "./elements/Ranking";
import RoomList from "./elements/RoomList";

const Lobby = () => {
  return (
    <>
      <LobbyHeader />
      <StWrapper>
        <StContainer>
          <Ranking />
          <RoomList />
        </StContainer>
      </StWrapper>
    </>
  );
};

const StWrapper = styled.div`
  width: 100vw;
  height: 778px;
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const StContainer = styled.div`
  width: 1080px;
  display: flex;
  justify-content: space-between;
`;

export default Lobby;
