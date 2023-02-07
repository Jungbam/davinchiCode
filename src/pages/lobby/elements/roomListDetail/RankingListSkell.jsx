import React from "react";
import styled from "styled-components";

const RankingListSkell = () => {
  return (
    <>
      {new Array(10).fill("_").map(() => (
        <StWrapper>
          <Sta>
            <StA></StA>
            <StB></StB>
          </Sta>
          <Stb></Stb>
          <Stc></Stc>
          <Std></Std>
        </StWrapper>
      ))}
    </>
  );
};

export default RankingListSkell;

const StWrapper = styled.div`
  background-color: "#fff";
  width: 100%;
  height: 64px;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 0 30px;
  border-bottom: 1px solid #ddd;
`;

const Sta = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-right: 41px;
  width: 26px;
  height: 33px;
`;

const StA = styled.div`
  width: 14px;
  height: 14px;
  border-radius: 2px;
  background-image: linear-gradient(to right, #eee 0%, #f6f6f6 51%, #eee 100%);
`;

const StB = styled.div`
  width: 26px;
  height: 14px;
  border-radius: 2px;
  background-image: linear-gradient(to right, #eee 0%, #f6f6f6 51%, #eee 100%);
`;

const Stb = styled.div`
  width: 34px;
  height: 34px;
  border-radius: 999px;
  background-image: linear-gradient(to right, #eee 0%, #f6f6f6 51%, #eee 100%);
`;
const Stc = styled.div`
  width: 74px;
  height: 20px;
  border-radius: 2px;
  background-image: linear-gradient(to right, #eee 0%, #f6f6f6 51%, #eee 100%);
  margin-right: 80px;
`;
const Std = styled.div`
  width: 74px;
  height: 14px;
  border-radius: 2px;
  background-image: linear-gradient(to right, #eee 0%, #f6f6f6 51%, #eee 100%);
`;
