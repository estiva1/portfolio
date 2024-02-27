import styled from "styled-components";

export const StyledLayout = styled.div`
  //background-color: #000;
  //color: #000;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const GradientCanvas = styled.canvas`
  display: flex;
  position: fixed;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  --gradient-color-1: #21979A; //blue
  --gradient-color-2: #8A119C; //violet
  --gradient-color-3: #90e0ff; //electric red
  --gradient-color-4: #ffcb57; //orange peel
`;
