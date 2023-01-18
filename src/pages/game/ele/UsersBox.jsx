import {ICON } from "../../Icons";
import otherUserBackground from "../../../assets/images/otherUserBackground.png";
import userProfile from "../../../assets/images/user_profile.png";
import styled from "styled-components";

const UsersBox = () => {
  const users = [1, 2, 3];
  return (
    <StWrapper>
      {users.map((el, i) => (
        <StOtherUsers key={`OtherUsers${i}`}>
          <StUserInfo>
            <StCamera>
              <StSpaceBetween>
                <StCameraStatus>
                  <img src={ICON.iconMic} alt="icon" />
                  <img src={ICON.iconVideocam} alt="icon" />
                </StCameraStatus>
                {/* <GameStatus>진행중</GameStatus> */}
              </StSpaceBetween>
              <StUserName>
                <div>다빈치고수</div>
              </StUserName>
            </StCamera>
            <SelectBtn>지목하기</SelectBtn>
          </StUserInfo>
          <StCardArea>
            <StCard src={ICON.blackBack} alt="card" />
            <StCard src={ICON.blackBack} alt="card" />
            <StCard src={ICON.whiteBack} alt="card" />
            <StCard src={ICON.whiteBack} alt="card" />
            <StCard src={ICON.blackBack} alt="card" />
            <StCard src={ICON.whiteBack} alt="card" />
          </StCardArea>
        </StOtherUsers>
      ))}
    </StWrapper>
  );
};

export default UsersBox;

const StWrapper = styled.div`
  margin-top: 20px;
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: space-between;
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

const GameStatus = styled.div`
  width: 46px;
  height: 20px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 5px 10px;
  border-radius: 4px;
  background-color: #ffdf24;

  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  color: #000;
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

  //
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
