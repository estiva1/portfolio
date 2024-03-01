import { motion } from "framer-motion";
import styled from "styled-components";

export const SideSVGCurve = styled.svg`
  position: absolute;
  top: 0;
  left: -99px;
  width: 100px;
  height: 100%;
  fill: #292929ff;
  //opacity: 0.25;
  stroke: none;
`;

export const SideNavContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  padding: 50px;
  background-color: #292929ff;
  //opacity: 0.25;
`;
