import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import UserBox from "../Components/UserBox";
import axios from "axios"
import url from "../apis/url"

function SidebarHome() {
  let [allUser , setAllUser] = useState([{}])
  useEffect(()=>{
    axios.get(url.alluser).then(res=>{
      let data = res.data;
      setAllUser(data);
      console.log("All user data",data)
    })    
  },[])
  return (
    <StyledContainer>
      <div className="sidebar-section">
        <p className="section-heading">All User of Minstagram</p>
        {allUser.map((e,i)=>{
          return (<UserBox key={i} userData={e}/>)
        })}
        </div>
    </StyledContainer>
  );
}
let StyledContainer = styled.div`
  min-width: 400px;
  width: fit-content;
  height: 100dvh;
  display: flex;
  flex-direction: column;
  overflow-x: scroll;
  border-left: 1px solid lightgrey;
  .section-heading {
    padding: 10px;
    padding-left: 30px;
    border-bottom: 1px solid lightgrey;
    position: sticky;
    top: 0;
    background-color: white;
  }
  .sidebar-section {
    flex: 1;
    overflow-y: scroll;
    padding: 0px 0px;
  }
`;
export default SidebarHome;
