import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
//import Nav from "./nav";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import RoundedNavButton from "./rounded-nav-button/rounded-nav-button.component";
import SideNav from "./side-nav/side-nav.component";
//import Rounded from "../../common/RoundedButton";
//import Magnetic from "../../common/Magnetic";

const Navigation = () => {
  //const header = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const button = useRef(null);

  useEffect(() => {
    if (isActive) setIsActive(false);
  }, []);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to(button.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        start: 0,
        end: window.innerHeight,
        onLeave: () => {
          gsap.to(button.current, { scale: 1, duration: 0.25, ease: "power1.out" });
        },
        onEnterBack: () => {
          gsap.to(button.current, { scale: 0, duration: 0.25, ease: "power1.out" }, setIsActive(false));
        },
      },
    });
  }, []);

  return (
    <>
      {/* <div ref={header} className={styles.header}>
        <div className={styles.logo}>
          <p className={styles.copyright}>©</p>
          <div className={styles.name}>
            <p className={styles.codeBy}>Code by</p>
            <p className={styles.dennis}>Dennis</p>
            <p className={styles.snellenberg}>Snellenberg</p>
          </div>
        </div>
        <div className={styles.nav}>
          <Magnetic>
            <div className={styles.el}>
              <a>Work</a>
              <div className={styles.indicator}></div>
            </div>
          </Magnetic>
          <Magnetic>
            <div className={styles.el}>
              <a>About</a>
              <div className={styles.indicator}></div>
            </div>
          </Magnetic>
          <Magnetic>
            <div className={styles.el}>
              <a>Contact</a>
              <div className={styles.indicator}></div>
            </div>
          </Magnetic>
        </div>
      </div> */}
      <div ref={button} >
        <RoundedNavButton
          onClick={() => {
            setIsActive(!isActive);
          }}
        >
          {/* <div className={`${styles.burger} ${isActive ? styles.burgerActive : ""}`}></div> */}
        </RoundedNavButton>
      </div>
      <AnimatePresence mode="wait">{isActive && <SideNav />}</AnimatePresence>
    </>
  );
};

export default Navigation;
