import React, { useEffect } from "react";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { SignAPI } from "../../../api/axios";
import { login } from "../../../redux/modules/signSlice";
import Loading from "../../loading/Loading";

const { Kakao } = window;
Kakao.init(process.env.REACT_APP_KAKAO_ID);

const KakaoSign = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dipatch = useDispatch();
  const count = useRef(null)

  const code = location.search.split("=")[1];
  const loginError = location.search.includes("error");

  const kakaoLoginFn = async () => {
    const res = await SignAPI.kakaoSign(code);
    switch (res.status) {
      case 200:
        dipatch(login());
        count.current = setTimeout(()=>{
          navigate("/lobby");
        },1200)
        break;
      case 201:
        dipatch(login());
        count.current = setTimeout(()=>{
          navigate("/profile");
        },1200)
        break;
      default:
        count.current = setTimeout(()=>{
          navigate("/");
        },1200)
        break;
    }
  };

  useEffect(() => {
    kakaoLoginFn();
    return ()=>{
      clearTimeout(count.current)
    }
  }, []);

  if (loginError) {
    alert("로그인을 하셔야 게임 이용이 가능합니다.");
    return navigate("/");
  }

  return <Loading/>;
};

export default KakaoSign;
