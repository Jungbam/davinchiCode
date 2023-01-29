import React, { useEffect } from "react";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
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
        },1000)
        break;
      case 201:
        dipatch(login());
        count.current = setTimeout(()=>{
          navigate("/profile");
        },1000)
        break;
      default:
        count.current = setTimeout(()=>{
          navigate("/");
        },1000)
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

const StWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  color: #ffdf24;
  font-size: 18px;
  font-weight: 500;
`;
