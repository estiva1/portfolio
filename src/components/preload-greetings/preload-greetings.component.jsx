import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

import { Introduction } from "./preload-greetings.styles";
import { opacity, slideUp } from "./preload-greetings.anim";

const words = ["Hello", "Bonjour", "Ciao", "Olà", "やあ", "Hallå", "Guten tag", "Привіт"];

const PreloadGreetings = () => {
  const widthCompensator = 6.4; // 1920px/300px
  const [index, setIndex] = useState(0);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setDimensions({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  useEffect(() => {
    if (index == words.length - 1) return;
    setTimeout(
      () => {
        setIndex(index + 1);
      },
      index == 0 ? 1000 : 150
    );
  }, [index]);

  const initialPath = `M0 0 L${dimensions.width} 0 L${dimensions.width} ${dimensions.height} Q${dimensions.width / 2} ${
    dimensions.height + dimensions.width / widthCompensator
  } 0 ${dimensions.height}  L0 0`;
  const targetPath = `M0 0 L${dimensions.width} 0 L${dimensions.width} ${dimensions.height} Q${dimensions.width / 2} ${
    dimensions.height
  } 0 ${dimensions.height}  L0 0`;

  const curve = {
    initial: {
      d: initialPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
    },
    exit: {
      d: targetPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.3 },
    },
  };

  return (
    <Introduction variants={slideUp} initial="initial" exit="exit">
      {dimensions.width > 0 && (
        <>
          <motion.p variants={opacity} initial="initial" animate="enter">
            {/* <span></span> */}
            {words[index]}
          </motion.p>
          <svg>
            <motion.path variants={curve} initial="initial" exit="exit"></motion.path>
          </svg>
        </>
      )}
    </Introduction>
  );
};

export default PreloadGreetings;
