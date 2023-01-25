import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SignAPI } from "../../../api/axios";
import { queryKeys } from "../../../helpers/queryKeys";
import styled from "styled-components";

const SetUserInfo = ({ closeModal }) => {
  // const [profileImg, setProfileImg] = useState(null);
  // const [newProfileImg, setNewProfileImg] = useState(null);
  // const [nickName, setNickName] = useState(null);
  // const [newNick, setNewNick] = useState(null);

  // const imgRef = useRef();
  // const navigate = useNavigate();
  // const queryClient = useQueryClient();

  // const { error, isLoading } = useQuery([queryKeys.MYINFO], SignAPI.myinfo, {
  //   staleTime: 6000,
  //   cacheTime: 60 * 60 * 1000,
  //   onSuccess: (res) => {
  //     setNickName(res?.data?.username);
  //     setProfileImg(res?.data?.profileImageUrl);
  //   },
  //   onError: (error) => {
  //     alert(error.message);
  //     navigate("/");
  //   },
  // });
  // const { mutate } = useMutation((formData) => SignAPI.updateInfo(formData), {
  //   onSuccess: (res) => {
  //     queryClient.invalidateQueries(queryKeys.MYINFO);
  //     alert("프로필 수정 완료");
  //     navigate("/lobby");
  //   },
  //   onError: (error) => {
  //     alert(
  //       "프로필 수정이 정상적으로 되지 않았습니다. 우측 상단 배너에서 프로필을 다시한번 설정해주세요."
  //     );
  //     navigate("/lobby");
  //   },
  // });

  // const onChangeImgHandler = (e) => {
  //   const imgSrc = e.target.files[0];
  //   const file = imgRef.current.files[0];
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onloadend = () => {
  //     setNewProfileImg(reader.result);
  //   };
  //   if (imgSrc) setNewProfileImg(imgSrc);
  // };

  // const onSubmitHandler = (e) => {
  //   e.preventDefault();
  //   const formData = new FormData();
  //   formData.append("username", newNick);
  //   formData.append("image", newProfileImg);
  //   mutate(formData);
  // };

  // if (isLoading) <p>...loading</p>;
  // if (error) <p>error</p>;
  return (
    <StWrapper>
      <StTitle>프로필을 변경 해보세요.</StTitle>
      <StProfileBox>
        <StProfile src="https://i.pinimg.com/236x/d7/d7/5b/d7d75b636897d5d256d79b611460f640.jpg"></StProfile>
        <StChangePhoto>사진변경</StChangePhoto>
      </StProfileBox>
      <StBox color="#ebebeb">
        <label htmlFor="profileImg">설정 이름</label>
        <input type="text" placeholder="임단희" disabled />
      </StBox>
      <StBox>
        <label>설정 이름 변경</label>
        <input type="text" />
      </StBox>
      <StBtnList>
        <StButton color="#fff" onClick={closeModal}>
          취소
        </StButton>
        <StButton color="#ffdf24">확인</StButton>
      </StBtnList>
      {/* <StContainerForm onSubmit={onSubmitHandler}>
        <StProfileBox>
          <StImgLabel htmlFor="profileImg">프로필 이미지 추가</StImgLabel>
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
          <input type="text" value={nickName || ""} disabled readOnly />
          <input
            type="text"
            value={newNick || ""}
            onChange={(e) => setNewNick(e.target.value)}
          />
          <button type="submit">완료</button>
          <button type="cancel" onClick={() => navigate("/lobby")}>
            다음에 변경하기
          </button>
        </StUserInfoBox>
      </StContainerForm> */}
    </StWrapper>
  );
};
export default SetUserInfo;

const StWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StProfileBox = styled.div`
  width: 320px;
  height: 100px;
  background-color: #f9f9f9;
  border: 1px solid #dddddd;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-top: 24px;
  margin-bottom: 10px;
`;

const StBtnList = styled.div`
  width: 206px;
  height: 32px;
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
`;

const StButton = styled.div`
  width: 100px;
  height: 32px;
  background: ${({ color }) => color};
  border: 1px solid #000000;
  box-shadow: 0px 3px 0px #000000;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  font-weight: 700;
  font-size: 14px;
  line-height: 100%;
`;
const StTitle = styled.div`
  margin-top: 26px;
  font-weight: 700;
  font-size: 20px;
  line-height: 20px;
`;

const StBox = styled.div`
  width: 320px;
  height: 60px;
  margin-top: 10px;

  & label {
    font-weight: 700;
    font-size: 12px;
    line-height: 14px;
    color: #444444;
  }
  & input {
    width: 320px;
    height: 40px;
    background-color: ${({ color }) => color || "#fff"};
    border-radius: 4px;
    padding-left: 14px;

    font-size: 14px;
    line-height: 14px;
    color: #111;
    border: 1px solid #dddddd;
    margin-top: 6px;
  }
  & input:focus {
    outline: none;
  }
`;

const StProfile = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;

  border: 1px solid #000000;
  object-fit: cover;
`;

const StChangePhoto = styled.div`
  width: 74px;
  height: 26px;
  background: #ffffff;
  border: 1px solid #000000;
  border-radius: 4px;

  font-weight: 700;
  font-size: 12px;
  line-height: 12px;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
`;
