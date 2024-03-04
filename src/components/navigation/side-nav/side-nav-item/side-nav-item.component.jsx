import { motion } from "framer-motion";
import { slide, scale } from "../side-nav.anim";
import { Indicator, NavItem } from "./side-nav-item.styles";

const SlideNavItem = ({ data, isActive }) => {
  const { title, index } = data;

  return (
    <motion.ul custom={index} variants={slide} initial="initial" animate="enter" exit="exit">
      {/* <Indicator variants={scale} animate={isActive ? "open" : "closed"}></Indicator> */}
      <NavItem>{title}</NavItem>
    </motion.ul>
  );
};

export default SlideNavItem;
