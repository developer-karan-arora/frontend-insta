import React from "react";
import { styled } from "styled-components";

function Story() {
  return (
    <StyledComponent>
      <img src="/mylogo.png" alt="" />
    </StyledComponent>
  );
}
let StyledComponent = styled.div`
  border: 1px solid grey;
  border-radius: 50%;
  overflow: hidden;
  min-width: 60px;
  max-height: 60px;
  img {
    width: 60px;
    height: 60px;
  }
`;
export default Story;
