import React from "react";
import { useSelector } from "react-redux";
import RequireLogin from "../RequireLogin";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import ButtonPink from "../../Components/ButtonPink";

function Logout() {
  let globalAuth = useSelector((store) => store.globalAuth);
  if (!globalAuth) return <RequireLogin />;
  // handle Logout
  let navigate = useNavigate();
  function handleLogout() {
    localStorage.clear();
    alert("You are logged Out");
    navigate("/guest");
    window.location.reload();
  }
  return (
    <StyledContainer className="center">
      <div>
        <img src="/mylogo.png" alt="" />
        <h2>Are You Really willing to logout</h2>
        <ButtonPink text={"Logout"} onClick={handleLogout}></ButtonPink>
      </div>
    </StyledContainer>
  );
}
let StyledContainer = styled.div`
  height: 100dvh;
  flex: 1;
  text-align: center;
`;
export default Logout;
