import React from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { kakaoAuth } from "../../../redux/modules/authSlice";

const { Kakao } = window;
Kakao.init(process.env.REACT_APP_KAKAO_ID);

const KakaoSign = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const sendAuth = async () => {
    const code = location.search.split("=")[1];
    const res = await dispatch(kakaoAuth(code));
  };

  useEffect(() => {
    sendAuth();
  }, []);

  return <div>로그인 중...</div>;
};

export default KakaoSign;
