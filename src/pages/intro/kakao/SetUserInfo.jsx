import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { SignAPI } from '../../../api/axios';
import { queryKeys } from '../../../helpers/queryKeys';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../../redux/modules/gameSlice';

const SetUserInfo = () => { 
  const [profileImg, setProfileImg] = useState(null)
  const [newProfileImg, setNewProfileImg] = useState(null)
  const [nickName, setNickName] = useState(null);
  const [newNick, setNewNick] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const dispatch = useDispatch()
  const {userInfo} = useSelector(state=>state)
  
  const imgRef = useRef();
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  
  const {error, isLoading} = useQuery([queryKeys.MYINFO],SignAPI.myinfo,{staleTime:6000, cacheTime:60*60*1000,
    onSuccess:(res)=>{
      dispatch(setUser(res.data))
      setNickName(res?.data?.username)
      setProfileImg(res?.data?.profileImageUrl)
    },
    onError:(error)=>{
      alert(error.message)
      navigate('/')
    }
  })
  const {mutate} = useMutation((formData)=>SignAPI.updateInfo(formData),
  {
    onSuccess : (res)=>{
      queryClient.invalidateQueries(queryKeys.MYINFO)
      alert('프로필 수정 완료')
      navigate('/lobby')
    },
    onError: (error) => {
      alert(
        "프로필 수정이 정상적으로 되지 않았습니다. 우측 상단 배너에서 프로필을 다시한번 설정해주세요."
      );
      navigate("/lobby");
    },
  });

  const onChangeImgHandler = (e) => {
    const imgSrc = e.target.files[0];
    const file = imgRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setNewProfileImg(reader.result);
    };
    if (imgSrc) setNewProfileImg(imgSrc);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", newNick);
    formData.append("image", newProfileImg);
    mutate(formData);
  };

  const onChangeHandler = (e) => {
    setNewNick(e.target.value);
    if (e.target.value !== "") setIsActive(true);
    else setIsActive(false);
  };

  // if (isLoading) <p>...loading</p>;
  // if (error) <p>error</p>;
  return (
    <StLayout>
      <StWrapper>
        <StContainer>
          <StTitle>프로필을 변경 해보세요.</StTitle>
          {/* <StExplain>이름과 사진을 변경해 보세요.</StExplain> */}
        </StContainer>
        <StContainerForm onSubmit={onSubmitHandler}>
          <StProfileBox>
            <StImgLabel htmlFor="profileImg">사진변경</StImgLabel>
            <StProfileImgDiv>
              <StProfileImg
                alt="profile"
                src={newProfileImg ? newProfileImg : profileImg}
                width="60px"
                height="60px"
                border-radius="50%"
                object-fit="cover"
              />
              <StImgInput
                id="profileImg"
                ref={imgRef}
                accept="image/*"
                name="profileImg"
                type="file"
                onChange={onChangeImgHandler}
              />
            </StProfileImgDiv>
          </StProfileBox>
          <StUserInfoBox>
            <StLabelingTop>
              <StLabelName>설정 이름</StLabelName>
              <StInputNameChange
                type="text"
                value={nickName || ""}
                disabled
                readOnly
              />
            </StLabelingTop>
            <StLabelingBot>
              <StLabelPresetChange>설정 이름 변경</StLabelPresetChange>
              <StInputPresetChange
                type="text"
                placeholder="변경할 이름을 입력해주세요. (12자이내)"
                value={newNick || ""}
                onChange={onChangeHandler}
              />
            </StLabelingBot>
            <StButtonWrapper>
              <StEnter type="submit" isActive={isActive}>
                변경하기
              </StEnter>
              <StNextTime type="cancel" onClick={() => navigate("/lobby")}>
                다음에 변경
              </StNextTime>
            </StButtonWrapper>
          </StUserInfoBox>
        </StContainerForm>
      </StWrapper>
    </StLayout>
  );
};
export default SetUserInfo;

const StLayout = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  border: 1px solid red;
  justify-content: center;
  align-items: center;
`;

const StWrapper = styled.div`
  width: 440px;
  height: 428px;
  padding: 20px 60px 30px;
  border-radius: 6px;
  border: solid 1px #bbb;
  background-color: #fff;
`;
const StContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 40px;
  text-align: center;
  font-family: "Pretendard";
  font-style: normal;
`;
const StContainerForm = styled.form`
  width: 100%;
  height: 100%;
`;
const StProfileBox = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: center;
  align-items: center;
  width: 320px;
  height: 100px;
  border-radius: 6px;
  border: solid 1px #ddd;
  background-color: #f9f9f9;
  gap: 16px;
`;
const StProfileImgDiv = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  overflow: hidden;
`;
const StProfileImg = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  object-fit: cover;
`;
const StTitle = styled.p`
  font-weight: 700;
  font-size: 20px;
  line-height: 20px;
`;
const StImgInput = styled.input`
  display: none;
`;
const StImgLabel = styled.label`
  width: 74px;
  height: 26px;
  padding: 6px 8px;
  border-radius: 4px;
  border: solid 1px #000;
  background-color: #fff;
  font-size: 12px;
  font-weight: bold;
  gap: 2px;
`;
// const StExplain = styled.div`
//   font-weight: 400;
//   font-size: 16px;
//   line-height: 19px;
// `;
const StUserInfoBox = styled.div`
  /* width: 282px;
  height: 297px; */
`;

const StLabelingTop = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  height: 80px;
`;

const StLabelName = styled.label`
  width: 54px;
  height: 14px;
  margin: 20px 1px 6px 0;
  font-size: 14px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #444;
`;

const StInputNameChange = styled.input`
  width: 320px;
  height: 40px;
  gap: 10px;
  margin: 6px 0 10px;
  padding: 12px 14px;
  border-radius: 4px;
  background-color: #ebebeb;
`;

const StLabelingBot = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  height: 80px;
`;
const StLabelPresetChange = styled.label`
  width: 100px;
  height: 14px;
  margin: 40px 1px 6px 0;
  font-size: 14px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #444;
`;

const StInputPresetChange = styled.input`
  width: 320px;
  height: 40px;
  gap: 10px;
  margin: 6px 0 40px;
  padding: 12px 14px;
  border-radius: 4px;
  border: solid 1px #ddd;
  background-color: #f9f9f9;
`;

const StButtonWrapper = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 80px;
`;

const StEnter = styled.button`
  width: 100px;
  height: 32px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin: 40px 57px 0 6px;
  padding: 8px 22px;
  border-radius: 6px;
  box-shadow: 0 3px 0 0 #616161;
  border: solid 1px #616161;
  font-size: 14px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  text-align: center;
  color: #616161;
  background-color: ${({ isActive }) => {
    return isActive ? "yellow" : "gray";
  }};
`;

const StNextTime = styled.button`
  width: 114px;
  height: 32px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin: 40px 6px 0 12px;
  padding: 8px 22px;
  border-radius: 6px;
  box-shadow: 0 3px 0 0 #000;
  border: solid 1px #000;
  background-color: #fff;
  font-size: 14px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  text-align: center;
  color: #000;
`;
