import React from "react";
import { Equator, GlobeContainer, Latitude, Longtitude, SpinningGlobe, SpinningGlobeBox } from "./globe.styles";

const Globe = () => {
  return (
    <GlobeContainer>
      <SpinningGlobe>
        <SpinningGlobeBox>
          <Longtitude />
          <Longtitude />
          <Longtitude />
          <Latitude />
          <Equator />
        </SpinningGlobeBox>
      </SpinningGlobe>
    </GlobeContainer>
  );
};

export default Globe;
