import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import profile from '../../../assets/images/profile.png'

const SetUserInfo = () => { 
  const [profileImg, setProfileImg] = useState({});
  const [nickName, setNickName] = useState('');
  const dispatch = useDispatch()
  const {myInfo} = useSelector(state=>state)
  console.log(myInfo)

  const changeImgHandler = (e) => {
    const imgSrc = e.target.files[0];
    setProfileImg(imgSrc);
  };
  const setInit = async()=>{
    const res = new Promise(dispatch())
  }
  useEffect(()=>{
    setInit()
  }, [])
  return (
    <StWrapper>
      <StContainer>
        <StTitle>프로필 설정</StTitle>
        <StExplain>이름과 사진을 변경해 보세요.</StExplain>
      </StContainer>
      <StContainerForm>
        <StProileBox>
         <StProfile>
          </StProfile>
          <StImgLabel htmlFor="profileImg">프로필 이미지 추가</StImgLabel>
          <StImgInput
            id="profileImg"
            accept="image/*"
            name="profileImg"
            type="file"
            onChange={changeImgHandler}
            /> 
        </StProileBox>
      <StUserInfoBox>
        <label>설정 이름</label>
        <input type='text' value ={''} readOnly/>
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
const StProileBox = styled.div`
  
`
const StTitle = styled.p`
  font-weight: 700;
  font-size: 32px;
  line-height: 38px;
`
const StProfile = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 30px;
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