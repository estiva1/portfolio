import gsap from "gsap";
import React from "react";
import { ScrollTrigger } from "gsap/all";
import { useRef, useLayoutEffect } from "react";

import { slideUp } from "./hero.anim";
import { HeroContainer, Slider, SliderContainer, SliderText } from "./hero.styles";

const Hero = () => {
  const firstText = useRef(null);
  const secondText = useRef(null);
  const slider = useRef(null);
  let xPercent = 0;
  let direction = -1;

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to(slider.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        scrub: 0.25,
        start: 0,
        end: window.innerHeight,
        onUpdate: (e) => (direction = e.direction * -1),
      },
      x: "-500px",
    });
    requestAnimationFrame(animate);
  }, []);

  const animate = () => {
    if (xPercent < -100) {
      xPercent = 0;
    } else if (xPercent > 0) {
      xPercent = -100;
    }
    gsap.set(firstText.current, { xPercent: xPercent });
    gsap.set(secondText.current, { xPercent: xPercent });
    requestAnimationFrame(animate);
    xPercent += 0.1 * direction;
  };

  return (
    <HeroContainer variants={slideUp} initial="initial" animate="enter">
      <SliderContainer>
        <Slider>
          <SliderText ref={firstText}>Stanislav Yuzva -</SliderText>
          <SliderText ref={secondText}>Stanislav Yuzva -</SliderText>
        </Slider>
      </SliderContainer>
    </HeroContainer>
  );
};

export default Hero;