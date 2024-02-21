import styled from "styled-components";
import { motion } from "framer-motion";

export const HeroContainer = styled(motion.section)`
  position: relative;
  display: flex;
  height: 100vh;
  overflow: hidden;
`;

export const SliderContainer = styled.div`
  position: absolute;
  top: calc(100vh - 250px);
`;

export const Slider = styled.div`
  position: relative;
  white-space: nowrap;
`;

export const SliderText = styled.h1`
  position: relative;
  display: flex;
  align-items: center;
  color: #fff;
  margin: 0px;
  font-size: 10rem;
  font-weight: 400;
  white-space: nowrap;
  pointer-events: none;

  &:nth-of-type(2) {
    position: absolute;
    left: 100%;
    top: 0;
  }
`;

export const Spacer = styled.span`
  padding-inline: 3rem;
  //font-size: 7.5rem;
`;
