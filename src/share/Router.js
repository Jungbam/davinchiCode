import React from "react";
import { useSelector } from "react-redux";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import { PAGE } from "../helpers/IndexPage";
const PrivateRoutes = ({ user, redirectPath = "/" }) => {
  return user ? <Outlet /> : <Navigate to={redirectPath} replace />;
};

const Router = () => {
  const { isLoggedIn } = useSelector((state) => state.signSlice);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/loading" element={PAGE.Loading} />
        <Route path="/" element={PAGE.ServerUpdate} />
        <Route path="/Intro" element={PAGE.Intro} />
        <Route path="/kakao" element={PAGE.KakaoSign} />
        <Route path="/kakaodel" element={PAGE.KakaoDel} />
        <Route path="/profile" element={PAGE.SetUserInfo} />
        <Route element={<PrivateRoutes user={isLoggedIn} />}>
          <Route path="/lobby" element={PAGE.Lobby} />
          <Route path="/game/:roomId" element={PAGE.Game} />
        </Route>
        <Route path="/error" element={PAGE.ErrorPage} />
        <Route path="/*" element={PAGE.ErrorPage} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
