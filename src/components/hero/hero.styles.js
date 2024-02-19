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

export const SliderText = styled.p`
  position: relative;
  margin: 0px;
  color: white;
  font-size: 175px;
  font-weight: 500;
  padding-right: 50px;

  &:nth-of-type(2) {
    position: absolute;
    left: 100%;
    top: 0;
  }
`;
