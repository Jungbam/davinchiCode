import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { SignAPI } from '../../../api/axios';
import { queryKeys } from '../../../helpers/queryKeys';
import styled from 'styled-components';

const SetUserInfo = () => { 
  const [profileImg, setProfileImg] = useState(null)
  const [newProfileImg, setNewProfileImg] = useState(null)
  const [nickName, setNickName] = useState(null);
  const [newNick, setNewNick] = useState(null);
  
  const imgRef = useRef();
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  
  const {error, isLoading} = useQuery([queryKeys.MYINFO],SignAPI.myinfo,{staleTime:6000, cacheTime:60*60*1000,
    onSuccess:(res)=>{
      setNickName(res?.data?.username)
      setProfileImg(res?.data?.profileImageUrl)
    },
    onError:(error)=>{
      alert(error.message)
      navigate('/')
    }
  })
  const updateInfoHandler = useMutation((formData)=>SignAPI.updateinfo(formData),{
    onSuccess : ()=>{
      queryClient.invalidateQueries(queryKeys.MYINFO)
    }
  })
  

  const onChangeImgHandler = (e) => {
    const imgSrc = e.target.files[0];
    const file = imgRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setNewProfileImg(reader.result);
    };
    if(imgSrc) setNewProfileImg(imgSrc)
  };

  const onSubmitHandler = (e)=>{
    e.preventDefatult()
    const formData = new FormData()
    updateInfoHandler(formData)
  }

  if(isLoading)<p>...loading</p>
  if(error)<p>error</p>
  return (
    <StWrapper>
      <StContainer>
        <StTitle>프로필 설정</StTitle>
        <StExplain>이름과 사진을 변경해 보세요.</StExplain>
      </StContainer>
      <StContainerForm>
        <StProfileBox>
          <StImgLabel htmlFor="profileImg">프로필 이미지 추가</StImgLabel>
          {/* <img src={profileImg||profile} alt='profile'/> */}
          <StProfileImgDiv>
            <StProfileImg
              alt="profile"
              src={newProfileImg ? newProfileImg : profileImg}
              width="32px"
              height="32px"
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
          <label>설정 이름</label>
          <input type='text' value = {nickName||''} disabled readOnly/>
          <input type='text' value = {newNick||''} onChange={(e)=>setNewNick(e.target.value)}/>
          <button type='submit'>완료</button>
          <button type='submit'>다음에 변경하기</button>
        </StUserInfoBox>
      </StContainerForm>
    </StWrapper>
  )
}
export default SetUserInfo

const StWrapper = styled.div`
  width: 420px;
  height: 652px;
  border: 1px solid purple;
`
const StContainer = styled.div`
  width: 270px;
  height: 100px;
  font-family: 'Pretendard';
  font-style: normal;
  text-align: center;
`
const StContainerForm = styled.form`
  width: 270px;
  height: 100px;
`
const StProfileBox = styled.div`
  
`
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
`
const StTitle = styled.p`
  font-weight: 700;
  font-size: 32px;
  line-height: 38px;
`
const StImgInput = styled.input`
  display: none;
`;
const StImgLabel = styled.label`
  padding: 5px;
  font-weight: bold;
  font-size: 14px;
  color: #0095f6;
  display: inline-block;
  cursor: pointer;
`;
const StExplain = styled.div`
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
`
const StUserInfoBox = styled.div`
  width: 282px;
  height: 297px;
`