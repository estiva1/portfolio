import styled from "styled-components";
import { motion } from "framer-motion";

export const Container = styled.div`
  position: fixed;
  height: 100vh;
  width: 100%;
  z-index: 9999;
  top: ${({ $pointer }) => ($pointer ? "8px" : "20px")};
  left: ${({ $pointer }) => ($pointer ? "8px" : "20px")};
  transition: top 800ms cubic-bezier(0.19, 1, 0.22, 1), left 800ms cubic-bezier(0.19, 1, 0.22, 1);
  pointer-events: none;
  overflow: visible;

  @media (hover: none) {
    display: none;
  }
`;

export const MotionCursor = styled(motion.div)`
  /* position: absolute;
  transform: translate(-50%, -50%);
  border-radius: 100%;
  border: 1px solid #7B3AF9; // purple
  // backdrop-filter: blur(5px);
  width: 40px;
  height: 40px;
  opacity: 0.75; */
  position: absolute;
  display: flex;
  width: 80px;
  height: 80px;
  place-items: center;
  place-content: center;
  overflow: visible;
  margin: auto;
  transform: ${({ $pointer }) => ($pointer ? "scale(0.3) !important" : "")};
  transition: transform 600ms cubic-bezier(0.19, 1, 0.22, 1);
`;

export const MotionLightning = styled(motion.div)`
  width: 64px;
  height: 64px;
  transform: ${({ $pointer }) => ($pointer ? "rotate(360deg)" : "")};
  transition: transform 800ms cubic-bezier(0.19, 1, 0.22, 1);
`;
