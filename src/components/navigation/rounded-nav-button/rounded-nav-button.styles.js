import styled from "styled-components";

export const StyledRoundedNavButton = styled.button`
  all: unset;
  outline: revert;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #1c1d20;
  cursor: pointer;
  overflow: hidden;
`;

export const FillingCircle = styled.div`
  position: absolute;
  width: 100%;
  height: 150%;
  border-radius: 50%;
  background-color: #455ce9;
  top: 100%;
`;
