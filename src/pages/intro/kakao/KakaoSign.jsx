import React from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { __kakaoAuth } from "../../../redux/modules/authSlice";

const { Kakao } = window;
Kakao.init(process.env.REACT_APP_KAKAO_ID);

const KakaoSign = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const naigate = useNavigate()
  const sendAuth = async () => {
    const error = location.search.includes("error")
    if(error) {
      alert('로그인을 하셔야 게임 이용이 가능합니다.')
      naigate('/')
      return
    }else{
      const code = location.search.split("=")[1];
      const res = await dispatch(__kakaoAuth(code));
      // 유저정보가 원래 설정되어 있었는지에 대한 데이터가 필요함.
      // status 201이면 회원가입=>설정페이지 => 설정에서 인증 요청
      // 200은 로그인=> 리다이렉트
      if(res.status===201) Navigate('/profile')
      if(res.status===200) Navigate('/')
    }

  };

  useEffect(() => {
    sendAuth();
  }, []);

  return <div>로그인 중...</div>;
};

export default KakaoSign;
