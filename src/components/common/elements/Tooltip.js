import React, { useState } from "react";
import styled from "styled-components";

const Tooltip = ({ children }) => {
  const [isHover, setHover] = useState(false);

  return (
    <StTooltipWrapper
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <StTooltipIcon>?</StTooltipIcon>
      {isHover && <StTooltipText>{children}</StTooltipText>}
    </StTooltipWrapper>
  );
};

const StTooltipWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  border: 1px solid black;
  border-radius: 50%;
  cursor: pointer;
`;

const StTooltipIcon = styled.i`
  font-size: 1rem;
`;

const StTooltipText = styled.div`
  position: absolute;
  width: 198px;
  border: 1px solid black;
  border-radius: 6px;
  text-align: center;
  padding: 5px 0;
  color: black;
  background-color: white;
  top: -120px;
  left: -60px;
  z-index: 50;
`;

export default Tooltip;
