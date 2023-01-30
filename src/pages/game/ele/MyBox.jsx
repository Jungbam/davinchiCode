import React from "react";
import styled from "styled-components";
import userProfile from "../../../assets/images/mask3x.jpg";
import DavinchiCard from "./DavinchiCard";

const MyBox = ({user}) => {
  return (
    <StBox>
      <StCamera>
            <StImg src={user?.userProfileImg} alt="프로필 사진"/>
        <StSpaceBetween>
          <StCameraStatus>
          </StCameraStatus>
        </StSpaceBetween>
        <StUserName>
          <div>{user?.userName}</div>
        </StUserName>
      </StCamera>
      <StCardList>
        {user?.hand?.map((card,i) => (
          <StCardBox>
          <DavinchiCard key={`${user.userName}${i}`} card={card} />
          {card.isOpen?<StOpen>Out</StOpen>:<StOpenNull></StOpenNull>}
          </StCardBox>
        ))}
      </StCardList>
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

const StOpen = styled.span`
  text-align: center;
  width: 32px;
  height: 20px;
  border-radius: 4px;
  background: #FFDF24;
  border: 1px solid #111111;
`
const StOpenNull = styled.span`
  width: 32px;
  height: 20px;
  background: none;
  border: none;
`

const StSpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StImg = styled.img`
width:100%;
height:100%;
`;


const StCameraStatus = styled.div`
  gap: 10px;
  width: 40px;
  & img {
    height: 16px;
    margin-right: 3px;
  }
`;

const StCardBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 32px;
`

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
