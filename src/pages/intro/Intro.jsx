import React, { useState } from "react";
import styled from "styled-components";
import Modal from "../../components/form/modal/Modal";
import GameInfo from "./kakao/ele/GameInfo";
import IntroPic from "../../assets/images/davincicode_main.png";
export const KAKAO_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT}&response_type=code`;
const Intro = () => {
  const [modal, setModal] = useState(false);

  const setModalHandler = () => {
    setModal((prev) => !prev);
  };

  return (
    <StWrapper>
      <Modal modal={modal} closeModal={setModalHandler}>
        <GameInfo closeModal={setModalHandler} />
      </Modal>
      <StContainer>
        <img src={IntroPic} width="900" />

        <StBtnBox>
          <StBtn onClick={setModalHandler} color="#fff">
            게임 설명보기
          </StBtn>
          <a href={KAKAO_URL}>
            <StBtn color="#ffdf24">카카오톡 로그인</StBtn>
          </a>
        </StBtnBox>
      </StContainer>
    </StWrapper>
  );
};

export default Intro;

const StWrapper = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
`;
const StContainer = styled.div`
  width: 512px;
  height: 398px;
  margin-top: 160px;
  display: flex;
  flex-direction: column;
  align-items: center;
  & img {
    margin-bottom: 50px;
  }
`;
// const StBox = styled.div`
//   width: 512px;
//   height: 340px;

//   display: flex;
//   justify-content: center;
//   align-items: center;

//   background-color: #d9d9d9;
//   background-image: url(IntroPic);
// `;

const StBtnBox = styled.div`
  display: flex;
  gap: 8px;
  & a {
    text-decoration: none;
  }
`;

const StBtn = styled.button`
  width: 252px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: solid 1px #000;
  background-color: ${(props) => props.color};
  border-radius: 6px;

  font-weight: 700;
  font-size: 18px;
  line-height: 100%;

  text-align: center;
  color: #000;
  box-shadow: 0 3px 0 0 #000;
`;
