import React, { useState } from "react";
import styled from "styled-components";

import backBlack from "../../../assets/icons/tiles/back_black.png";
import backWhite from "../../../assets/icons/tiles/back_white.png";

const IntroTile = () => {
  const [black, setBlack] = useState(0);
  const countBlackBtn = [0, 1, 2, 3];

  const sendIntroTile = () => {
  };

  return (
    <StWrapper>
      <StButton>가져올 타일을 정해주세요!</StButton>
      <div>
        처음 주어지는 타일은 3개입니다. 아래의 슬라이더를 이동시켜 원하는 색상의
        타일을 획득하세요.
      </div>
      <StCardArea>
        {new Array(black).fill("_").map((_, i) => (
          <StCard key={`whiteCenter${i}`} src={backBlack} />
        ))}
        {new Array(3 - black).fill("_").map((_, i) => (
          <StCard key={`blackCenter${i}`} src={backWhite} />
        ))}
      </StCardArea>

      <StTileNumber>
        <div>
          검은색 타일 <span>{black}개</span>
        </div>
        <div>
          흰색 타일 <span>{3 - black}개</span>
        </div>
      </StTileNumber>
      <StRoundBtns>
        {countBlackBtn.map((el, i) => (
          <StRoundBtn
            key={`countBlackBtn ${i}`}
            onClick={() => {
              setBlack(el);
            }}
          >
            {/* {el} */}
          </StRoundBtn>
        ))}
      </StRoundBtns>
      <StConfirmBtn onClick={sendIntroTile}>확인</StConfirmBtn>
    </StWrapper>
  );
};

export default IntroTile;

const StButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 225px;
  height: 32px;
  left: calc(50% - 225px / 2 + 0.5px);
  top: calc(50% - 32px / 2 - 116px);

  background-color: #fff;
  border: 1px solid #111111;
  border-radius: 6px;
  filter: drop-shadow(0px 4px 0px #111);

  font-weight: 700;
  font-size: 16px;
  line-height: 16px;

  margin-bottom: 14px;
`;

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

const StConfirmBtn = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 32px;

  background: #ffdf24;
  border: 1px solid #000000;
  box-shadow: 0px 3px 0px #000000;
  border-radius: 6px;

  font-weight: 700;
  font-size: 14px;
  line-height: 100%;

  margin-top: 14px;
`;

const StCard = styled.img``;

const StRoundBtns = styled.div`
  gap: 15px;
  display: flex;
`;

const StRoundBtn = styled.button`
  width: 20px;
  height: 20px;
  background: #ff601c;
  border: 1px solid #000000;
  border-radius: 999px;

  color: #eee;
  font-size: 8px;
  font-weight: 700;
`;
