import ErrorPage from "../pages/error/ErrorPage";
import Game from "../pages/game/Game";
import Intro from "../pages/intro/Intro";
import KakaoDel from "../pages/intro/kakao/KakaoDel";
import KakaoSign from "../pages/intro/kakao/KakaoSign";
import SetUserInfo from "../pages/intro/kakao/SetUserInfo";
import Loading from "../pages/loading/Loading";
import Lobby from "../pages/lobby/Lobby";
export const PAGE = {
  Intro: <Intro />,
  ErrorPage: <ErrorPage />,
  Loading: <Loading />,
  Lobby: <Lobby />,
  Game: <Game />,
  KakaoSign: <KakaoSign />,
  KakaoDel: <KakaoDel />,
  SetUserInfo: <SetUserInfo />,
};
