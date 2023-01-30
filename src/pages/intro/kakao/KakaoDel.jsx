import React, { useEffect } from "react";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { SignAPI } from "../../../api/axios";
import { logout } from "../../../redux/modules/signSlice";
import Loading from "../../loading/Loading";

const KakaoDel = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dipatch = useDispatch();
  const count = useRef(null)

  const code = location.search.split("=")[1];
  const delError = location.search.includes("error");

  const kakaoLoginFn = async () => {
    const res = await SignAPI.deleteInfo(code);
    switch (res.status) {
      case 204:
        dipatch(logout());
        count.current = setTimeout(()=>{
          navigate("/");
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

  if (delError) {
    alert("회원 탈퇴가 실패하였습니다. 다시한번 진행해주세요.");
    return navigate("/");
  }

  return <Loading/>;
};

export default KakaoDel;
