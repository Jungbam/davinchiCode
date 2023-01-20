import React from "react";
import styled from "styled-components";
import { ICON } from "../../Icons";
import userProfile from "../../../assets/images/mask3x.jpg";

const MyBox = () => {
  return (
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
      <StCardList></StCardList>
    </StBox>
  );
};

export default MyBox;

const StBox = styled.div`
  display: flex;
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
  background-size: cover;
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
