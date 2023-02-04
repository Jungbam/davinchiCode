import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { SignAPI } from "../../api/axios";
import LobbyHeader from "../../components/common/elements/LobbyHeader";
import { queryKeys } from "../../helpers/queryKeys";
import { setUser } from "../../redux/modules/signSlice";
import Ranking from "./elements/Ranking";
import RoomList from "./elements/RoomList";

const Lobby = () => {
  const dispatch = useDispatch()
  const { data, isLoading, error } = useQuery(
    [queryKeys.MYINFO],
    SignAPI.myinfo,
    {
      onSuccess: (res) => {
        dispatch(setUser(res.data))
      },
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
