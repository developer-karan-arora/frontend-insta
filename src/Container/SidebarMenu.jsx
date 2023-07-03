import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import { useSelector } from "react-redux";
import RequireLogin from "./RequireLogin";
function SidebarMenu({closeSideBar}) {
  let globalAuth = useSelector((store) => store.globalAuth);

  let mail = localStorage.getItem("user");
  let userId = localStorage.getItem("userId");
  if (!mail || !userId) {
    mail = "";
    userId = "";
  }
  return (
    <StyledComponent >
      <div >
      <div className="btn-section">
        <button className="close-sidebar side-btn" onClick={closeSideBar}>
          close
        </button>
      </div>
      <div className="logo-section">
        <img src="/mylogo.png" alt="" height="50px" />
      </div>
      <div className="links-section">
        <ul>
          <Link to="/home/">
            <li>🏠 Home</li>
          </Link>
          <Link to="/home/search">
            <li>🔎 Serch</li>
          </Link>
          {/* <Link to="/home/reels">
            <li>📷 Reels</li>
          </Link> */}
          <Link to="/home/explore">
            <li>💎 Explore</li>
          </Link>
          <br />
          <br />
          <Link to="/home/create">
            <li>🎁 Create</li>
          </Link>
          <Link to="/home/myposts">
            <li>🎫 My Posts</li>
          </Link>
          <Link to="/home/myprofile">
            <li>🎃 MyProfile</li>
          </Link>
          <Link to="/home/messege">
            <li>📨 Messege</li>
          </Link>
          <Link to="/home/saved">
            <li>💾 Saved</li>
          </Link>
          {/* <Link to="/home/liked">
            <li>🤝 Liked</li>
          </Link> */}
          <Link to={`/home/follower?id=${userId}&email=${mail}`}>
            <li>😎 My Follower</li>
          </Link>
          <Link to={`/home/following?id=${userId}&email=${mail}`}>
            <li>😅 My Following</li>
          </Link>
          {/* <Link to="/home/notification">
            <li>Notification</li>
          </Link> */}
        </ul>
        <br />
        <br />
        <ul>
          <Link to="/home/setting">
            <li>🎯 Setting</li>
          </Link>
          {globalAuth && (
            <Link to="/home/logout">
              <li>🧿 Logout</li>
            </Link>
          )}
          {!globalAuth && (
            <Link to="/login">
              <li>🎈 LogIn</li>
            </Link>
          )}
        </ul>
      </div>
      </div>
    </StyledComponent>
  );
}

let StyledComponent = styled.div`
  min-width: 250px;
  width: 250px;
  height: 100dvh;
  border-right: 1px solid lightgrey;
  display: flex;
  flex-direction: column;
  text-align: center;
  overflow-y: scroll;
  position: relative;
  display: block;
  .logo-section {
    border-bottom: 1px solid lightgrey;
    padding: 20px 40px;
  }
  .links-section {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 50px 0;
    text-align: left;
    li {
      list-style-type: none;
      padding-left: 40px;
      transition-duration: 0.4s;
    }
    li:hover {
      border-left: 10px solid grey;
      background-color: lightgray;
    }
  }
  @media screen and (max-width: 650px) {
    position: absolute;
    background-color: white;
    z-index: 1;
    min-width: 45px;
    /* display: none; */
  }
`;
export default SidebarMenu;
