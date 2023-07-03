import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import Post from "../Components/Post";
import axios from "axios";
import url from "../apis/url";
function HomeContent() {
  // fetch posts
  let [posts, setPosts] = useState([]);
  useEffect(() => {
    axios.get(url.fetchAllPost).then((res) => {
      let data = res.data;
      console.log(data)
      setPosts(data);
    });
  }, []);

  // fetchuser Details
  let userId = localStorage.getItem("userId"); 
  let [userDetails,setUserDetails] = useState([])
  useEffect(() => {
    axios.post(url.user,{_id:userId}).then((res) => {
      let data = res.data;
      setUserDetails(data);
      console.log(data);
    });
  }, []);
  return (
    <StyledComponents>
      {posts.map((data,index) => {
        return <Post key={index} data={data} userDetails={userDetails}/>;
      })}
    </StyledComponents>
  );
}
let StyledComponents = styled.div`
  height: 100dvh;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
  padding: 10px 40px;
`;
export default HomeContent;
