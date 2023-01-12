import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __kakaoAuth } from "../../../redux/modules/authSlice";

const { Kakao } = window;
Kakao.init(process.env.REACT_APP_KAKAO_ID);

const KakaoSign = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const {status} = useSelector(state=>state)

  const sendAuth = async () => {
    const error = location.search.includes("error")
    if(error) {
      alert('로그인을 하셔야 게임 이용이 가능합니다.')
      navigate('/')
      return
    }else{
      const code = location.search.split("=")[1];
      dispatch(__kakaoAuth(code));
    }
  };

  useEffect(() => {
    sendAuth();
  }, []);

  useEffect(()=>{
    if(status===201) {navigate('/profile'); return}
    if(status===200) {navigate('/'); return}
  },[status])

  return <div>로그인 중...</div>;
};

export default KakaoSign;
