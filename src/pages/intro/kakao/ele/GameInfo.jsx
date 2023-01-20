import React from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";

import exitModal from "../../../../assets/icons/ico_modal_cancle.svg";

const GameInfo = ({ closeModal }) => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    speed: 700,
    slidesToScroll: 1,
    arrows: true,
    // nextArrow: <StTest />,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    autoplay: true,
    // appendDots: (dots) => <StTest />,
  };

  //magic slider dots
  return (
    <StWrapper>
      <StBtnArea>
        <StExitBtn onClick={closeModal} src={exitModal} />
      </StBtnArea>
      {/* <StTest>ㅁㅁ</StTest> */}
      <StyledSlider {...settings}>
        <StContainer>
          <StBox>
            <DescBox>게임설명이미지</DescBox>
          </StBox>
        </StContainer>
        <StContainer>
          <StBox>
            <DescBox>게임설명이미지</DescBox>
          </StBox>
        </StContainer>
        <StContainer>
          <StBox>
            <DescBox>게임설명이미지</DescBox>
          </StBox>
        </StContainer>
        <StContainer>
          <StBox>
            <DescBox>게임설명이미지</DescBox>
          </StBox>
        </StContainer>
        <StContainer>
          <StBox>
            <DescBox>게임설명이미지</DescBox>
          </StBox>
        </StContainer>
      </StyledSlider>
    </StWrapper>
  );
};

export default GameInfo;

const StyledSlider = styled(Slider)`
  /* width: 100%; */

  .slick-prev {
    left: 30px;
    z-index: 90;
    cursor: pointer;
    &::before {
      color: black;
    }
  }

  .slick-next {
    right: 30px;
    cursor: pointer;
    &::before {
      color: black;
    }
    background-image: exitModalr;
  }
`;

const StWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 16px;
`;

const StContainer = styled.div`
  /* height: 100%; */
  height: 380px;
  display: flex;
  //저스티파이는 안먹힌다?
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
`;

const StExitBtn = styled.img`
  display: absolute;
  cursor: pointer;
`;

const StBtnArea = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 48px;
`;

const StBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const DescBox = styled.div`
  width: 468px;
  height: 100%;
  background-color: #d9d9d9;

  display: flex;
  justify-content: center;
  align-items: center;
`;

// const StTest = styled.img`
//   background-image: url("../../../../assets/icons/ico_modal_cancle.svg");
// `;
