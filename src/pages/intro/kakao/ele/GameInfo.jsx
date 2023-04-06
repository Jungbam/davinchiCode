import React from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";

import exitModal from "../../../../assets/icons/ico_modal_cancle.svg";
import { motion } from "framer-motion";
import { IMG } from "../../../../helpers/image";
import { Variants } from "../../../../helpers/Variants";

const GameInfo = ({ closeModal }) => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    speed: 700,
    slidesToScroll: 1,
    arrows: true,
    pauseOnHover: true,
    customPaging: (i) => (
      <div
        style={{
          width: "8px",
          height: "8px",
          border: "solid 1px #000",
          backgroundColor: "#ffdf24",
          borderRadius: "99px",
        }}
      ></div>
    ),
  };
  return (
    <StWrapper>
      <StExitBtn
        variants={Variants.button}
        whileHover="hover"
        onClick={closeModal}
        src={exitModal}
        alt="닫기"
      />
      <StyledSlider {...settings}>
        <StBox>
          <DescBox src={IMG.GameInfo1} />
        </StBox>
        <StBox>
          <DescBox src={IMG.GameInfo2} />
        </StBox>
        <StBox>
          <DescBox src={IMG.GameInfo3} />
        </StBox>
        <StBox>
          <DescBox src={IMG.GameInfo4} />
        </StBox>
        <StBox>
          <DescBox src={IMG.GameInfo5} />
        </StBox>
        <StBox>
          <DescBox src={IMG.GameInfo6} />
        </StBox>
        <StBox>
          <DescBox src={IMG.GameInfo7} />
        </StBox>
      </StyledSlider>
    </StWrapper>
  );
};

export default GameInfo;

const StyledSlider = styled(Slider)`
  height: 100%;
  .slick-list {
    width: 100%;
    height: 100%;
  }
  .slick-track {
    height: 100%;
  }
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
  }
  .slick-dots {
    position: absolute;
    bottom: 16px;
  }
  .slick-dots .slick-active div {
    scale: 1.5;
  }
`;

const StWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;
const StExitBtn = styled(motion.img)`
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 20;
  cursor: pointer;
`;
const StBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;
const DescBox = styled.img`
  width: 628px;
  height: 600px;
  object-fit: cover;
`;
