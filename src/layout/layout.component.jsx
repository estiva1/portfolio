import React, { useEffect, useState } from "react";
import { useFrame } from "@studio-freight/hamo";
import { ReactLenis, useLenis } from "@studio-freight/react-lenis";

import { Fade, GradientCanvas, StyledLayout } from "./layout.styles";
import Cursor from "../components/cursor/cursor.component";
import Header from "../components/header/header.component";
import { AnimatePresence } from "framer-motion";
import PreloadGreetings from "../components/preload-greetings/preload-greetings.component";
import Noise from "../components/noise/noise.component";
import { Gradient } from "whatamesh";

const Layout = ({ children }) => {
  const lenis = useLenis(({ scroll }) => {});
  const [isLoading, setIsLoading] = useState(true);

  useFrame((time) => {
    lenis?.raf(time);
  }, 0);

  useEffect(() => {
    (() => {
      setTimeout(() => {
        setIsLoading(false);
        document.body.style.cursor = "default";
        window.scrollTo(0, 0);
      }, 2500);
    })();
  }, []);

  // const palettes = [
  //   ["#C3E4FF", "#6EC3F4", "#EAE2FF", "#B9BEFF", "#B3B8F9"],
  //   ["#69D2E7", "#A7DBD8", "#E0E4CC", "#F38630", "#FA6900"],
  // ];

  // const [isWireframe, setIsWireframe] = useState(false);
  // const [colorIndex, setColorIndex] = useState(1);
  // const [speed, setSpeed] = useState(0.002);

  const gradient = new Gradient();
  useEffect(() => {
    gradient.initGradient(GradientCanvas);
  }, []);

  return (
    <ReactLenis root>
      <StyledLayout>
        <AnimatePresence mode="wait">{isLoading && <PreloadGreetings />}</AnimatePresence>
        <Cursor />
        <Header />
        <GradientCanvas />

        <main>{children}</main>
      </StyledLayout>
    </ReactLenis>
  );
};

export default Layout;
