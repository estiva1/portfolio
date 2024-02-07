import styled from "styled-components";

export const Canvas = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  right: 0;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 50%;
    height: 100vw;
    width: 200vw;
    // background: radial-gradient(#ff98a2, rgba(255, 152, 162, 0) 70%);
    // background: linear-gradient(to top, var(--pink), var(--pink-transparent));
    transform: translateX(-50%) translateY(50vh);
    opacity: 0.5;
  }
`;