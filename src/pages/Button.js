import React from "react";
import styled from "styled-components";

export const StButton = styled.div`
  width: ${({ size }) => {
    switch (size) {
      case "lg":
        return "252px";
      case "md":
        return "130px";
      case "sm":
        return "80px";
      default:
        return "100px";
    }
  }};
  height: ${({ size }) => {
    switch (size) {
      case "lg":
        return "48px";
      case "md":
        return "44px";
      case "sm":
        return "26px";
      default:
        return "32px";
    }
  }};
  font-size: ${({ size }) => {
    switch (size) {
      case "md":
        return "18px";
      case "sm":
        return "12px";
      default:
        return "14px";
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
