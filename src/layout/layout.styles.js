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
  --gradient-color-1: #93a5cf;
  --gradient-color-2: #ffecd2;
  --gradient-color-3: #008888;
  --gradient-color-4: #4e65ff;
`;

// palette 1:
// --gradient-color-1: #eaa5fc;
// --gradient-color-2: #033E9F;
// --gradient-color-3: #90e0ff;
// --gradient-color-4: #F80B6C;

// palette 2:
// --gradient-color-1: #93A5CF;
// --gradient-color-2: #E4EfE9;
// --gradient-color-3: #BFF098;
// --gradient-color-4: #6FD6FF;
