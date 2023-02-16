import React from "react";
import Game from "../pages/game/Game";
import AuthPage from "../pages/intro/AuthPage";
import Intro from "../pages/intro/Intro";
import KakaoSign from "../pages/intro/kakao/KakaoSign";
import Loading from "../pages/loading/Loading";
import Lobby from "../pages/lobby/Lobby";

const ErrorPage = React.lazy(() => import("../pages/error/ErrorPage"));
const Profile = React.lazy(() => import("../pages/profile/Profile"));
const KakaoDel = React.lazy(() => import("../pages/intro/kakao/KakaoDel"));
const ServerUpdate = React.lazy(() =>
  import("../pages/ServerUpdate/ServerUpdate")
);
export const PAGE = {
  Intro: <Intro />,
  Loading: <Loading />,
  Lobby: <Lobby />,
  Game: <Game />,
  KakaoSign: <KakaoSign />,
  Auth: <AuthPage />,
  Profile,
  ErrorPage,
  KakaoDel,
  ServerUpdate,
};
