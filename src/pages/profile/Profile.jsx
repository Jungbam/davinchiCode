import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { SignAPI } from "../../api/axios";
import { PAGE } from "../../helpers/IndexPage";
import { queryKeys } from "../../helpers/queryKeys";
import { setUser } from "../../redux/modules/signSlice";
import SetUserInfo from "../intro/kakao/SetUserInfo";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data, isLoading } = useQuery([queryKeys.MYINFO], SignAPI.myinfo, {
    onSuccess: (res) => {
      dispatch(setUser(res.data));
    },
    onError: () => {
      navigate("/intro");
    },
    staleTime: 60 * 60 * 1000,
    cacheTime: 60 * 60 * 1000,
  });
  if (isLoading) return PAGE.Loading;
  return (
    <StWrapper>
      <SetUserInfo userInfo={data.data} closeModal={() => navigate("/")} />
    </StWrapper>
  );
};

export default Profile;

const StWrapper = styled.div`
  width: 100vw;
  height: 778px;
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;
