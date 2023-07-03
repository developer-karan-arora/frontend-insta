import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { styled } from "styled-components";
import "../styles/animation/rotate.css";

function Root() {
  let navigate = useNavigate();
  let globalAuth = useSelector(store=>store.globalAuth)

  // redirection logic 
  useEffect(()=>{
    setTimeout(()=>{console.log(globalAuth);
      (globalAuth)?navigate("/home"):navigate("/guest");},4500)
  },[])
  // 
  // JSX Started
  return (
    <StyledPage className="StyledPage">
      <div>{}</div>
      <div>
        <img src="/mylogo.png" alt="LogoImg" className="rotateanimation" />
      </div>
      <div>from KaranArora</div>
    </StyledPage>
  );
}
/* Styling */
let StyledPage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 100px 0;
`;
export default Root;
