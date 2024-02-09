import styled from "styled-components";

export const StyledHeader = styled.header`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0px;
  left: 0;
  right: 0;
  width: 100%;
  margin: 0 auto;
  backdrop-filter: blur(5px);
  /* background-image: radial-gradient(rgba(0, 0, 0, 0) 1px, #fff 1px);
  background-size: 4px 4px;
  backdrop-filter: blur(3px); */
  z-index: 5;
`;

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 50px;
  background-color: #ffffffbf; //bf === 75% of transparency
`;
