import React from "react";
import styled from "styled-components";

const Message = ({ msg }) => {
  return (
    <div>
      {/* <img src={msgInfo.img} alt='프로필'/>
      <p>{msgInfo.msg}</p> */}
      {msg.mine ? (
        <StMyMsg>
          <div style={{ fontWeight: 700 }}>본인</div>
          <p>{msg.msg}</p>
          {/* <p>{msg.createdAt}</p> */}
        </StMyMsg>
      ) : (
        <StComment>
          <div style={{ fontWeight: 700 }}>익명</div>
          <p>{msg.msg}</p>
        </StComment>
      )}
    </div>
  );
};

export default Message;
const StComment = styled.div`
  text-decoration: wavy;
  font-weight: 400;
  font-size: 12px;
  line-height: 130%;
  color: #111;
`;
const StMyMsg = styled.div`
  text-align: right;
  font-weight: 400;
  font-size: 12px;
  line-height: 130%;
  color: #006516;
`;
