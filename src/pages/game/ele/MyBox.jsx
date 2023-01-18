import React from "react";
import styled from "styled-components";
import ChattingBox from "./ChattingBox";

import {ICON} from "../../Icons";

import myUserBackground from "../../../assets/images/myUserBackground.png";
import userProfile from "../../../assets/images/user_profile.png";
import Chat from "./chat/Chat";

const MyBox = ({roomID}) => {
  return (
    <StWrapper>
      <StContainer>
        <StBox>
          <StCamera>
            <StSpaceBetween>
              <StCameraStatus>
                <img src={ICON.iconMic} alt="icon" />
                <img src={ICON.iconVideocam} alt="icon" />
              </StCameraStatus>
              <StGameStatus>진행중</StGameStatus>
            </StSpaceBetween>
            <StUserName>
              <div>내가다이김</div>
            </StUserName>
          </StCamera>
          <StCardList>
            {/* 카드가 들어갈 곳 */}
          </StCardList>
        </StBox>
        <StBtnList>
          <img src={ICON.iconMic} alt="icon" />
          <div>|</div>
          <img src={ICON.iconVideocam} alt="icon" />
          <div>|</div>
          <img src={ICON.iconSetting} alt="icon" />
        </StBtnList>
      </StContainer>
      <Chat roomID={roomID} />
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
