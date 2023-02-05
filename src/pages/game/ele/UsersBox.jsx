import styled from "styled-components";
import DavinchiCard from "./DavinchiCard";
import { useDispatch, useSelector } from "react-redux";
import { setIndicater } from "../../../redux/modules/gameSlice";
import { IMG } from "../../../helpers/image";
import { useState } from "react";
import { useEffect } from "react";

const UsersBox = ({ user, turn, userId }) => {
  const [gameover, setGameover] = useState(false);
  const { initBtn, initReady, gameStart } = useSelector(
    (state) => state.gameSlice
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      user?.hand.length !== 0 &&
      user?.hand.filter((el) => el.isOpen === false).length === 0
    )
      setGameover(true);
    else setGameover(false);
  }, [user]);

  return (
    <>
      {user ? (
        <StOtherUsers
          url={
            gameStart && gameover
              ? IMG.otherUserBackgroundgameout
              : IMG.otherUserBackground
          }
        >
          {gameStart && turn === user?.userId && (
            <StOnGoingStatus>진행중</StOnGoingStatus>
          )}
          {turn === userId && initBtn && !gameover && (
            <StAbsoluteBtn
              background="#009320"
              onClick={() => dispatch(setIndicater(user.userId))}
            >
              지목하기
            </StAbsoluteBtn>
          )}
          <StUserProfile>
            <StImg
              src={user?.userProfileImg}
              width="80"
              alt="유저 프로필 사진"
            />
            <div>{user.userName}</div>
          </StUserProfile>
          {initReady && user?.hasOwnProperty("isReady") && user.isReady && (
            <StAbsoluteBtn>준비완료</StAbsoluteBtn>
          )}
          <StCardArea>
            {user?.hand?.map((card, i) => (
              <DavinchiCard key={`${user.userName}${i}`} card={card} />
            ))}
          </StCardArea>
        </StOtherUsers>
      ) : (
        <StOtherUsersNull />
      )}
    </>
  );
};
export default UsersBox;

const StOtherUsers = styled.div`
  border: 1px solid green;
  position: relative;
  width: 356px;
  height: 100%;
  background-image: url(${({ url }) => url});
  padding: 14px;
  border-radius: 6px;
  border: solid 1px #111;
  background-color: #eee;
`;
const StOtherUsersNull = styled.div`
  border: 1px solid green;
  position: relative;
  width: 356px;
  height: 100%;
  background-image: url(${IMG.otherUserBackgroundNone});
  padding: 14px;
  border-radius: 6px;
  border: solid 1px #111;
`;

const StAbsoluteBtn = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  width: 93px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ background }) => background || "#FFDF24"};
  border: 1px solid #000000;
  box-shadow: 0px 3px 0px ${({ color }) => color || "#000"};
  border-radius: 6px;
  font-size: 14px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  color: ${({ color }) => color || "#000"};
`;

const StImg = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 40px;
`;

const StCardArea = styled.div`
  width: 100%;
  height: 32px;
  gap: 2px;
  display: flex;
  margin: 6px 7px;
`;

const StOnGoingStatus = styled.div`
  background: #111111;
  border-radius: 999px;
  position: absolute;
  width: 52px;
  height: 32px;
  color: #ffdf24;

  font-weight: 600;
  font-size: 12px;
  line-height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const StUserProfile = styled.div`
  height: 130px;
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
  color: #111;

  display: flex;
  flex-direction: column;
  align-items: center;
  & div {
    margin-top: 7px;
  }
`;
