import styled from "styled-components";
import { motion } from "framer-motion";

export const Indicator = styled(motion.span)`
  width: 10px;
  height: 10px;
  background-color: white;
  border-radius: 50%;
  position: absolute;
  left: -30px;
`;

export const NavItem = styled.li`
  font-size: 5rem;
  color: #fff;
`;
