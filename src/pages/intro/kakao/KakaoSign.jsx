import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { SignAPI } from "../../../api/axios";
import { login } from "../../../redux/modules/signSlice";

const { Kakao } = window;
Kakao.init(process.env.REACT_APP_KAKAO_ID);

const KakaoSign = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dipatch = useDispatch();

  const code = location.search.split("=")[1];
  const loginError = location.search.includes("error");

  const kakaoLoginFn = async () => {
    const res = await SignAPI.kakaoSign(code);
    switch (res.status) {
      case 200:
        navigate("/lobby");
        dipatch(login());
        break;
      case 201:
        navigate("/profile");
        dipatch(login());
        break;
      default:
        navigate("/");
        break;
    }
  };

  useEffect(() => {
    kakaoLoginFn();
  }, []);

  if (loginError) {
    alert("로그인을 하셔야 게임 이용이 가능합니다.");
    return navigate("/");
  }

  return <StWrapper>카카오 로그인을 진행중입니다.</StWrapper>;
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
