import React from "react";
import { styled } from "styled-components";

function Input(props) {
  return (
    <StyledComponent className="from-field">
      <input
        type={props.type}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
        
      />
    </StyledComponent>
  );
}
let StyledComponent = styled.div`

  input {
    width: 100%;
    border: none;
    outline: none;
    border: 1px solid lightgray;
    padding: 10px;
    margin: 5px 0;
  }
`;
export default Input;
