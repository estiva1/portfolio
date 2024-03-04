import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";

import { Container, MotionCursor, MotionLightning } from "./cursor.styles";

const Cursor = () => {
  const cursor = useRef();
  const [hasMoved, setHasMoved] = useState(false);
  const [isPointer, setIsPointer] = useState(false);

  const palleteA = {
    aA: "#0cf",
    aB: "#86f",
  };
  const palleteB = {
    bA: "#f49",
    bB: "#94f",
  };
  const inputRange = [0, 1];
  const borderRadius = "24px";

  const mouse = {
    x: useMotionValue(0),
    y: useMotionValue(0),
  };
  const styledCursor = {
    x: useMotionValue(0),
    y: useMotionValue(0),
  };

  const smoothOptions = { damping: 20, stiffness: 400 };
  const smoothCursor = {
    x: useSpring(styledCursor.x, smoothOptions),
    y: useSpring(styledCursor.y, smoothOptions),
  };

  const onMouseMove = useCallback(({ clientX, clientY }) => {
    mouse.x.set(clientX / window.innerWidth);
    mouse.y.set(clientY / window.innerHeight);
  }, []);

  const onCursorMove = useCallback(
    ({ clientX, clientY }) => {
      styledCursor.x.set(clientX);
      styledCursor.y.set(clientY);
      setHasMoved(true);
    },
    [hasMoved]
  );

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove, false);
    window.addEventListener("mousemove", onCursorMove, false);

    return () => {
      window.removeEventListener("mousemove", onMouseMove, false);
      window.removeEventListener("mousemove", onCursorMove, false);
    };
  }, [hasMoved]);

  useEffect(() => {
    document.documentElement.classList.add("has-custom-cursor");

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  useEffect(() => {
    let elements = [];

    const onMouseEnter = () => {
      setIsPointer(true);
    };
    const onMouseLeave = () => {
      setIsPointer(false);
    };

    elements = [...document.querySelectorAll("button, a, h3, input, label, [data-cursor='pointer']")];

    elements.forEach((el) => {
      el.addEventListener("mouseenter", onMouseEnter, false);
      el.addEventListener("mouseleave", onMouseLeave, false);
    });

    return () => {
      elements.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnter, false);
        el.removeEventListener("mouseleave", onMouseLeave, false);
      });
    };
  }, []);

  const rotateX = useTransform(mouse.x, inputRange, [-24, 24]);
  const rotateY = useTransform(mouse.y, inputRange, [24, -24]);
  const rotateXSpring = useSpring(rotateX, smoothOptions);
  const rotateYSpring = useSpring(rotateY, smoothOptions);

  const x = useTransform(mouse.x, inputRange, [-20, 20]);
  const y = useTransform(mouse.y, inputRange, [-20, 20]);
  const xSpring = useSpring(x, smoothOptions);
  const ySpring = useSpring(y, smoothOptions);

  const shadowX = useTransform(mouse.x, inputRange, [8, -8]);
  const shadowY = useTransform(mouse.y, inputRange, [24, 12]);
  const shadowXSpring = useSpring(shadowX, smoothOptions);
  const shadowYSpring = useSpring(shadowY, smoothOptions);

  const filter = useMotionTemplate`drop-shadow(${shadowXSpring}px ${shadowYSpring}px 10px rgba(0, 0, 68, 0.3))`;

  return (
    <Container ref={cursor} style={{ opacity: hasMoved ? 1 : 0, transition: "opacity 0.6s ease" }} $pointer={isPointer}>
      <MotionCursor
        style={{
          top: smoothCursor.y,
          left: smoothCursor.x,
          rotateX: rotateXSpring,
          rotateY: rotateYSpring,
          transformPerspective: 1200,
        }}
        initial={{
          borderRadius,
          background: !isPointer
            ? `linear-gradient(180deg, ${palleteA.aA} 0%, ${palleteA.aB} 100%)`
            : `linear-gradient(180deg, ${palleteB.bA} 0%, ${palleteB.bB} 100%)`,
        }}
        animate={{
          borderRadius,
          background: !isPointer
            ? `linear-gradient(180deg, ${palleteA.aA} 0%, ${palleteA.aB} 100%)`
            : `linear-gradient(180deg, ${palleteB.bA} 0%, ${palleteB.bB} 100%)`,
        }}
        $pointer={isPointer}
      >
        <MotionLightning initial={1} animate={1} transition={{ type: "spring", ...smoothOptions }} $pointer={isPointer}>
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            width="64"
            height="64"
            style={{
              x: xSpring,
              y: ySpring,
              filter,
            }}
            transition={{ type: "spring", ...smoothOptions }}
          >
            <path
              className="lightning"
              d="M 28.285 6.692 C 29.329 4.952 32 5.692 32 7.721 L 32 20.417 C 32 21.383 32.784 22.167 33.75 22.167 L 53.468 22.167 C 55.022 22.167 55.983 23.863 55.183 25.196 L 35.715 57.642 C 34.671 59.381 32 58.641 32 56.613 L 32 43.917 C 32 42.95 31.216 42.167 30.25 42.167 L 10.533 42.167 C 8.978 42.167 8.018 40.471 8.818 39.138 Z"
              fill="rgb(255,255,255)"
            ></path>
          </motion.svg>
        </MotionLightning>
      </MotionCursor>
    </Container>
  );
};

export default Cursor;
