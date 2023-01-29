import otherUserBackground from "../../../assets/images/otherUserBackground.png";
import userProfile from "../../../assets/images/mask3x.jpg";
import styled from "styled-components";
import DavinchiCard from "./DavinchiCard";
import { useDispatch, useSelector } from "react-redux";
import { setIndicater } from "../../../redux/modules/gameSlice";

const UsersBox = ({ user }) => {
  const {initBtn} = useSelector(state=>state.gameSlice)
  const dispatch = useDispatch()
  return (
    <StWrapper>
      <StOtherUsers>
        <StUserInfo>
          <StCamera>
             {user?<StImg src={user?.userProfileImg} alt="프로필 사진"/>:<></>}
            <StSpaceBetween>
              <StCameraStatus></StCameraStatus>
            </StSpaceBetween>
            <StUserName>
              <span>{user?user?.userName:'빈자리'}</span>
            </StUserName>
          </StCamera>
          {user?.hasOwnProperty('isReady')&&user.isReady&&<StConfirmBtn>준비완료</StConfirmBtn>}
          {initBtn&&<SelectBtn onClick={()=>dispatch(setIndicater(user.userId))}> {user ? "지목하기" : "..."} </SelectBtn>}
        </StUserInfo>
        <StCardArea>
          {user?.hand?.map((card,i) => (
            <DavinchiCard key={`${user.userName}${i}`} card={card} />
          ))}
        </StCardArea>
      </StOtherUsers>
    </StWrapper>
  );
};
export default UsersBox;

const StWrapper = styled.div`
  width: 356px;
  height: 200px;
  display: flex;
  /* justify-content: space-between; */
`;

const StOtherUsers = styled.div`
  width: 356px;
  height: 100%;
  background-image: url(${otherUserBackground});
  padding: 16px;
  border-radius: 6px;
  border: solid 1px #111;
  background-color: #eee;
`;
const StImg = styled.img`
width:100%;
height:100%;
`;
const StUserInfo = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const StCamera = styled.div`
  width: 200px;
  height: 112px;
  border-radius: 4px;

  padding: 6px;
  font-size: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  background-image: url(${userProfile});
  background-size: cover;
`;

const StSpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StCameraStatus = styled.div`
  gap: 10px;
  width: 40px;
  & img {
    height: 16px;
    margin-right: 3px;
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

const StUserName = styled.div`
  width: 64px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;

  color: #fff;
  padding: 5px 10px;
  border-radius: 999px;
  background-color: rgba(0, 0, 0, 0.7);
  & div {
    display: block;
  }
`;

const SelectBtn = styled.button`
  width: 93px;
  height: 32px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  box-shadow: 0 3px 0 0 #616161;
  border: solid 1px #616161;
  background-color: #ddd;
  font-family: Pretendard;
  font-size: 14px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  text-align: center;
  color: #616161;
`;

const StCardArea = styled.div`
  width: 100%;
  height: 32px;
  gap: 2px;
  display: flex;
  margin: 20px 7px;
`;

const StCard = styled.img``;
