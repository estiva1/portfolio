import React, { useEffect, useState } from "react";
import { useFrame } from "@studio-freight/hamo";
import { ReactLenis, useLenis } from "@studio-freight/react-lenis";

import { StyledLayout } from "./layout.styles";
import Cursor from "../components/cursor/cursor.component";
import Header from "../components/header/header.component";
import { AnimatePresence } from "framer-motion";
import PreloadGreetings from "../components/preload-greetings/preload-greetings.component";

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

  return (
    <ReactLenis root>
      <StyledLayout>
        <AnimatePresence mode="wait">{isLoading && <PreloadGreetings />}</AnimatePresence>
        <Cursor />
        <Header />
        <main style={{ flexGrow: 1 }}>{children}</main>
      </StyledLayout>
    </ReactLenis>
  );
};

export default Layout;
