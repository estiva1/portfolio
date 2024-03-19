import React, { useEffect, useState } from "react";
import { useFrame } from "@studio-freight/hamo";
import { ReactLenis, useLenis } from "@studio-freight/react-lenis";

import { Fade, GradientCanvas, StyledLayout } from "./layout.styles";
import Cursor from "../components/cursor/cursor.component";
import Header from "../components/header/header.component";
import { AnimatePresence } from "framer-motion";
import PreloadGreetings from "../components/preload-greetings/preload-greetings.component";
import Noise from "../components/noise/noise.component";
import { Gradient } from "../shaders/mesh-gradient/mesh-gradient.component";

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
        //document.body.style.cursor = "default";
        window.scrollTo(0, 0);
      }, 2500);
    })();
  }, []);

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
