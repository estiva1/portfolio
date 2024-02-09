import React from "react";
import ProgressBar from "../progress-bar/progress-bar.component";

import { HeaderContainer, StyledHeader } from "./header.styles";

const Header = () => {
  return (
    <StyledHeader>
      <ProgressBar />
      <HeaderContainer></HeaderContainer>
    </StyledHeader>
  );
};

export default Header;
