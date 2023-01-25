import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { setUsers } from "../../../redux/modules/gameSlice";
import { ICON } from "../../Icons";
import Timer from "../ele/Timer";

const usersMok = {
blackCards: 4,
whiteCards: 4,
turn: 1,
users: [
   {
      userId: 1,
      nickName: '익명1',
      userProfileImg: "https://cdn.pixabay.com/photo/2023/01/12/15/05/flamingo-7714344_640.jpg",
      isReady:false,
      hand: [ 
        {
           color: 'black', 
           value: '1', 
           isOpen: false 
          }, 
        {
           color: 'black', 
           value: '3', 
           isOpen: false 
          }, 
        {
           color: 'white', 
           value: '4', 
           isOpen: false 
          }, 
       ]
    },
   {
      userId: 2,
      nickName: '익명2',
      userProfileImg: "https://cdn.pixabay.com/photo/2022/07/11/08/44/tower-7314495_1280.jpg",
      isReady:false,
      hand: [ 
        {
           color: 'white', 
           value: 'Back', 
           isOpen: true 
          }, 
        {
           color: 'black', 
           value: 'Back', 
           isOpen: true 
          }, 
        {
           color: 'white', 
           value: 'Back', 
           isOpen: true 
          }, 
       ]
    },
   {
      userId: 3,
      nickName: '익명3',
      userProfileImg: "https://cdn.pixabay.com/photo/2023/01/12/07/19/rat-7713508_640.jpg",
      isReady:false,
      hand: [ 
        {
           color: 'black', 
           value: 'Back', 
           isOpen: true 
          }, 
        {
           color: 'black', 
           value: 'Back', 
           isOpen: true 
          }, 
        {
           color: 'white', 
           value: 'Back', 
           isOpen: true 
          }, 
       ]
    },
  ]
}

const IntroTile = ({selectTile}) => {
  const [black, setBlack] = useState(0);
  const countBlackBtn = [0, 1, 2, 3];
  const dispatch = useDispatch()
  return (
    <StWrapper>
      <StButton>가져올 타일을 정해주세요!</StButton>
      <div>
        처음 주어지는 타일은 3개입니다. 아래의 슬라이더를 이동시켜 원하는 색상의
        타일을 획득하세요.
      </div>
      <StCardArea>
        {new Array(black).fill("_").map((_, i) => (
          <StCard key={`whiteCenter${i}`} src={ICON.blackBack} />
        ))}
        {new Array(3 - black).fill("_").map((_, i) => (
          <StCard key={`blackCenter${i}`} src={ICON.whiteBack} />
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
          </StRoundBtn>
        ))}
      </StRoundBtns>
      <StConfirmBtn onClick={()=>{
        // 소켓으로 때린 값을 반환받아서 셋.
        selectTile(black)
        dispatch(setUsers(usersMok))
        }}>확인</StConfirmBtn>
      <Timer/>
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
