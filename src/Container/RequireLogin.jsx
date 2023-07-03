import React from "react";
import { styled } from "styled-components";

function RequireLogin() {
  return (
    <StyledContainer className="center">
      <div>
        <img src="/mylogo.png" alt="" />
        <h2>RequireLogin</h2>
      </div>
    </StyledContainer>
  );
}
let StyledContainer = styled.div`
  height: 100dvh;
  flex: 1;
  text-align: center;
`;
export default RequireLogin;
