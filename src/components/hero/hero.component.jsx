import gsap from "gsap";
import React from "react";
import { ScrollTrigger } from "gsap/all";
import { useRef, useLayoutEffect } from "react";

import { slideUp } from "./hero.anim";
import { HeroContainer, HeroGlassBox, Slider, SliderContainer, SliderText, Spacer } from "./hero.styles";
import Globe from "../globe/globe.component";
import Navigation from "../navigation/navigation.component";

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
      <Globe />
      {/* <SliderContainer>
        <Slider ref={slider}>
          <SliderText ref={firstText}>
            Stanislav Yuzva<Spacer>—</Spacer>
          </SliderText>
          <SliderText ref={secondText}>
            Stanislav Yuzva<Spacer>—</Spacer>
          </SliderText>
        </Slider>
      </SliderContainer> */}
      <Navigation />
      {/* <HeroGlassBox /> */}
      {/* <h3 style={{ maxWidth: "100px", color: "#fff" }}>
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
      </h3> */}
    </HeroContainer>
  );
};

export default Hero;
