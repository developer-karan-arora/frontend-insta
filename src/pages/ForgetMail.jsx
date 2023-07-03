import React from "react";
import { styled } from "styled-components";

function ForgetMail() {
  return (
    <StyledPage className="center">
      <div className="form ">
        <h2>Forget Password</h2>
        <input type="text" />
        <div>
          <button>Send Mail</button>
        </div>
      </div>
    </StyledPage>
  );
}
let StyledPage = styled.div`
  min-height: 100vh;
  text-align: center;
  .form {
    /* height: 350px; */
    padding: 60px 20px;
    width: 350px;
    border: 1px solid lightgrey;
    border-radius: 3px;
  }
  button {
    width: 100%;
    border: none;
    outline: none;
    padding: 8px 0;
    color: white;
    font-family: monospace;
    font-size: 14px;
    background-color: #0095f6;
  }
  input {
    width: 100%;
    height: 24px;
    padding: 0 10px;
    outline: none;
    margin: 10px 0;
    border: 1px solid lightgrey;
  }
`;
export default ForgetMail;
