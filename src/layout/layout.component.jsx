import { useStore } from "../lib/store";
import React, { useEffect } from "react";
import { useFrame } from "@studio-freight/hamo";
import { ReactLenis, useLenis } from "@studio-freight/react-lenis";

import { StyledLayout } from "./layout.styles";
import Cursor from "../components/cursor/cursor.component";
import Header from "../components/header/header.component";

const Layout = ({ children }) => {
  //   const [lenis, setLenis] = useStore((state) => [state.lenis, state.setLenis]);
  const lenis = useLenis(({ scroll }) => {});

  //   useEffect(() => {
  //     window.scrollTo(0, 0);
  //     const lenis = new Lenis({
  //       // gestureOrientation: 'both',
  //       smoothWheel: true,
  //       // smoothTouch: true,
  //       syncTouch: true,
  //     });
  //     window.lenis = lenis;
  //     setLenis(lenis);

  //     // new ScrollSnap(lenis, { type: 'proximity' })

  //     return () => {
  //       lenis.destroy();
  //       setLenis(null);
  //     };
  //   }, []);

  useFrame((time) => {
    lenis?.raf(time);
  }, 0);

  return (
    <ReactLenis root>
      <StyledLayout>
        <Cursor />
        {/* <Header /> */}
        <main style={{ flexGrow: 1 }}>{children}</main>
      </StyledLayout>
    </ReactLenis>
  );
};

export default Layout;
