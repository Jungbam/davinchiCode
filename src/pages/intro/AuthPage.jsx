import React from 'react'
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, logout } from "../../redux/modules/signSlice";
import { PAGE } from "../../helpers/IndexPage";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../helpers/queryKeys";
import { SignAPI } from "../../api/axios";

const AuthPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoding } = useQuery([queryKeys.AUTH], SignAPI.auth, {
    onSuccess: () => {
      dispatch(login());
      navigate("/lobby");
    },
    onError: () => {
      dispatch(logout());
      navigate("/Intro");
    },
  });
  if (isLoding) return PAGE.Loading;
  return (
    <div></div>
  )
}

export default AuthPage