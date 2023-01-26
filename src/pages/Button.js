import React from "react";
import styled from "styled-components";

export const StButton = styled.div`
  width: ${({ size }) => {
    switch (size) {
      case "lg":
        return "130px";
      case "md":
        return "69px";
      case "sm":
        return "62px";
      default:
        return "127px";
    }
  }};
  height: ${({ size }) => {
    switch (size) {
      case "lg":
        return "44px";
      case "md":
        return "32px";
      case "sm":
        return "26px";
      default:
        return "48px";
    }
  }};
  font-size: ${({ size }) => {
    switch (size) {
      case "md":
        return "14px";
      case "sm":
        return "12px";
      default:
        return "18px";
    }
  }};
  color: ${({ variant }) => {
    switch (variant) {
      case "gray":
        return "#616161";
      default:
        return "#000";
    }
  }};
  box-shadow: 0 3px 0 0
    ${({ variant }) => {
      switch (variant) {
        case "gray":
          return "#616161";
        default:
          return "#000";
      }
    }};
  border: solid 1px
    ${({ variant }) => {
      switch (variant) {
        case "gray":
          return "#616161";
        default:
          return "#000";
      }
    }};
  background-color: ${({ variant }) => {
    switch (variant) {
      case "primary":
        return "#ffdf24";
      case "secondary":
        return "#009320";
      case "gray":
        return "#ddd";
      default:
        return "#fff";
    }
  }};

  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 0;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  text-align: center;
  border-radius: 6px;
`;
