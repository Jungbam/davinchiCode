import { useQuery } from "@tanstack/react-query";
import React from "react";
import styled from "styled-components";
import { SignAPI } from "../../api/axios";
import LobbyHeader from "../../components/common/elements/LobbyHeader";
import { queryKeys } from "../../helpers/queryKeys";
import Ranking from "./elements/Ranking";
import RoomList from "./elements/RoomList";

const Lobby = () => {
  const { data, isLoading, error } = useQuery(
    [queryKeys.MYINFO],
    SignAPI.myinfo,
    {
      onSuccess: (res) => {},
      onError: () => {},
      staleTime: 60 * 60 * 1000,
      cacheTime: 60 * 60 * 1000,
    }
  );

  return (
    <>
      <LobbyHeader />
      <StWrapper>
        <StContainer>
          <Ranking />
          <RoomList />
          git remote add origin
          git@github.com-hackelmo:DaVinciCodeGame/frontend.git git push -u
          origin main https://github.com/DaVinciCodeGame/frontend
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
