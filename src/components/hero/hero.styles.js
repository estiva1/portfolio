import styled from "styled-components";
import { motion } from "framer-motion";

export const HeroContainer = styled(motion.section)`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  //height: 100vh;
  overflow: hidden;
`;

export const SliderContainer = styled.div`
  position: absolute;
  top: calc(100vh - 250px);
`;

export const Slider = styled.div`
  position: relative;
`;

export const SliderText = styled.h1`
  position: relative;
  display: flex;
  align-items: center;
  color: #fff;
  margin: 0px;
  // font-size: max(10rem, 14vw);
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

export const HeroGlassBox = styled.div`
  padding: 100px;
  width: 900px;
  height: 400px;
  border-radius: 15px;
  -webkit-backdrop-filter: blur(4px);
  backdrop-filter: blur(4px);
  //background-image: linear-gradient(to bottom right, #fe7630, #ffc711);
  -webkit-box-shadow: 0 25px 23px rgba(0, 0, 0, 0.15);
  box-shadow: 0 25px 23px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
`;
