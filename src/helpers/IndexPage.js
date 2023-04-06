import React from "react";
import AuthPage from "../pages/intro/AuthPage";
import Intro from "../pages/intro/Intro";
import KakaoSign from "../pages/intro/kakao/KakaoSign";
import Loading from "../pages/loading/Loading";
import Lobby from "../pages/lobby/Lobby";
const Game = React.lazy(() => import("../pages/game/Game"));
const ErrorPage = React.lazy(() => import("../pages/error/ErrorPage"));
const Profile = React.lazy(() => import("../pages/profile/Profile"));
const KakaoDel = React.lazy(() => import("../pages/intro/kakao/KakaoDel"));
const ServerUpdate = React.lazy(() =>
  import("../pages/ServerUpdate/ServerUpdate")
);
export const PAGE = {
  Auth: <AuthPage />,
  Intro: <Intro />,
  Loading: <Loading />,
  Lobby: <Lobby />,
  KakaoSign: <KakaoSign />,
  Game: <Game />,
  Profile: <Profile />,
  ErrorPage: <ErrorPage />,
  KakaoDel: <KakaoDel />,
  ServerUpdate: <ServerUpdate />,
};
