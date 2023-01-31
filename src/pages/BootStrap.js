import styled from "styled-components";

const StTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  width: ${({ width }) => width || "388px"};
  height: 32px;

  border: 1px solid #111111;
  box-shadow: 0px 3px 0px #111;
  border-radius: 6px;
  font-weight: 700;
  margin-top: ${({ mgTop }) => mgTop || "100px"};
`;

const StText = styled.div`
  margin-top: ${({ mgTop }) => mgTop || "20px"};
  width: 100%;
  display: flex;
  justify-content: center;
  font-size: 14px;
  line-height: 17px;
  & span {
    font-weight: 700;
  }
`;

const StBtn = styled.button`
  width: ${({ width }) => width || "130px"};
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  background: ${({ color }) => color};
  border: 1px solid #000000;
  box-shadow: 0px 3px 0px #000000;
  border-radius: 6px;

  font-weight: 700;
  font-size: ${({ fontSize }) => fontSize || "18px"};
  line-height: 100%;
  color: #111;
`;

const StBtnList = styled.div`
  width: ${({ width }) => width || "266px"};
  height: ${({ height }) => height || "44px"};
  display: flex;
  justify-content: space-between;
  margin-top: ${({ mgTop }) => mgTop || "32px"};
`;

export const BootStrap = { StTitle, StBtnList, StBtn, StText };
