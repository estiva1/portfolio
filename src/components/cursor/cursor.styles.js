import styled from "styled-components";
import { motion } from "framer-motion";

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  z-index: 9999;
  pointer-events: none;
  overflow: hidden;

  @media (hover: none) {
    display: none;
  }
`;

export const MotionCursor = styled(motion.div)`
  position: absolute;
  transform: translate(-50%, -50%);
  border-radius: 100%;
  border: 1px solid #ff98a2; // pink
  width: 40px;
  height: 40px;
  opacity: 0.75;
  transform: ${({ $pointer }) => ($pointer ? "translate(-50%, -50%) scale(0.5)" : "")};
  transition: transform 600ms cubic-bezier(0.19, 1, 0.22, 1), border 600ms cubic-bezier(0.19, 1, 0.22, 1);
`;
