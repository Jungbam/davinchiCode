import styled from "styled-components";

const StTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  width: ${({ width }) => width || "388px"};
  height: 32px;
  background-color: #fff;
  border: 1px solid #111;
  border-bottom: 3px double #111111;

  border-radius: 6px;
  font-size: 16px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  margin-top: ${({ mgTop }) => mgTop || "100px"};
`;

const StText = styled.span`
  margin-top: ${({ mgTop }) => mgTop || "20px"};
  width: ${({ width }) => width || "100%"};
  display: flex;
  flex-direction: ${({ dir }) => dir || "row"};
  justify-content: center;
  font-size: ${({ fontSize }) => fontSize || "14px"};
  line-height: 17px;
  color: ${({ color }) => color || "#111"};
  & span {
    color: #111;
    font-weight: 700;
  }
`;

const StBtn = styled.button`
  width: ${({ width }) => width || "130px"};
  height: ${({ height }) => height || "100%"};
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
  margin-top: ${({ mgTop }) => mgTop || "0px"};
`;

const StBtnList = styled.div`
  width: ${({ width }) => width || "266px"};
  height: ${({ height }) => height || "44px"};
  display: flex;
  justify-content: space-between;
  margin-top: ${({ mgTop }) => mgTop || "32px"};
`;

const StWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: ${({ width }) => width || "100%"};
  height: ${({ height }) => height || "100%"};
  padding: ${({ padding }) => padding || 0};
  justify-content: ${({ jus }) => jus || null};
  align-items: center;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  gap: ${({ gap }) => gap || "5px"};
`;

const StCardArea = styled.div`
  height: ${({ height }) => height || "62px"};
  width: 100%;
  justify-content: center;
  gap: ${({ gap }) => gap || "4px"};
  display: flex;
  margin-top: ${({ mgTop }) => mgTop || "20px"};
  margin-left: ${({ mgLeft }) => mgLeft || "20px"};
  & img {
    width: ${({ childwidth }) => childwidth};
  }
`;

export const BootStrap = {
  StTitle,
  StBtnList,
  StBtn,
  StText,
  StWrapper,
  StCardArea,
};
