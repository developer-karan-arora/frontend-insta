import React from "react";
import { styled } from "styled-components";

function ButtonPink(props) {
  return (
    <StyledComponent onClick={props.onClick}>{props.text}</StyledComponent>
  );
}
let StyledComponent = styled.button`
  width: auto;
  padding: 10px 40px;
  /* border: 1px solid lightgray; */
  border: none;
  margin: 20px 0;
  background-color: #ff4993;
  color: white;
`;
export default ButtonPink;
