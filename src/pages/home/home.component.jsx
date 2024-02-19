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

  useEffect(() => {
    const top = cardsRect.top - windowHeight / 2;
    addThreshold({ id: "cards-start", value: top });
    addThreshold({ id: "cards-end", value: top + cardsRect.height });
    addThreshold({
      id: "red-end",
      value: top + cardsRect.height + windowHeight,
    });
  }, [cardsRect]);

  useEffect(() => {
    const top = whiteRect.top - windowHeight;
    addThreshold({ id: "light-start", value: top });
  }, [whiteRect]);

  useEffect(() => {
    const top = featuresRect.top;
    addThreshold({ id: "features", value: top });
  }, [featuresRect]);

  useEffect(() => {
    const top = inuseRect.top;
    addThreshold({ id: "in-use", value: top });
  }, [inuseRect]);

  useEffect(() => {
    const top = lenis?.limit;
    addThreshold({ id: "end", value: top });
  }, [lenis?.limit]);

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

  //--------------------------------------------
  const [isLoading, setIsLoading] = useState(true);

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
    <Layout>
      <Leva hidden={debug} />
      <RealViewport />
      {/* <Noise/> */}
      <AnimatePresence mode="wait">{isLoading && <PreloadGreetings />}</AnimatePresence>
      <Canvas>
        <WebGL />
      </Canvas>
      <Hero />
      {/* <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "40vw" }}>
        <GetInTouchButton />
      </div> */}
      <div style={{ maxWidth: "100px", color: "#fff" }}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae quisquam totam assumenda, repellat similique
        sequi officiis, praesentium magni possimus itaque eveniet sint, fuga ipsa cum at ut! Debitis libero reiciendis
        sit veritatis. Vero, numquam? Quod libero amet tempore atque ea quasi rem quae maxime ut? Fuga dolore ipsum et
        cupiditate nostrum doloremque assumenda veniam repellat blanditiis, a exercitationem voluptatem suscipit aliquam
        esse. Odio voluptatibus iste, assumenda illum blanditiis sed tempora at? Laboriosam ipsa illum, accusantium
        nesciunt tenetur delectus repellendus unde maiores esse similique deserunt praesentium amet debitis culpa
        voluptas dolorum, temporibus consectetur corrupti. Ipsa minus aut, inventore ab odit eaque repellendus in dolor
        maxime dolorum exercitationem esse vitae laudantium cumque soluta perferendis iusto ullam. Aperiam libero quam
        unde ratione laudantium rerum culpa quibusdam quisquam et! Illo deserunt et aspernatur, asperiores officia nulla
        eum nostrum delectus iusto ut amet fugit nisi cum debitis minima tenetur quibusdam ullam aperiam a laboriosam
        repudiandae natus? Distinctio, pariatur! Ipsam veniam sunt ea maiores rem veritatis aut, mollitia tempora illo
        sint numquam eos quidem magni ullam officia quae aliquid sit et. Quasi maxime illum vero quibusdam aut adipisci
        accusantium magni atque dolores obcaecati sequi, dolor quam? Commodi modi fugit voluptas placeat aliquam sunt
        amet! Consequatur laboriosam consectetur, saepe cum adipisci, libero illum nam, qui ab quae quaerat nihil
        voluptates ea nisi? Blanditiis iusto doloribus aspernatur cum numquam est nemo exercitationem vel facilis sit
        ipsa eius possimus asperiores nihil nulla laboriosam, autem corporis nesciunt consectetur. Odio provident
        placeat eos eius doloribus facere assumenda nulla aliquid nihil reiciendis, molestiae culpa quo animi inventore
        sequi obcaecati voluptatibus sed officiis beatae molestias modi quibusdam? Incidunt reprehenderit dicta id
        voluptatum ipsum, voluptate tempora praesentium repudiandae recusandae, hic sed a facilis. Quisquam blanditiis
        adipisci libero natus culpa unde officiis qui sed, cupiditate magni id delectus neque, porro, laboriosam
        deserunt dolorem aspernatur. Similique perspiciatis voluptas aliquam vel sapiente culpa totam suscipit natus
        facilis consequatur reiciendis numquam harum excepturi, quam consectetur distinctio quos nesciunt recusandae
        repellendus modi quasi repellat? Est repellat asperiores pariatur hic saepe dolorem facere suscipit unde
        impedit. In voluptatibus dignissimos explicabo at maxime ipsum eos. Necessitatibus tempore quos quas dolorem
        voluptatum dolorum. Velit, alias possimus odit officiis accusamus laudantium ad facilis? Fuga quisquam minima
        sed ea ducimus exercitationem impedit iste architecto beatae consequuntur, explicabo amet eos magni iusto
        expedita ipsum reiciendis provident vitae natus modi voluptate et adipisci voluptas. Quisquam ad similique
        repudiandae aperiam, nulla eos minima quo ea praesentium quam, omnis, aliquam vel excepturi mollitia. Officia
        delectus id sunt, rerum et mollitia neque, inventore, alias molestias dolore dolores animi quis at voluptates
        accusamus omnis obcaecati provident! Soluta quam tempora accusamus cupiditate officiis nostrum minima
        blanditiis. Dolor impedit quis fugiat cumque! Doloremque placeat eligendi blanditiis voluptas vero iure eum
        eveniet. Modi possimus itaque, dolores qui delectus aut nemo pariatur perspiciatis voluptas consequuntur
        assumenda rerum exercitationem libero explicabo iusto, asperiores unde? Cumque, deserunt sapiente quo inventore
        corporis est sunt voluptatibus, dolorem, vitae officiis quisquam reiciendis! Iure quae magni quia fugit beatae.
        Numquam voluptatibus deserunt sapiente ducimus veniam, autem tempore totam! Eveniet, quaerat.
      </div>
    </Layout>
  );
};

export default Home;
