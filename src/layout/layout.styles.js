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
  --gradient-color-1: #100E79; //blue
  --gradient-color-2: #7B1A5E; //violet
  --gradient-color-3: #E60000; //electric red
  --gradient-color-4: #FF9F00; //orange peel
`;
