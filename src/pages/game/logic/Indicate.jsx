import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { setIndicater, setInitBtn } from "../../../redux/modules/gameSlice";
import OtherTurn from "./OtherTurn";

const Indicate = ({ selectIndicaterCard, userId }) => {
  const { indicated, gameInfo } = useSelector((state) => state.gameSlice);
  const indicatedUser = gameInfo?.users?.filter(
    (el) => el.userId === indicated
  );
  const { turn } = useSelector((state) => state.gameSlice.gameInfo);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setInitBtn());
    return () => dispatch(setInitBtn());
  }, []);
  if (turn === userId)
    return (
      <StWrapper>
        <StTitle mgTop="70px" width="239px">
          지목할 상대를 선택해주세요!
        </StTitle>
        <StText mgTop="12px">
          다른 참여자의 화면에 있는 ‘지목하기’ 버튼을 클릭하세요
        </StText>
        {indicated && (
          <>
            <StText mgTop="30px">
              <span>{indicatedUser[0]?.userName}</span>님을 지목상대로
              결정하시겠습니까?
            </StText>
            <StBtnList width="206px" mgTop="20px" height="32px">
              <StBtn
                width="100px"
                color="#fff"
                fontSize="14px"
                onClick={() => dispatch(setIndicater(null))}
              >
                취소
              </StBtn>
              <StBtn
                width="100px"
                color="#ffdf24"
                fontSize="14px"
                onClick={() => selectIndicaterCard(indicatedUser)}
              >
                결정
              </StBtn>
            </StBtnList>
          </>
        )}
      </StWrapper>
    );
  else return <OtherTurn text="상대방이 고할지 스톱할지" />;
};

export default Indicate;

const StWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
`;

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
