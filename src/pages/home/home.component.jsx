import React, { useEffect, useRef, useState } from "react";
import Layout from "../../layout/layout.component";
import { Canvas } from "./home.styles";
import { WebGL } from "../../components/webgl";
import { Leva, button, useControls } from "leva";
import { useDebug, useFrame, useRect } from "@studio-freight/hamo";
import { useIntersection, useWindowSize } from "react-use";
import { RealViewport } from "../../components/real-viewport/real-viewport.component.jsx";
import { useScroll } from "../../hooks/useScroll.js";
import { useStore } from "../../lib/store.js";
import { clamp, mapRange } from "../../lib/maths.js";
import { useLenis } from "@studio-freight/react-lenis";
import GetInTouchButton from "../../common/get-in-touch-button/get-in-touch-button.component.jsx";
import { AnimatePresence } from "framer-motion";
import PreloadGreetings from "../../components/preload-greetings/preload-greetings.component.jsx";
import Noise from "../../components/noise/noise.component.jsx";
import Hero from "../../components/hero/hero.component.jsx";

const Home = () => {
  const debug = useDebug();

  useEffect(() => {
    window.history.scrollRestoration = "manual";
  }, []);

  //----------------------

  const [hasScrolled, setHasScrolled] = useState();
  const zoomRef = useRef(null);
  const [zoomWrapperRectRef, zoomWrapperRect] = useRect();
  const { height: windowHeight } = useWindowSize();
  const introOut = useStore(({ introOut }) => introOut);

  const [theme, setTheme] = useState("dark");
  const lenis = useLenis(({ lenis }) => lenis);

  useControls(
    "lenis",
    () => ({
      stop: button(() => {
        lenis.stop();
      }),
      start: button(() => {
        lenis.start();
      }),
    }),
    [lenis]
  );

  useControls(
    "scrollTo",
    () => ({
      immediate: button(() => {
        lenis.scrollTo(30000, { immediate: true });
      }),
      smoothDuration: button(() => {
        lenis.scrollTo(30000, { lock: true, duration: 10 });
      }),
      smooth: button(() => {
        lenis.scrollTo(30000);
      }),
      forceScrollTo: button(() => {
        lenis.scrollTo(30000, { force: true });
      }),
    }),
    [lenis]
  );

  useEffect(() => {
    if (!lenis) return;

    function onClassNameChange(lenis) {
      console.log(lenis.className);
    }

    lenis.on("className change", onClassNameChange);

    return () => {
      lenis.off("className change", onClassNameChange);
    };
  }, [lenis]);

  useScroll(({ scroll }) => {
    setHasScrolled(scroll > 10);
    if (!zoomWrapperRect.top) return;

    const start = zoomWrapperRect.top + windowHeight * 0.5;
    const end = zoomWrapperRect.top + zoomWrapperRect.height - windowHeight;

    const progress = clamp(0, mapRange(start, end, scroll, 0, 1), 1);
    const center = 0.6;
    const progress1 = clamp(0, mapRange(0, center, progress, 0, 1), 1);
    const progress2 = clamp(0, mapRange(center - 0.055, 1, progress, 0, 1), 1);
    setTheme(progress2 === 1 ? "light" : "dark");

    zoomRef.current.style.setProperty("--progress1", progress1);
    zoomRef.current.style.setProperty("--progress2", progress2);

    if (progress === 1) {
      zoomRef.current.style.setProperty("background-color", "currentColor");
    } else {
      zoomRef.current.style.removeProperty("background-color");
    }
  });

  const [whyRectRef, whyRect] = useRect();
  const [cardsRectRef, cardsRect] = useRect();
  const [whiteRectRef, whiteRect] = useRect();
  const [featuresRectRef, featuresRect] = useRect();
  const [inuseRectRef, inuseRect] = useRect();

  const addThreshold = useStore(({ addThreshold }) => addThreshold);

  useEffect(() => {
    addThreshold({ id: "top", value: 0 });
  }, []);

  useEffect(() => {
    const top = whyRect.top - windowHeight / 2;
    addThreshold({ id: "why-start", value: top });
    addThreshold({
      id: "why-end",
      value: top + whyRect.height,
    });
  }, [whyRect]);

  // useEffect(() => {
  //   const top = cardsRect.top - windowHeight / 2;
  //   addThreshold({ id: "cards-start", value: top });
  //   addThreshold({ id: "cards-end", value: top + cardsRect.height });
  //   addThreshold({
  //     id: "red-end",
  //     value: top + cardsRect.height + windowHeight,
  //   });
  // }, [cardsRect]);

  // useEffect(() => {
  //   const top = whiteRect.top - windowHeight;
  //   addThreshold({ id: "light-start", value: top });
  // }, [whiteRect]);

  // useEffect(() => {
  //   const top = featuresRect.top;
  //   addThreshold({ id: "features", value: top });
  // }, [featuresRect]);

  // useEffect(() => {
  //   const top = inuseRect.top;
  //   addThreshold({ id: "in-use", value: top });
  // }, [inuseRect]);

  // useEffect(() => {
  //   const top = lenis?.limit;
  //   addThreshold({ id: "end", value: top });
  // }, [lenis?.limit]);

  useScroll((e) => {
    console.log(window.scrollY, e.scroll, e.isScrolling, e.velocity, e.isLocked);
  });

  useFrame(() => {
    console.log("frame", window.scrollY, lenis?.scroll, lenis?.isScrolling);
  }, 1);

  const inUseRef = useRef();

  const [visible, setIsVisible] = useState(false);
  const intersection = useIntersection(inUseRef, {
    threshold: 0.2,
  });
  useEffect(() => {
    if (intersection?.isIntersecting) {
      setIsVisible(true);
    }
  }, [intersection]);

  return (
    <Layout>
      <Leva hidden={debug} />
      <RealViewport />
      <Noise />
      <Canvas>
        <WebGL />
      </Canvas>
      <Hero />
      <div style={{ maxWidth: "50px" }}>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam consequatur quam nam dolores nulla rem natus
        fugit qui consequuntur possimus. Ipsam et dolorum praesentium voluptatem odio corrupti eius in cupiditate nihil
        perspiciatis modi qui libero minus, mollitia itaque dolore inventore aliquam. Dolore non perspiciatis iusto
        illum. Praesentium iusto amet veniam soluta numquam nihil quia doloribus, maiores earum tempora vero sint quis
        voluptate incidunt. Impedit, voluptatum quibusdam voluptates molestiae ex facere ipsa laudantium ullam nam porro
        non debitis quam accusamus harum voluptate consequuntur officiis quaerat fugit nobis. Quidem, porro illo eius
        molestiae sapiente inventore? Quibusdam, suscipit.
      </div>
      <div style={{ maxWidth: "50px" }} ref={whyRectRef}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio ipsa incidunt doloremque perferendis quibusdam?
        Dolorum incidunt non architecto tenetur repellat.
      </div>
      {/* <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "40vw" }}>
        <GetInTouchButton />
      </div> */}
    </Layout>
  );
};

export default Home;
