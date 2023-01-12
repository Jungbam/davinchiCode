import React from "react";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
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
// const ProtectedRoute = ({ user, redirectPath = "/" }) => {
//   if (!user) {
//     return <Navigate to={redirectPath} replace />;
//   }
//   return <Outlet />;
// };

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/loading" element={<Loading />} />
        <Route path="/" element={<Intro />} />
        {/* <Route element={<ProtectedRoute user={user} />}> */}
        <Route path="/kakao" element={<KakaoSign />} />
        <Route path="/profile" element={<SetUserInfo />} />
        <Route path="/lobby" element={<Lobby />} />
        <Route path="/await" element={<AwaitPage />} />
        <Route path="/game" element={<Game />} />
        {/* </Route> */}
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
