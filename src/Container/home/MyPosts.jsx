import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import RequireLogin from "../RequireLogin";
import { styled } from "styled-components";
import axios from "axios";
import url from "../../apis/url";
import Post from "../../Components/Post";
function MyPosts() {
  let globalAuth = useSelector((store) => store.globalAuth);
  if (!globalAuth) return <RequireLogin />;

  // fetchuser Details
  let userId = localStorage.getItem("userId");
  let [userDetails, setUserDetails] = useState([]);
  useEffect(() => {
    axios.post(url.user, { _id: userId }).then((res) => {
      let data = res.data;
      setUserDetails(data);
      console.log(data);
    });
  }, []);

  // handle my posts
  let [mypost, setMypost] = useState([]);
  useEffect(() => {
    axios.post(url.mypost, { postedBy: userId }).then((result) => {
      let data = result.data;
      setMypost(data);
      console.log(data);
    });
  }, []);
  if(mypost.length == 0) return(
    <StyledContainer className="container flex">
      <img src="/mylogo.png" alt="" />
      <br />
      <h2>Create Some Posts</h2>
    </StyledContainer>
  )
  return (
    <StyledContainer>
      {mypost.map((data, index) => {
        return <Post key={index} data={data} userDetails={userDetails} del={true}/>;
      })}
    </StyledContainer>
  );
}
let StyledContainer = styled.div`
  height: 100dvh;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
  padding: 10px 40px;
`;
export default MyPosts;
