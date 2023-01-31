import React, { useState } from "react";
import styled from "styled-components";

const KAKAO_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT}kakaodel&response_type=code`;
const DelAccount = ({ closeModal }) => {
  const [isAgree, setisAgree] = useState(false);

  return (
    <StWrapper>
      <StDelHeader>회원탈퇴</StDelHeader>
      <StMainDesc>
        탈퇴 시 회원님의 계정에 저장된 모든 정보가 <br />
        영구적으로 삭제되며, 다시는 복구할 수 없습니다.
      </StMainDesc>
      <StSubDesc>
        내용에 동의하여 탈퇴를 원하실 경우, <br />
        아래의 “동의하기” 항목을 체크해주세요.
      </StSubDesc>
      <StMainApproval>
        <StAgreeBtn>
          <input
            type="checkbox"
            id="agree"
            checked={isAgree}
            onChange={() => setisAgree(!isAgree)}
          />
          <label htmlFor="agree">동의하기</label>
        </StAgreeBtn>
        <StAgreeText>
          회원탈퇴 시 처리사항 안내 내용을
          <br /> 확인하였으며, 회원탈퇴에 동의합니다
        </StAgreeText>
      </StMainApproval>
      <StBtnList>
        <StBtn color="#fff" onClick={closeModal}>
          취소
        </StBtn>
        {isAgree ? (
          <StConfirm href={KAKAO_URL}>
            <StBtn color="#FFDF24">확인</StBtn>
          </StConfirm>
        ) : (
          <StBtn color="#DDD" disabled>
            확인
          </StBtn>
        )}
      </StBtnList>
    </StWrapper>
  );
};
export default DelAccount;

const StWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StDelHeader = styled.div`
  margin-top: 26px;
  font-weight: 700;
  font-size: 20px;
  line-height: 20px;
`;

const StMainDesc = styled.div`
  text-align: center;
  width: 270px;
  height: 38px;
  font-weight: 700;
  font-size: 14px;
  line-height: 135.5%;
  margin-top: 24px;
`;

const StSubDesc = styled.div`
  width: 189px;
  height: 32px;
  font-weight: 500;
  font-size: 12px;
  line-height: 135.5%;
  color: #444;

  margin-top: 10px;
`;

const StMainApproval = styled.div`
  width: 320px;
  height: 66px;
  background-color: #eeeeee;
  border: 1px solid #dddddd;
  border-radius: 6px;
  display: flex;
  padding: 16px;
  margin-top: 30px;
`;

const StAgreeBtn = styled.div`
  width: 70px;
  height: 19px;
  font-weight: 700;
  font-size: 14px;
  line-height: 135.5%;
  display: flex;
  align-items: center;

  & input[type="checkbox"] {
    width: 12px;
    height: 12px;
    border: none;
    margin-right: 2px;
  }
`;

const StAgreeText = styled.div`
  width: 210px;
  height: 34px;
  color: #777777;
  font-weight: 500;
  font-size: 12px;
  line-height: 140%;
`;

const StBtnList = styled.div`
  margin-top: 30px;
  width: 206px;
  display: flex;
  justify-content: space-between;
`;

const StBtn = styled.button`
  width: 100px;
  height: 32px;

  border: 1px solid #000000;
  box-shadow: 0px 3px 0px #000000;
  border-radius: 6px;

  display: flex;
  justify-content: center;
  align-items: center;

  font-weight: 700;
  font-size: 14px;
  line-height: 100%;

  background-color: ${({ color }) => color};
`;

const StConfirm = styled.a`
  text-decoration: none;
`;
