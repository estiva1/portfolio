import styled from "styled-components";

export const Container = styled.div`
  position: fixed;
  height: 100vh;
  width: 100%;
  z-index: 9999;
  pointer-events: none;
  overflow: hidden;

  @media (hover: none) {
    display: none;
  }
`;
