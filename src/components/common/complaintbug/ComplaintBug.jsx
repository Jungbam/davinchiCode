import React, { useRef, useState } from "react";
import styled from "styled-components";
import emailjs from "@emailjs/browser";
import exitModal from "../../../assets/icons/ico_modal_cancle.svg";
import { StButton } from "../Button";

const ComplaintBug = ({ closeModal }) => {
  const complainForm = useRef();
  const [sending, setSending] = useState(null);
  const [input, setInput] = useState({ name: "", reply_to: "", message: "" });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const closeModalHandler = (e) => {
    e.preventDefault();
    closeModal();
    setInput({ name: "", reply_to: "", message: "" });
  };

  const sendEmailHandler = (e) => {
    setSending(true);
    e.preventDefault();
    emailjs
      .sendForm(
        process.env.REACT_APP_SERVICEID,
        process.env.REACT_APP_TEMPLATEID,
        complainForm.current,
        process.env.REACT_APP_PUBLICKEY
      )
      .then(
        (result) => {
          alert("정상적으로 버그가 신고되었습니다.");
          setSending(false);
          closeModalHandler();
        },
        (error) => {
          alert("전송을 실패했습니다.");
          closeModalHandler();
        }
      );
  };

  return (
    <StWrapper>
      <Absolute>
        <StExitBtn onClick={closeModalHandler} src={exitModal} />
      </Absolute>
      {sending ? (
        <StSending>신고메일 보내는 중</StSending>
      ) : (
        <StContainer ref={complainForm}>
          <StBugHeader>버그신고</StBugHeader>
          <StInput
            type="text"
            name="name"
            placeholder="제목을 입력해주세요. (20자 이내)"
            value={input.name}
            onChange={onChangeHandler}
            maxLength={20}
          />
          <StTextArea
            type="text"
            name="message"
            placeholder="내용을 입력해주세요. (100자 이내)"
            height="142px"
            value={input.message}
            onChange={onChangeHandler}
            maxLength={100}
          />
          <StInput
            placeholder="답변 받을 이메일 주소"
            type="text"
            name="reply_to"
            value={input.reply_to}
            onChange={onChangeHandler}
          />
          {input.name.length &&
          input.message.length &&
          input.reply_to.includes("@") ? (
            <StVali></StVali>
          ) : (
            <StVali>입력되지 않은 항목이 존재합니다.(e-mail 형식 준수)</StVali>
          )}
          <StBtnArea>
            <StButton type="cancel" onClick={closeModalHandler}>
              취소
            </StButton>
            {input.name.length &&
            input.message.length &&
            input.reply_to.includes("@") ? (
              <StButton
                type="submit"
                variant="primary"
                onClick={sendEmailHandler}
              >
                신고하기
              </StButton>
            ) : (
              <StButton variant="gray" disabled>
                신고하기
              </StButton>
            )}
          </StBtnArea>
        </StContainer>
      )}
    </StWrapper>
  );
};

export default ComplaintBug;

const StWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 16px;
  display: flex;
  justify-content: center;
`;

const StBugHeader = styled.div`
  margin: 10px 0;
  font-size: 20px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  text-align: center;
  color: #111;
`;

const StExitBtn = styled.img`
  cursor: pointer;
`;
const StSending = styled.h1`
  text-align: center;
`;
const StContainer = styled.form`
  width: 320px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const StInput = styled.input`
  width: 320px;
  height: ${({ height }) => height || "40px"};
  padding: 12px 14px;
  border-radius: 4px;
  background-color: #ebebeb;
  border-radius: 4px;
  text-align: left;
  border: none;
  &:focus {
    outline: none;
  }
  font-size: 14px;
  font-weight: 500;
  line-height: 1;
  color: #777;
`;

const StTextArea = styled.textarea`
  width: 320px;
  height: ${({ height }) => height || "40px"};
  padding: 12px 14px;
  border-radius: 4px;
  background-color: #ebebeb;
  border-radius: 4px;
  border: none;
  &:focus {
    outline: none;
  }
  font-size: 14px;
  font-weight: 500;
  line-height: 1;
  color: #777;
  resize: none;
`;

const StBtnArea = styled.div`
  width: 206px;
  display: flex;
  justify-content: space-between;
`;

const Absolute = styled.div`
  position: absolute;
  right: 16px;
`;

const StVali = styled.p`
  width: 100%;
  height: 13px;
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;
  color: #ff601c;
`;
