import gsap from "gsap";
import React, { useEffect, useRef } from "react";
import { FillingCircle, StyledRoundedNavButton } from "./rounded-nav-button.styles";
import FramerMagnetic from "../../../common/framer-magnetic/framer-magnetic.component";

const RoundedNavButton = ({ children, ...attributes }) => {
  const onHoverPathFill = useRef(null);
  let timeline = useRef(null);
  let timeoutId = null;
  useEffect(() => {
    timeline.current = gsap.timeline({ paused: true });
    timeline.current
      .to(onHoverPathFill.current, { top: "-25%", width: "150%", duration: 0.4, ease: "power3.in" }, "enter")
      .to(onHoverPathFill.current, { top: "-150%", width: "125%", duration: 0.25 }, "exit");
  }, []);

  const manageMouseEnter = () => {
    if (timeoutId) clearTimeout(timeoutId);
    timeline.current.tweenFromTo("enter", "exit");
  };

  const manageMouseLeave = () => {
    timeoutId = setTimeout(() => {
      timeline.current.play();
    }, 300);
  };

  return (
    <FramerMagnetic>
      <StyledRoundedNavButton
        onMouseEnter={() => {
          manageMouseEnter();
        }}
        onMouseLeave={() => {
          manageMouseLeave();
        }}
        {...attributes}
      >
        {children}
        <FillingCircle ref={onHoverPathFill}></FillingCircle>
      </StyledRoundedNavButton>
    </FramerMagnetic>
  );
};

export default RoundedNavButton;
