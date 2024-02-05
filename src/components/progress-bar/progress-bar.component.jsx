import React from "react";
import { useScroll, useSpring } from "framer-motion";
import { MotionProgressBar } from "./progress-bar.styles.js";

const ProgressBar = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return <MotionProgressBar style={{ scaleX }} />;
};

export default ProgressBar;
