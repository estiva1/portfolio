import { motion } from "framer-motion";
import styled from "styled-components";

export const MotionProgressBar = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: #ffcc7a;
  transform-origin: 0%;
  z-index: 999;
`;
