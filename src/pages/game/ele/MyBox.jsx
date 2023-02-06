import React from "react";
import styled from "styled-components";
import { IMG } from "../../../helpers/image";
import DavinchiCard from "./DavinchiCard";

const MyBox = ({ user }) => {
  return (
    <StBox>
      <StUserProfile>
        <StImg
          src={user?.userProfileImg || IMG.userProfile}
          alt="유저 프로필 사진"
          width="80"
        />
        <div>{user?.userName}</div>
      </StUserProfile>
      <StCardList>
        {user?.hand?.map((card, i) => (
          <StCardBox key={`${user.userName}${i}`}>
            <DavinchiCard card={card} />
            {card.isOpen ? <StOpen>OUT</StOpen> : <StOpenNull></StOpenNull>}
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

const StUserProfile = styled.div`
  width: 166px;
  height: 110px;
  margin: 0 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: 600;
  font-size: 14px;
  line-height: 100%;
  color: #111;
  & div {
    margin-top: 13px;
  }
`;

const StCardList = styled.div`
  position: absolute;
  top: 44px;
  right: 20px;
  width: 464px;
  height: 48px;
  gap: 3.5px;
  display: flex;
`;
const StImg = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 40px;
`;

const StOpen = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 20px;
  border-radius: 4px;
  background: #ffdf24;
  font-size: 10px;
  font-weight: bold;
  font-stretch: normal;
  border: 1px solid #111111;
  margin-top: 5px;
`;
const StOpenNull = styled.span`
  width: 32px;
  height: 20px;
  background: none;
  border: none;
  margin-top: 5px;
`;

const StCardBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 32px;
`;
