import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { ICON } from "../../../helpers/Icons";
import { BootStrap } from "../../../styles/BootStrap";
import { StButton } from "../../../components/common/Button";
import Timer from "../ele/Timer";

const IntroTile = ({ selectTile }) => {
  const [black, setBlack] = useState(0);
  const [select, setSelect] = useState(true);
  const [hasClick, setHasClick] = useState(false);
  const [num, setNum] = useState(4);
  const countBlackBtn = [
    { value: 0, color: "#f5f6fa" },
    { value: 1, color: "#dcdde1" },
    { value: 2, color: "#535c68" },
    { value: 3, color: "#2f3640" },
    { value: 4, color: "#1c1e20" },
  ];
  const { StTitle, StText } = BootStrap;
  const { roomInfo } = useSelector((state) => state.gameSlice);
  const blackList = countBlackBtn.filter((el, i) => i < num + 1);

  useEffect(() => {
    if (roomInfo?.members === 4) setNum(3);
    else setNum(4);
  }, [roomInfo]);

  return (
    <StWrapper>
      <StTitle mgtop="30px" width="225px">
        가져올 타일을 정해주세요!
      </StTitle>
      <StText mgtop="16px">
        처음 주어지는 타일은 {num}개입니다. 아래의 버튼을 클릭하여 원하는 색상의
        타일을 획득하세요.
      </StText>
      <StCardArea>
        {new Array(num - black).fill("_").map((_, i) => (
          <img key={`blackCenter${i}`} src={ICON.xlwhiteBack} alt="card" />
        ))}
        {new Array(black).fill("_").map((_, i) => (
          <img key={`whiteCenter${i}`} src={ICON.xlblackBack} alt="card" />
        ))}
      </StCardArea>
      <StTileNumber>
        <div>
          흰색 타일 <span>{num - black}개</span>
        </div>
        <div>
          검은색 타일 <span>{black}개</span>
        </div>
      </StTileNumber>
      <StRoundBtns>
        {blackList.map((el, i) => (
          <StRoundBtn
            key={`countBlackBtn ${i}`}
            onClick={() => setBlack(el.value)}
            color={el.color}
          ></StRoundBtn>
        ))}
      </StRoundBtns>
      {!hasClick && (
        <StButton
          variant="primary"
          mgtop="14px"
          onClick={() => {
            setSelect(false);
            selectTile(black);
            setHasClick(true);
          }}
        >
          확인
        </StButton>
      )}
      {select && <Timer timeOver={() => selectTile(black)} />}
    </StWrapper>
  );
};

export default IntroTile;

const StWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
`;

const StCardArea = styled.div`
  height: 80px;
  gap: 10px;
  display: flex;
  margin-top: 24px;
  margin-bottom: 10px;
  & img {
    width: 56px;
  }
`;

const StTileNumber = styled.div`
  display: flex;
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;
  color: #888888;
  gap: 10px;
  margin-bottom: 10px;
  & span {
    font-weight: bold;
    color: #222;
  }
`;

const StRoundBtns = styled.div`
  gap: 15px;
  display: flex;
`;

const StRoundBtn = styled.button`
  width: 20px;
  height: 20px;
  background: ${({ color }) => color};
  border: 1px solid #000000;
  border-radius: 999px;
  color: #eee;
  font-size: 8px;
  font-weight: 700;
`;
