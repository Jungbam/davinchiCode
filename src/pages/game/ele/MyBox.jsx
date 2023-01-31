import React from "react";
import styled from "styled-components";
import { IMG } from "../../../helpers/image";
import DavinchiCard from "./DavinchiCard";

const MyBox = ({ user }) => {
  return (
    <StBox>
      <StUserProfile>
        <img src={IMG.userProfile} />
        <div>{user?.userName}</div>
      </StUserProfile>
      <StCardList>
        {user?.hand?.map((card, i) => (
          <StCardBox>
            <DavinchiCard key={`${user.userName}${i}`} card={card} />
            {card.isOpen ? <StOpen>Out</StOpen> : <StOpenNull></StOpenNull>}
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
const StCard = styled.img``;

const StOpen = styled.span`
  text-align: center;
  width: 32px;
  height: 20px;
  border-radius: 4px;
  background: #ffdf24;
  border: 1px solid #111111;
`;
const StOpenNull = styled.span`
  width: 32px;
  height: 20px;
  background: none;
  border: none;
`;

const StCardBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 32px;
`;
