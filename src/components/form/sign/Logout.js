import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { SignAPI } from "../../../api/axios";
import { logout } from "../../../redux/modules/signSlice";

const Logout = ({ closeModal }) => {
  const navigate = useNavigate();
  const { mutate } = useMutation(SignAPI.logout, {
    onSuccess: (data) => {
      navigate("/intro");
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const dispatch = useDispatch();

  const logoutHandler = () => {
    mutate();
    dispatch(logout());
    closeModal();
  };
  return (
    <StWrapper>
      <StLogoutComment>로그아웃 하시겠습니까?</StLogoutComment>
      <StLogoutBtnList>
        <StButton color="#fff" onClick={closeModal}>
          취소
        </StButton>
        <StButton color="#ffdf24" onClick={logoutHandler}>
          확인
        </StButton>
      </StLogoutBtnList>
    </StWrapper>
  );
};
export default Logout;

const StWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StLogoutComment = styled.div`
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;

  margin-top: 46px;
`;

const StLogoutBtnList = styled.div`
  width: 206px;
  height: 32px;
  display: flex;
  justify-content: space-between;
  margin-top: 26px;
`;

const StButton = styled.div`
  width: 100px;
  height: 32px;
  background: ${({ color }) => color};
  border: 1px solid #000000;
  box-shadow: 0px 3px 0px #000000;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  font-weight: 700;
  font-size: 14px;
  line-height: 100%;
`;
