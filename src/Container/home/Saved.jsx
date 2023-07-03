import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import RequireLogin from "../RequireLogin";
import axios from "axios";
import url from "../../apis/url";
import Post from "../../Components/Post";
import { styled } from "styled-components";

function Saved() {
  let globalAuth = useSelector((store) => store.globalAuth);
  if (!globalAuth) return <RequireLogin />;

  //
  let myId = localStorage.getItem("userId");
  let mail = localStorage.getItem("user");
  let [savedPost, setSavedPost] = useState([]);
  useEffect(() => {
    axios.get(url.savedPosts + `/${myId}`).then((res) => {
      let data = res.data;
      console.log(data);
      setSavedPost(data);
    });
  }, []);

  let [user, setUser] = useState({ followers: [], following: [] });
  let finalUrl = url.profile + mail;
  // console.log(finalUrl);
  useEffect(() => {
    axios
      .get(finalUrl)
      .then((res) => {
        console.log("res.data user  ", res.data);
        setUser(res.data);
      })
      .catch((error) => {
        alert("Unable to get Your Details");
      });
  }, []);
  return (
    <StyledContainer>
      <h2>Saved Post</h2>
      <br />
      <hr />
      <br />
      <div className="content-photo">
        {savedPost.map((data, index) => {
          return (
            <Post key={index} data={data} userDetails={user} del={false} />
          );
        })}
      </div>
    </StyledContainer>
  );
}
let StyledContainer = styled.div`
  height: 100dvh;
  flex: 1;
  overflow-y: scroll;
  .content-photo {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
`;
export default Saved;
