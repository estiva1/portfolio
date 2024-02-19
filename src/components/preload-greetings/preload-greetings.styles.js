import styled from "styled-components";
import { motion } from "framer-motion";

export const Introduction = styled(motion.div)`
  display: flex;
  position: fixed;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: #141516;
  box-shadow: 0px 30px 25px rgba(0, 0, 0, 0.748);
  z-index: 99;

  svg {
    position: absolute;
    top: 0;
    width: 100%;
    height: calc(100% + 300px);
    path {
      fill: #141516;
    }
  }

  p {
    display: flex;
    color: #fff;
    font-size: 42px;
    align-items: center;
    position: absolute;
    z-index: 1;
    
    /* span {
      display: block;
      width: 10px;
      height: 10px;
      background-color: #fff;
      border-radius: 50%;
      margin-right: 10px;
    } */
  }
`;
