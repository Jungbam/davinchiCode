import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { logout } from "../../../redux/modules/signSlice";
import exitModal from "../../../assets/icons/ico_modal_cancle.svg";
import { motion } from "framer-motion";
import { SignAPI } from "../../../api/axios";
import { useMutation } from "@tanstack/react-query";

const buttonVariants = {
  hover: {
    scale: 1.1,
    transition: {
      duration: 0.3,
    },
  },
};

const ModalDelAccount = ({ children, modal, closeModal }) => {
  const [isAgree, setisAgree] = useState(false);
  const dispatch = useDispatch();
  const styles = { modal };

  const { mutate } = useMutation(() => SignAPI.deleteInfo, {
    onSuccess: () => {
      dispatch(logout());
    },
  });
  const deleteUser = () => {
    mutate();
  };

  return (
    <>
      {ReactDOM.createPortal(
        <>
          <StModal {...styles}>
            <StBtnArea>
              <StExitBtn
                variants={buttonVariants}
                whileHover="hover"
                onClick={closeModal}
                src={exitModal}
              />
            </StBtnArea>
            <StDelHeader>회원탈퇴</StDelHeader>
            <StImg>이미지 제작 예정</StImg>
            <StMainDesc>
              탈퇴 시 회원님의 계정에 저장된 모든 정보가 영구적으로 삭제되며,
              다시는 복구할 수 없습니다.
            </StMainDesc>
            <StSubDesc>
              내용에 동의하여 탈퇴를 원하실 경우, <br />
              아래의 “동의하기” 항목을 체크해주세요.
            </StSubDesc>
            <StMainApproval>
              <Sta>
                <input
                  type="checkbox"
                  id="agree"
                  checked={isAgree}
                  onChange={() => setisAgree(!isAgree)}
                />
                <label htmlFor="agree">동의하기</label>
              </Sta>
              <Stb>
                회원탈퇴 시 처리사항 안내 내용을
                <br /> 확인하였으며, 회원탈퇴에 동의합니다
              </Stb>
            </StMainApproval>
            <StBtnList>
              <StBtn color="#fff" onClick={closeModal}>
                취소
              </StBtn>
              {isAgree ? (
                <StBtn color="#FFDF24" onClick={deleteUser}>
                  확인
                </StBtn>
              ) : (
                <StBtn color="#DDD" onClick={deleteUser} disabled>
                  확인
                </StBtn>
              )}
            </StBtnList>
          </StModal>
          <StBackDrop {...styles} onClick={closeModal}></StBackDrop>
        </>,
        document.getElementById("root")
      )}
    </>
  );
};

export default ModalDelAccount;

const StModal = styled.div`
  position: fixed;
  top: 50vh;
  left: 50vw;
  z-index: 140;
  transform: translate(-50%, -50%);
  display: ${({ modal }) => {
    return modal === "true" ? "flex" : "none";
  }};
  width: 440px;
  height: 498px;

  background-color: #ffffff;
  border: 1px solid #bbbbbb;
  border-radius: 6px;
  flex-direction: column;
  align-items: center;
`;
const StBackDrop = styled.div`
  position: fixed;
  top: 0;
  z-index: 120;
  margin: 0;
  padding: 0;
  display: ${({ modal }) => {
    return modal === "true" ? "block" : "none";
  }};
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
`;

const StExitBtn = styled(motion.img)`
  display: absolute;
  cursor: pointer;
`;

const StBtnArea = styled.div`
  padding: 16px;
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const StDelHeader = styled.div`
  margin-top: 26px;
  font-weight: 700;
  font-size: 20px;
  line-height: 20px;
`;

const StImg = styled.div`
  width: 320px;
  height: 150px;
  background-color: #eee;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 24px;
  font-size: 10px;
`;

const StMainDesc = styled.div`
  width: 266px;
  height: 38px;
  font-weight: 700;
  font-size: 14px;
  line-height: 135.5%;
  margin-top: 14px;
`;

const StSubDesc = styled.div`
  width: 189px;
  height: 32px;
  font-weight: 500;
  font-size: 12px;
  line-height: 135.5%;
  color: #444;

  margin-top: 10px;
`;

const StMainApproval = styled.div`
  width: 320px;
  height: 66px;
  background-color: #eeeeee;
  border: 1px solid #dddddd;
  border-radius: 6px;
  display: flex;
  padding: 16px;
  margin-top: 30px;
`;

const Sta = styled.div`
  width: 70px;
  height: 19px;
  font-weight: 700;
  font-size: 14px;
  line-height: 135.5%;
  display: flex;
  align-items: center;

  & input[type="checkbox"] {
    width: 12px;
    height: 12px;
    border: none;
    margin-right: 2px;
  }
`;

const Stb = styled.div`
  width: 210px;
  height: 34px;
  color: #777777;
  font-weight: 500;
  font-size: 12px;
  line-height: 140%;
`;

const StBtnList = styled.div`
  margin-top: 30px;
  width: 206px;
  display: flex;
  justify-content: space-between;
`;

const StBtn = styled.button`
  width: 100px;
  height: 32px;

  border: 1px solid #000000;
  box-shadow: 0px 3px 0px #000000;
  border-radius: 6px;

  display: flex;
  justify-content: center;
  align-items: center;

  font-weight: 700;
  font-size: 14px;
  line-height: 100%;

  background-color: ${({ color }) => color};
`;
