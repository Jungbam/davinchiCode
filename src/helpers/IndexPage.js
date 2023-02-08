import ErrorPage from "../pages/error/ErrorPage";
import Game from "../pages/game/Game";
import AuthPage from "../pages/intro/AuthPage";
import Intro from "../pages/intro/Intro";
import KakaoDel from "../pages/intro/kakao/KakaoDel";
import KakaoSign from "../pages/intro/kakao/KakaoSign";
import Loading from "../pages/loading/Loading";
import Lobby from "../pages/lobby/Lobby";
import Profile from "../pages/profile/Profile";
import ServerUpdate from "../pages/ServerUpdate/ServerUpdate";
export const PAGE = {
  Intro: <Intro />,
  ErrorPage: <ErrorPage />,
  Loading: <Loading />,
  Lobby: <Lobby />,
  Game: <Game />,
  KakaoSign: <KakaoSign />,
  KakaoDel: <KakaoDel />,
  SetUserInfo: <Profile />,
  Auth: <AuthPage />,
  ServerUpdate: <ServerUpdate />,
};
