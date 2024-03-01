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

const SideNav = () => {
  return (
    <SideNavContainer variants={menuSlide} initial="initial" animate="enter" exit="exit">
      {/* <div className={styles.body}>
        <div
          onMouseLeave={() => {
            setSelectedIndicator(pathname);
          }}
          className={styles.nav}
        >
          <div className={styles.header}>
            <p>Navigation</p>
          </div>
          {navItems.map((data, index) => {
            return (
              <Link
                key={index}
                data={{ ...data, index }}
                isActive={selectedIndicator == data.href}
                setSelectedIndicator={setSelectedIndicator}
              ></Link>
            );
          })}
        </div>
      </div> */}
      <Curve />
    </SideNavContainer>
  );
};

export default SideNav;
