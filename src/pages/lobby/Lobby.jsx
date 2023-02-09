import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { SignAPI } from "../../api/axios";
import { queryKeys } from "../../helpers/queryKeys";
import { setUser } from "../../redux/modules/signSlice";
import { PAGE } from "../../helpers/IndexPage";
import LobbyHeader from "./elements/LobbyHeader";
import Ranking from "./elements/Ranking";
import RoomList from "./elements/RoomList";
import { useError } from "../../hooks/useError";

const Lobby = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const errorHandler = useError();
  const { isLoading } = useQuery([queryKeys.MYINFO], SignAPI.myinfo, {
    onSuccess: (res) => {
      dispatch(setUser(res.data));
    },
    onError: (error) => {
      errorHandler(error);
    },
    staleTime: 60 * 60 * 1000,
    cacheTime: 60 * 60 * 1000,
  });
  if (isLoading) return PAGE.Loading;
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
