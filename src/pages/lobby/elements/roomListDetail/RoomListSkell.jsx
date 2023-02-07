import React from "react";
import styled from "styled-components";

const RoomListSkell = () => {
  return (
    <>
      {new Array(12).fill("_").map((el,i) => (
        <StContainer key={`roomlistskell${i}`}>
          <Sta></Sta>
          <Stb></Stb>
          <Stc></Stc>
          <Std></Std>
        </StContainer>
      ))}
    </>
  );
};

export default RoomListSkell;

const StContainer = styled.div`
  width: 608px;
  height: 46px;
  background-color: #fff;
  background-size: cover;
  border: 1px solid #bcbcbc;
  border-radius: 6px;
  padding: 10px 18px;
  display: flex;
  align-items: center;
  gap: 30px;
`;

const Sta = styled.div`
  width: 96px;
  height: 20px;
  border-radius: 4px;
  background-image: linear-gradient(to right, #eee 0%, #f6f6f6 51%, #eee 100%);
`;

const Stb = styled.div`
  width: 50px;
  height: 20px;
  border-radius: 4px;
  background-image: linear-gradient(to right, #eee 0%, #f6f6f6 51%, #eee 100%);
`;

const Stc = styled.div`
  width: 270px;
  height: 20px;
  flex-grow: 0;
  border-radius: 4px;
  background-image: linear-gradient(to right, #eee 0%, #f6f6f6 51%, #eee 100%);
`;

const Std = styled.div`
  width: 48px;
  height: 26px;
  flex-grow: 0;
  border-radius: 4px;
  background-image: linear-gradient(to right, #eee 0%, #f6f6f6 51%, #eee 100%);
  margin-left: 20px;
`;
