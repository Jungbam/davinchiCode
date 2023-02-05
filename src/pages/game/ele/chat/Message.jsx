import React from "react";
import styled from "styled-components";

const Message = ({ msg }) => {
  return (
    <>
      {msg.mine ? (
        <StMyMsg>
          <div style={{ fontWeight: 700 }}>나</div>
          <p>&nbsp;&nbsp;&nbsp;{msg.msg}</p>
        </StMyMsg>
      ) : (
        <StComment>
          <div style={{ fontWeight: 700 }}>{msg.nickName}</div>
          <p>&nbsp;&nbsp;&nbsp;{msg.msg}</p>
        </StComment>
      )}
    </>
  );
};

export default Message;
const StComment = styled.div`
  text-decoration: wavy;
  font-weight: 400;
  font-size: 12.5px;
  line-height: 130%;
  color: #111;
`;
const StMyMsg = styled.div`
  font-weight: 400;
  font-size: 12.5px;
  line-height: 130%;
  color: #006516;
`;
