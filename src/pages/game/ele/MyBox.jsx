import React from "react";
import styled from "styled-components";
import ChattingBox from "./ChattingBox";

import {
  black0,
  black1,
  black2,
  black3,
  black4,
  black5,
  black6,
  black7,
  black8,
  black9,
  black10,
  black11,
  black12,
  white0,
  white1,
  white2,
  white3,
  white4,
  white5,
  white6,
  white7,
  white8,
  white9,
  white10,
  white11,
  white12,
  iconSetting,
  iconVideocam,
  iconMic,
} from "../../Icons";

import myUserBackground from "../../../assets/images/myUserBackground.png";
import userProfile from "../../../assets/images/user_profile.png";

const MyBox = () => {
  return (
    <StWrapper>
      <StContainer>
        <StBox>
          <StCamera>
            <StSpaceBetween>
              <StCameraStatus>
                <img src={iconMic} alt="icon" />
                <img src={iconVideocam} alt="icon" />
              </StCameraStatus>
              <StGameStatus>진행중</StGameStatus>
            </StSpaceBetween>
            <StUserName>
              <div>내가다이김</div>
            </StUserName>
          </StCamera>
          <StCardList>
            <StCard src={black0} alt="card" />
            <StCard src={black1} alt="card" />
            <StCard src={white2} alt="card" />
            <StCard src={black4} alt="card" />
            <StCard src={white4} alt="card" />
            <StCard src={black6} alt="card" />
            <StCard src={black7} alt="card" />
            <StCard src={white8} alt="card" />
            <StCard src={black12} alt="card" />
            <StCard src={black9} alt="card" />
            <StCard src={white9} alt="card" />
            <StCard src={black10} alt="card" />
            <StCard src={white11} alt="card" />
          </StCardList>
        </StBox>
        <StBtnList>
          <img src={iconMic} alt="icon" />
          <div>|</div>
          <img src={iconVideocam} alt="icon" />
          <div>|</div>
          <img src={iconSetting} alt="icon" />
        </StBtnList>
      </StContainer>
      <ChattingBox />
    </StWrapper>
  );
};

export default MyBox;

const StWrapper = styled.div`
  width: 100%;
  height: 200px;
  margin-top: 9px;

  display: flex;
  justify-content: space-between;
`;

const StContainer = styled.div`
  height: 100%;
  width: 714px;
  background-image: url(${myUserBackground});
  padding: 20px 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 6px;
  border: solid 1px #111;
  background-color: #eee;
`;

const StBox = styled.div`
  display: flex;
`;

// const MyCard = styled.div`
//   border: 1px solid green;
//   margin-top: 24px;
//   margin-left: 14px;
//   width: 100%;
// `;

// const MyCardList = styled.div`
//   height: 32px;
//   & img {
//   }
// `;

const StBtnList = styled.div`
  width: 200px;
  height: 36px;
  background-color: #fff;
  border-radius: 4px;
  border: solid 1px #aaa;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 24px;
  & div {
    font-size: 16px;
    color: #aaa;
  }
  & img {
    cursor: pointer;
  }
`;

const StCardList = styled.div`
  height: 48px;
  gap: 3.5px;
  display: flex;
  margin-top: 24px;
  margin-left: 14px;
`;

const StCamera = styled.div`
  width: 200px;
  height: 112px;
  border-radius: 4px;

  padding: 6px;
  font-size: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  background-image: url(${userProfile});
`;

const StSpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StCard = styled.img``;

const StCameraStatus = styled.div`
  gap: 10px;
  width: 40px;
  & img {
    height: 16px;
    margin-right: 3px;
  }
`;

const StGameStatus = styled.div`
  width: 46px;
  height: 20px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 5px 10px;
  border-radius: 4px;
  background-color: #ffdf24;

  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  color: #000;
`;

const StUserName = styled.div`
  width: 64px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;

  color: #fff;
  padding: 5px 10px;
  border-radius: 999px;
  background-color: rgba(0, 0, 0, 0.7);
  & div {
    display: block;
  }
`;
