import React from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";

function Guest() {
  return (
    /* React Element */
    <StyledPage className="StyledPage center">
      <div className="guest-container">
        <div className="logo-container">
          <img src="/mylogo.png" alt="" />
        </div>
        <div className="center flex-col link-container">
          <h2>MinstaGram</h2>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
          <Link to="/home">Contiue without Login</Link>
        </div>
      </div>
    </StyledPage>
  );
}
/* Styling */
let StyledPage = styled.div`
  .guest-container{
    display:flex;
    gap:20px;
    .logo-container{
      background-color:lightgrey;
      padding: 0 30px;
      border-radius: 3px;
    }
    .link-container{
        a{
          width: 150px;
          background-color: lightgray;
          margin: 2px 0;
          text-align: center;
          border-radius: 4px;
          padding: 5px 13px;
          text-decoration: none;
        }
    }
  }
`;
export default Guest;
