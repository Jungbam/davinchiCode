import React from "react";
import styled from "styled-components";
import { ICON } from "../../../helpers/Icons";
import { BootStrap } from "../../../pages/BootStrap";
import { StButton } from "../../../pages/Button";

const Done = ({ closeModal }) => {
  const { StWrapper } = BootStrap;

  return (
    <StWrapper padding="26px" gap="20px">
      <StHeader>버그 신고</StHeader>
      <StImg src={ICON.RankOne} />
      <StDiv>접수가 완료되었습니다.</StDiv>
      <StButton variant="primary" mgtop="85px" onClick={closeModal}>
        확인
      </StButton>
    </StWrapper>
  );
};
export default Done;

const StHeader = styled.div`
  font-size: 20px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  text-align: center;
  color: #111;
`;

const StImg = styled.img`
  margin-top: 64px;
  width: 60px;
  height: 63px;
  object-fit: contain;
`;

const StDiv = styled.div`
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  color: #111;
`;
const StDelHeader = styled.div`
  margin-top: 26px;
  font-weight: 700;
  font-size: 20px;
  line-height: 20px;
`;

const StMainDesc = styled.div`
  text-align: center;
  width: 270px;
  height: 38px;
  font-weight: 700;
  font-size: 13px;
  line-height: 135.5%;
  margin-top: 24px;
`;

const StSubDesc = styled.div`
  width: 189px;
  height: 32px;
  font-weight: 500;
  font-size: 11px;
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
  justify-content: space-between;
  padding: 16px;
  margin-top: 30px;
`;

const StAgreeBtn = styled.button`
  height: 19px;
  font-weight: 700;
  font-size: 12px;
  line-height: 135.5%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: none;
  cursor: pointer;

  & input[type="checkbox"] {
    width: 12px;
    height: 12px;
    border: none;
    margin-right: 2px;
  }
`;

const StAgreeText = styled.div`
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

const StConfirm = styled.a`
  text-decoration: none;
`;
