import { QueryClient } from "@tanstack/react-query";
import React from "react";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import { queryKeys } from "../helpers/queryKeys";
import {
  AwaitPage,
  ErrorPage,
  Game,
  Intro,
  KakaoSign,
  Loading,
  Lobby,
} from "../pages/IndexPage";
import SetUserInfo from "../pages/intro/kakao/SetUserInfo";

// Protected Route 구현
const ProtectedRoute = ({ user, redirectPath = "/" }) => {
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }
  return <Outlet />;
};

const Router = () => {
  const queryClient = new QueryClient();
  // const user = queryClient.getQueryData(queryKeys.USER);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/loading" element={<Loading />} />
        <Route path="/" element={<Intro />} />
        {/* <Route element={<ProtectedRoute user={user} />}> */}
        <Route path="/kakao" element={<KakaoSign />} />
        <Route path="/profile" element={<SetUserInfo />} />
        <Route path="/lobby" element={<Lobby />} />
        <Route path="/game/:roomID" element={<Game />} />
        {/* </Route> */}
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
