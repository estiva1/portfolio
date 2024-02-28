import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Container, MotionCursor } from "./cursor.styles";

const Cursor = () => {
  const cursor = useRef();
  const [hasMoved, setHasMoved] = useState(false);
  const [isPointer, setIsPointer] = useState(false);

  const colorA = "#0CF";
  const colorB = "#86F";
  const inputRange = [0, 1];
  const size = 92;
  const borderRadius = "24px";
  const scale = 1;

  const mouse = {
    x: useMotionValue(0),
    y: useMotionValue(0),
  };

  const smoothOptions = { damping: 20, stiffness: 300, mass: 0.5 };
  const smoothMouse = {
    x: useSpring(mouse.x, smoothOptions),
    y: useSpring(mouse.y, smoothOptions),
  };

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

  const onMouseMove = useCallback(
    ({ clientX, clientY }) => {
      mouse.x.set(clientX/window.innerWidth);
      mouse.y.set(clientY/window.innerHeight);
      setHasMoved(true);
    },
    [hasMoved]
  );

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove, false);

    return () => {
      window.removeEventListener("mousemove", onMouseMove, false);
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

    elements = [...document.querySelectorAll("button, a, input, label, [data-cursor='pointer']")];

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

  return (
    <Container style={{ opacity: hasMoved ? 1 : 0, transition: "opacity 0.6s ease" }}>
      <div ref={cursor}>
        {/* <MotionCursor
          style={{
            left: smoothMouse.x,
            top: smoothMouse.y,
          }}
          $pointer={isPointer}
        /> */}
        <motion.div
          style={{
            left: smoothMouse.x,
            top: smoothMouse.y,
            width: size,
            height: size,
            rotateX: rotateXSpring,
            rotateY: rotateYSpring,
            display: "flex",
            placeItems: "center",
            placeContent: "center",
            overflow: "visible",
            margin: "auto",
            transformPerspective: 1200,
            position: "absolute",
            transform: "translate(-50%, -50%)",
          }}
          initial={{
            borderRadius,
            background: `linear-gradient(180deg, ${colorA} 0%, ${colorB} 100%)`,
          }}
          animate={{
            borderRadius,
            background: `linear-gradient(180deg, ${colorA} 0%, ${colorB} 100%)`,
          }}
        >
          <motion.div
            style={{ width: 64, height: 64 }}
            initial={{ scale }}
            animate={{ scale }}
            transition={{ type: "spring", ...smoothOptions }}
          >
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
                d="M 28.285 6.692 C 29.329 4.952 32 5.692 32 7.721 L 32 20.417 C 32 21.383 32.784 22.167 33.75 22.167 L 53.468 22.167 C 55.022 22.167 55.983 23.863 55.183 25.196 L 35.715 57.642 C 34.671 59.381 32 58.641 32 56.613 L 32 43.917 C 32 42.95 31.216 42.167 30.25 42.167 L 10.533 42.167 C 8.978 42.167 8.018 40.471 8.818 39.138 Z"
                fill="rgb(255,255,255)"
              ></path>
            </motion.svg>
          </motion.div>
        </motion.div>
      </div>
    </Container>
  );
};

export default Cursor;

// import React, { useState, useRef, useEffect, useCallback } from "react";
// import { motion, useSpring, useMotionTemplate, transform, useMotionValue, useTransform } from "framer-motion";
// import { Container, MotionCursor } from "./cursor.styles";

// const spring = { stiffness: 400, damping: 20 };
// const inputRange = [0, 1];

// /**
//  * Based on https://twitter.com/benjaminnathan/status/1288092942968791041
//  * Benjamin den Boer + Adam Seckel
//  * @framerSupportedLayoutWidth auto
//  * @framerSupportedLayoutHeight auto
//  */
// export default function ZapIcon({ scale = 1, borderRadius = "24px", colorA = "#0CF", colorB = "#86F" }) {
//   const size = 92;
//   const clientX = useMotionValue(0.5);
//   const clientY = useMotionValue(0.5);
//   const cursor = useRef();
//   const [hasMoved, setHasMoved] = useState(false);
//   //const isCanvas = RenderTarget.current() === RenderTarget.canvas;

//   useEffect(() => {
//     //if (isCanvas) return;
//     const convertCursorPosition = (e) => {
//       // This can get out of sync when resizing the window
//       clientX.set(e.clientX / window.innerWidth);
//       clientY.set(e.clientY / window.innerHeight);
//     };

//     window.addEventListener("mousemove", convertCursorPosition);

//     return () => {
//       window.removeEventListener("mousemove", convertCursorPosition);
//     };
//   }, []);

//   const rotateX = useTransform(clientX, inputRange, [-24, 24]);
//   const rotateY = useTransform(clientY, inputRange, [24, -24]);
//   const rotateXSpring = useSpring(rotateX, spring);
//   const rotateYSpring = useSpring(rotateY, spring);

//   const x = useTransform(clientX, inputRange, [-20, 20]);
//   const y = useTransform(clientY, inputRange, [-20, 20]);
//   const xSpring = useSpring(x, spring);
//   const ySpring = useSpring(y, spring);

//   const shadowX = useTransform(clientX, inputRange, [8, -8]);
//   const shadowY = useTransform(clientY, inputRange, [24, 12]);
//   const shadowXSpring = useSpring(shadowX, spring);
//   const shadowYSpring = useSpring(shadowY, spring);

//   const filter = useMotionTemplate`drop-shadow(${shadowXSpring}px ${shadowYSpring}px 10px rgba(0, 0, 68, 0.3))`;

//   // const onMouseMove = useCallback(
//   //   ({ clientX, clientY }) => {
//   //     mouse.x.set(clientX);
//   //     mouse.y.set(clientY);
//   //     setHasMoved(true);
//   //   },
//   //   [hasMoved]
//   // );

//   // useEffect(() => {
//   //   window.addEventListener("mousemove", onMouseMove, false);

//   //   return () => {
//   //     window.removeEventListener("mousemove", onMouseMove, false);
//   //   };
//   // }, [hasMoved]);

//   return (
//     <Container>
//       <div ref={cursor}>
//         <motion.div
//           style={{
//             width: size,
//             height: size,
//             rotateX: rotateXSpring,
//             rotateY: rotateYSpring,
//             display: "flex",
//             placeItems: "center",
//             placeContent: "center",
//             overflow: "visible",
//             margin: "auto",
//             transformPerspective: 1200,
//           }}
//           initial={{
//             borderRadius,
//             background: `linear-gradient(180deg, ${colorA} 0%, ${colorB} 100%)`,
//           }}
//           animate={{
//             borderRadius,
//             background: `linear-gradient(180deg, ${colorA} 0%, ${colorB} 100%)`,
//           }}
//         >
//           <motion.div
//             style={{ width: 64, height: 64 }}
//             initial={{ scale }}
//             animate={{ scale }}
//             transition={{ type: "spring", ...spring }}
//           >
//             <motion.svg
//               xmlns="http://www.w3.org/2000/svg"
//               width="64"
//               height="64"
//               style={{
//                 x: xSpring,
//                 y: ySpring,
//                 filter,
//               }}
//               transition={{ type: "spring", ...spring }}
//             >
//               <path
//                 d="M 28.285 6.692 C 29.329 4.952 32 5.692 32 7.721 L 32 20.417 C 32 21.383 32.784 22.167 33.75 22.167 L 53.468 22.167 C 55.022 22.167 55.983 23.863 55.183 25.196 L 35.715 57.642 C 34.671 59.381 32 58.641 32 56.613 L 32 43.917 C 32 42.95 31.216 42.167 30.25 42.167 L 10.533 42.167 C 8.978 42.167 8.018 40.471 8.818 39.138 Z"
//                 fill="rgb(255,255,255)"
//               ></path>
//             </motion.svg>
//           </motion.div>
//         </motion.div>
//       </div>
//     </Container>
//   );
// }
