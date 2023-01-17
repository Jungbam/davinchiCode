import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { SignAPI } from "../../../api/axios";
import { login } from "../../../redux/modules/signSlice";

const { Kakao } = window;
Kakao.init(process.env.REACT_APP_KAKAO_ID);

const KakaoSign = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dipatch = useDispatch()

  const code = location.search.split("=")[1];
  const loginError = location.search.includes("error")
  
  const kakaoLoginFn = async()=>{
    const res = await SignAPI.kakaoSign(code)
    switch(res.status){
      case 200 : 
        navigate('/lobby')
        dipatch(login())
        break
      case 201 : 
        navigate('/profile')
        dipatch(login())
        break
      default : 
        navigate('/')
        break
    }
  }

  useEffect(()=>{
    kakaoLoginFn()
  },[])

  if(loginError) {
      alert('로그인을 하셔야 게임 이용이 가능합니다.'); 
      return navigate('/'); 
    }

  return <div>로그인 중...</div>;
};

export default KakaoSign;
