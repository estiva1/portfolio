import React, { Suspense, useState } from "react";
import useMeasure from "react-use-measure";
import { MotionConfig, useMotionValue } from "framer-motion";
import { Blush, Container, Label, ShapesContainer, StyledGITButton } from "./get-in-touch-button.styles";
import { transition } from "../../figures/settings";
import { Shapes } from "../../figures/figures";

const GetInTouchButton = () => {
  const [ref, bounds] = useMeasure({ scroll: false });
  const [isHover, setIsHover] = useState(false);
  const [isPress, setIsPress] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const resetMousePosition = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <MotionConfig transition={transition}>
      <StyledGITButton
        ref={ref}
        initial={false}
        animate={isHover ? "hover" : "rest"}
        whileTap="press"
        variants={{
          rest: { scale: 1 },
          hover: { scale: 1.5 },
          press: { scale: 1.4 },
        }}
        onHoverStart={() => {
          resetMousePosition();
          setIsHover(true);
        }}
        onHoverEnd={() => {
          resetMousePosition();
          setIsHover(false);
        }}
        onTapStart={() => setIsPress(true)}
        onTap={() => setIsPress(false)}
        onTapCancel={() => setIsPress(false)}
        onPointerMove={(e) => {
          mouseX.set(e.clientX - bounds.x - bounds.width / 2);
          mouseY.set(e.clientY - bounds.y - bounds.height / 2);
        }}
      >
        <ShapesContainer
          variants={{
            rest: { opacity: 0 },
            hover: { opacity: 1 },
          }}
        >
          <Blush className="pink" />
          <Blush className="blue" />
          <Container>
            <Suspense fallback={null}>
              <Shapes isHover={isHover} isPress={isPress} mouseX={mouseX} mouseY={mouseY} />
            </Suspense>
          </Container>
        </ShapesContainer>
        <Label variants={{ hover: { scale: 0.85 }, press: { scale: 1.1 } }}>Contact me</Label>
      </StyledGITButton>
    </MotionConfig>
  );
};

export default GetInTouchButton;
