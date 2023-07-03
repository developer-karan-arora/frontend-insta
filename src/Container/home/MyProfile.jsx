import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
// import Story from "../../Components/Story";
import { useSelector } from "react-redux";
import RequireLogin from "../RequireLogin";
import axios from "axios";
import url from "../../apis/url";
import Post from "../../Components/Post";
import { Link } from "react-router-dom";
function Profile({}) {
  let globalAuth = useSelector((store) => store.globalAuth);
  if (!globalAuth) return <RequireLogin />;

  // get user
  let [user, setUser] = useState({
    followers: [],
    following: [],
    name: "",
    email: "",
  });
  // console.log("user",user)
  let userId = localStorage.getItem("userId");
  let userEmail = localStorage.getItem("user");
  let finalUrl = url.myProfile + userEmail;
  useEffect(() => {
    axios
      .get(finalUrl)
      .then((res) => {
        console.log(res.data);
        setUser(res.data);
      })
      .catch((error) => {
        alert("Unable to get Your Details");
      });
  }, []);

  // posts
  let [mypost, setMypost] = useState([]);
  useEffect(() => {
    axios.post(url.mypost, { postedBy: userId }).then((result) => {
      let data = result.data;
      setMypost(data);
      console.log(data);
    });
  }, []);
  return (
    <StyledContainer>
      <div className="section-user">
        <div className="user-photo center">
          <img src={!(user.pic == null)?user.pic:" "} alt="" />
        </div>
        <div className="user-info">
          <p className="nam"><b>Name : </b>{user.name}</p>
          <p className="email">
            <b>Your Email :</b> {user.email} 
          </p>
          <div className="description">
            <p className="id">
              <b>Your Id :</b> {user._id}
            </p>
            <p className="followers">
              <b>Following :</b> {user.following.length} <Link to={`/home/following?id=${user._id}&email=${user.email}` } className="link-col">(see following)</Link>
            </p>
            <p className="following">
              <b>Followers :</b> {user.followers.length} <Link to={`/home/follower?id=${user._id}&email=${user.email}`} className="link-col">(see follower)</Link>
            </p>
            <b>About You:</b> {user.description || "🔒 Not Shared"}
          </div>
        </div>
      </div>
      <div className="section-gallery">
        <div className="gallery-tabs center">
          <div>Photos</div>
        </div>
        <div className="gallery-content">
          <div className="content-photo">
            {mypost.map((data, index) => {
              return (
                <Post key={index} data={data} userDetails={user} del={true} />
              );
            })}
          </div>
        </div>
      </div>
    </StyledContainer>
  );
}
let StyledContainer = styled.div`
  height: 100dvh;
  flex: 1;
  overflow-y: scroll;
  .section-user {
    display: flex;
    border-bottom: 1px solid lightgrey;
    padding: 20px 50px;
    .user-photo {
      border: 1px solid grey;
      border-radius: 50%;
      overflow: hidden;
      min-width: 180px;
      max-height: 180px;
      img {
        width: 180px;
        height: 180px;
      }
    }
    .user-info {
      padding: 10px 40px;
      .name {
        font-weight: bold;
      }
    }
  }
  .section-stories {
    display: flex;
    gap: 0 4px;
    padding: 10px;
    border-bottom: 1px solid lightgrey;
  }
  .section-gallery {
    .gallery-content {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .gallery-tabs {
      display: flex;
      div {
        text-align: center;
        flex: 1;
        padding: 10px 30px;
        border-bottom: 1px solid lightgrey;
        border-right: 1px solid lightgrey;
      }
      div:hover {
        background-color: lightgray;
        cursor: pointer;
      }
    }
  }
`;
export default Profile;
