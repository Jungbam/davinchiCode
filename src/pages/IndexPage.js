import ErrorPage from "./error/ErrorPage";
import Game from "./game/Game";
import Intro from "./intro/Intro";
import KakaoSign from "./intro/kakao/KakaoSign";
import SetUserInfo from "./intro/kakao/SetUserInfo";
import Loading from "./loading/Loading";
import Lobby from "./lobby/Lobby";

export const PAGE = {
  Intro: <Intro />,
  ErrorPage: <ErrorPage />,
  Loading: <Loading />,
  Lobby: <Lobby />,
  Game: <Game />,
  KakaoSign: <KakaoSign />,
  SetUserInfo: <SetUserInfo />,
};
