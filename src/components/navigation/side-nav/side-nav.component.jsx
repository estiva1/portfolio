import React from "react";
import { motion } from "framer-motion";

import { menuSlide } from "./side-nav.anim";
import { SideNavContainer, SideSVGCurve } from "./side-nav.styles";

const Curve = () => {
  const initialPath = `M100 0 L100 ${window.innerHeight} Q-100 ${window.innerHeight / 2} 100 0`;
  const targetPath = `M100 0 L100 ${window.innerHeight} Q100 ${window.innerHeight / 2} 100 0`;

  const curve = {
    initial: {
      d: initialPath,
    },
    enter: {
      d: targetPath,
      transition: { duration: 1, ease: [0.76, 0, 0.24, 1] },
    },
    exit: {
      d: initialPath,
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
    },
  };

  return (
    <SideSVGCurve>
      <motion.path variants={curve} initial="initial" animate="enter" exit="exit"></motion.path>
    </SideSVGCurve>
  );
};

const navItems = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Work",
    href: "/work",
  },
  {
    title: "About",
    href: "/about",
  },
  {
    title: "Contact",
    href: "/contact",
  },
];

const SideNav = () => {
  return (
    <SideNavContainer variants={menuSlide} initial="initial" animate="enter" exit="exit">
      <div>
        {/* <div className={styles.header}>
          <p>Navigation</p>
        </div> */}
        {navItems.map((item, index) => {
          return (
            <p style={{ color: "white", fontSize: "5rem" }} key={index}>
              {item.title}
            </p>
          );
        })}
      </div>
      <Curve />
    </SideNavContainer>
  );
};

export default SideNav;
