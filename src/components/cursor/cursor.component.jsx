import React, { useCallback, useEffect, useRef, useState } from "react";
import { useMotionValue, useSpring } from "framer-motion";
import gsap from "gsap";

import { Container, MotionCursor } from "./cursor.styles";

const Cursor = () => {
  const cursor = useRef();
  const [hasMoved, setHasMoved] = useState(false);
  const [isPointer, setIsPointer] = useState(false);

  const mouse = {
    x: useMotionValue(0),
    y: useMotionValue(0),
  };

  const smoothOptions = { damping: 20, stiffness: 300, mass: 0.5 };
  const smoothMouse = {
    x: useSpring(mouse.x, smoothOptions),
    y: useSpring(mouse.y, smoothOptions),
  };

  const onMouseMove = useCallback(
    ({ clientX, clientY }) => {
      mouse.x.set(clientX);
      mouse.y.set(clientY);
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
        <MotionCursor
          style={{
            left: smoothMouse.x,
            top: smoothMouse.y,
          }}
          $pointer={isPointer}
        />
      </div>
    </Container>
  );
};

export default Cursor;
