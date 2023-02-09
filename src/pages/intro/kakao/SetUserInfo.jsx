import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import { SignAPI } from "../../../api/axios";
import { queryKeys } from "../../../helpers/queryKeys";
import styled from "styled-components";
import imageCompression from "browser-image-compression";

const SetUserInfo = ({ closeModal, userInfo }) => {
  const [profileImg, setProfileImg] = useState(userInfo?.profileImageUrl);
  const [newProfileImg, setNewProfileImg] = useState(null);
  const [userName, setNickName] = useState(userInfo?.username);
  const [newNick, setNewNick] = useState(null);

  const imgRef = useRef();
  const queryClient = useQueryClient();

  const { mutate, isError, isLoading } = useMutation(
    (formData) => SignAPI.updateInfo(formData),
    {
      onSuccess: (res) => {
        queryClient.invalidateQueries(queryKeys.MYINFO);
        alert("프로필 수정 완료");
        closeModal();
      },
      onError: (error) => {
        alert(
          "프로필 수정이 정상적으로 되지 않았습니다. 우측 상단 배너에서 프로필을 다시한번 설정해주세요."
        );
        closeModal();
      },
    }
  );
  const closeHandler = (e) => {
    e.preventDefault();
    closeModal();
  };

  const onChangeImgHandler = async (e) => {
    const imgSrc = e.target.files[0];
    const options = {
      maxSizeMB: 0.5,
      maxWidthOrHeight: 330,
      useWebWorker: true,
    };
    const compressionImg = await imageCompression(imgSrc, options);
    const file = imgRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setNewProfileImg(reader.result);
    };

    setProfileImg(compressionImg);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (newNick) formData.append("username", newNick);
    if (newProfileImg) formData.append("image", profileImg);
    mutate(formData);
  };

  if (isLoading) <p>...loading</p>;
  if (isError) <p>error</p>;
  return (
    <StWrapper>
      <StContainerForm onSubmit={onSubmitHandler}>
        <StTitle htmlFor="profileImg">프로필을 변경 해보세요.</StTitle>
        <StProfileBox>
          <StProfile
            alt="profile"
            src={newProfileImg ? newProfileImg : profileImg}
            width="32px"
            height="32px"
            border-radius="50%"
            object-fit="cover"
          />
          <StChangePhoto
            id="profileImg"
            ref={imgRef}
            accept="image/*"
            name="profileImg"
            type="file"
            onChange={onChangeImgHandler}
          />
        </StProfileBox>
        <StBox>
          <label>설정 이름</label>
          <input
            style={{
              backgroundColor: "#ebebeb",
              border: "solid 1px #ebebeb",
              color: "#999",
            }}
            type="text"
            value={userName || ""}
            disabled
            readOnly
          />
        </StBox>
        <StBox>
          <label>설정 이름 변경</label>
          <input
            type="text"
            value={newNick || ""}
            onChange={(e) => setNewNick(e.target.value)}
            placeholder="변경할 이름을 입력해주세요."
          />
        </StBox>
        <StBtnList>
          <StButton color="#FFf" type="cancel" onClick={closeHandler}>
            취소
          </StButton>
          {!newNick && !newProfileImg ? (
            <StButton color="#ddd" type="submit" disabled>
              변경
            </StButton>
          ) : (
            <StButton type="submit" color="#FFDF24">
              변경
            </StButton>
          )}
        </StBtnList>
      </StContainerForm>
    </StWrapper>
  );
};
export default SetUserInfo;

SetUserInfo.defaultProps = {
  closeModal: () => {},
};

const StWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #111;
`;
const StContainerForm = styled.form`
  display: flex;
  width: 440px;
  height: 430px;
  flex-direction: column;
  align-items: center;
  background-color: whitesmoke;
  border-radius: 6px;
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

const StButton = styled.button`
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
const StTitle = styled.label`
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

const StChangePhoto = styled.input`
  width: 62px;
  height: 26px;
  background: rgb(249, 249, 249);
  border-radius: 4px;
  font-weight: 700;
  font-size: 12px;
`;
