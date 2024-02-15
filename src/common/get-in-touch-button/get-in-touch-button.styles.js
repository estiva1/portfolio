import { motion } from "framer-motion";
import styled from "styled-components";

export const StyledGITButton = styled(motion.button)`
  /* --purple: #db07d1;
  --pink: #f2056f;
  --blue: #61dafb; */

  appearance: none;
  border: none;
  cursor: pointer;
  background-color: #acc7ed;
  color: #fff;
  border-radius: 60px;
  outline: none;
  margin: 0;
  padding: 12px 25px;
  //font-family: "Poppins";
  font-size: 48px;
  font-weight: 600;
  //line-height: 48px;
  //letter-spacing: -1px;
  position: relative;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ShapesContainer = styled(motion.div)`
  position: absolute;
  top: -1px;
  left: -1px;
  right: -1px;
  bottom: -1px;
  border-radius: 60px;
  background: linear-gradient(60deg, #61dafb 0%, #d6cbf6 30%, #f2056f 70%);

  canvas {
    position: absolute;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }
`;

export const Blush = styled.div`
  position: absolute;
  bottom: -15px;
  width: 150px;
  height: 30px;
  filter: blur(20px);

  &.pink {
    right: 20px;
    background: #db07d1;
  }

  &.blue {
    left: 20px;
    background: #61dafb;
  }
`;

export const Container = styled.div`
  position: absolute;
  top: -100px;
  bottom: -100px;
  left: -100px;
  right: -100px;
  width: calc(100% + 200px);
  pointer-events: none;
`;

export const Label = styled(motion.span)`
  transform: translateZ(0);
  font-weight: 700;
  z-index: 1;
`;
