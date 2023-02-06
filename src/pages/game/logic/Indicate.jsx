import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { setIndicater, setInitBtn } from "../../../redux/modules/gameSlice";
import { BootStrap } from "../../BootStrap";
import Timer from "../ele/Timer";
import OtherTurn from "./OtherTurn";

const Indicate = ({ selectIndicaterCard, userId }) => {
  const { StTitle, StText, StBtn, StBtnList } = BootStrap;
  const { indicated, gameInfo } = useSelector((state) => state.gameSlice);
  const others = gameInfo?.users.filter((user) => user.userId !== userId);
  const indicatedUser = gameInfo?.users?.filter(
    (el) => el.userId === indicated
  );
  const { turn } = useSelector((state) => state.gameSlice.gameInfo);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setInitBtn(true));
    return () => dispatch(setInitBtn(false));
  }, []);
  if (turn === userId)
    return (
      <StWrapper>
        <StTitle mgtop="70px" width="239px">
          지목할 상대를 선택해주세요!
        </StTitle>
        <StText mgtop="12px">
          다른 참여자의 화면에 있는 ‘지목하기’ 버튼을 클릭하세요.
        </StText>
        {indicated && (
          <>
            <StText mgtop="30px">
              <span>{indicatedUser[0]?.userName}</span>님을 지목상대로
              결정하시겠습니까?
            </StText>
            <StBtnList width="206px" mgtop="20px" height="32px">
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
        <Timer timeOver={() => selectIndicaterCard(others)} />
      </StWrapper>
    );
  else return <OtherTurn text="타일 뽑기" />;
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
