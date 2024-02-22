import styled from "styled-components";

export const GlobeContainer = styled.div`
  position: absolute;
  right: 0.9rem;
  left: auto;
  top: 0.9rem;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: transparent;
  transform: translate(0%, 0%);
  z-index: 500;
`;

export const SpinningGlobe = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  border-radius: 50%;
  overflow: hidden;
  will-change: transfornm;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
`;

export const SpinningGlobeBox = styled.div`
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  position: absolute;
  display: block;
  border-radius: 50%;
  transform: translate(-50%, -50%) rotate(30deg);
  animation: globe 5.4s cubic-bezier(0.35, 0, 0.65, 1) infinite;
  overflow: hidden;
  box-shadow: inset 0px 0px 0px 0.125rem #fff;

  :nth-child(1) {
    animation-delay: 1.8s;
  }
  :nth-child(2) {
    animation-delay: 0.9s;
  }

  @keyframes globe {
    0% {
      transform: translate(-50%, -50%) rotate(15deg);
    }
    50% {
      transform: translate(-50%, -50%) rotate(-15deg);
    }
    100% {
      transform: translate(-50%, -50%) rotate(15deg);
    }
  }
`;

export const Longtitude = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  box-shadow: inset 0.075rem 0px 0px 0.0625rem #fff;
  animation: longtitude 2.7s linear infinite;

  @keyframes longtitude {
    0% {
      border-radius: 50%;
      box-shadow: inset 0.075rem 0px 0px 0.1rem #fff;
      width: 100%;
    }
    49.9% {
      border-radius: 50%;
      box-shadow: inset 0.075rem 0px 0px 0.1rem #fff;
      background: transparent;
    }
    50% {
      border-radius: 0%;
      width: 0.125em;
      background: #fff;
    }
    50.1% {
      border-radius: 50%;
      box-shadow: inset -0.075em 0px 0px 0.1rem #fff;
      background: transparent;
    }
    100% {
      border-radius: 50%;
      box-shadow: inset -0.075rem 0px 0px 0.1rem #fff;
      width: 100%;
    }
  }
`;

export const Latitude = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 150%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  height: 55%;
  box-shadow: inset 0px 0px 0px 0.15rem #fff;
`;

export const Equator = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 150%;
  transform: translate(-50%, -50%);
  border-radius: 0%;
  height: 0.15rem;
  background: #fff;
`;
