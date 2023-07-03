import { Route, Routes } from "react-router-dom";
import { styled } from "styled-components";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import SidebarMenu from "../Container/SidebarMenu";
import HomeMain from "../Container/HomeMain";
import MyProfile from "../Container/home/MyProfile";
import Create from "../Container/home/Create";
import Search from "../Container/home/Search";
import Messege from "../Container/home/Messege";
import Saved from "../Container/home/Saved";
import Notification from "./Notification";
import Logout from "../Container/home/Logout";
import Setting from "../Container/home/Setting";
import MyPosts from "../Container/home/MyPosts";
import Profile from "../Container/home/Profile";
import Follower from "../Container/home/Follower";
import Following from "../Container/home/Following";
import Explore from "../Container/Explore";

function Home() {
  // let globalAuth = useSelector((store) => store.globalAuth);
  let sideBarRef = useRef();
  // let [sideBarOpen, setSideBarOpen] = useState(true);
  function openSideBar() {
    if (sideBarRef.current) {
      sideBarRef.current.style.display = "block"; // Set the desired minWidth value
    }
  }
  function closeSideBar() {
    if (sideBarRef.current) {
      sideBarRef.current.style.display = "none"; // Set the desired minWidth value
    }
  }
  // sideBarRef.current.style.display = "block"; 
  return (
    <StyledComponents className="StyledComponents myScreen">
      <button className="open-button side-btn" onClick={openSideBar}>
        Open Sidebar
      </button>
      <div ref={sideBarRef} className="sidebar-container">
        <SidebarMenu closeSideBar={closeSideBar} />
      </div>
      <Routes>
        <Route path="" element={<HomeMain />} />
        <Route path="search" element={<Search />} />
        <Route path="myposts" element={<MyPosts />} />
        <Route path="reels" element={<p>reels</p>} />
        <Route path="explore" element={<Explore />} />
        <Route path="create" element={<Create />} />
        <Route path="myprofile" element={<MyProfile />} />
        <Route path="profile/*" element={<Profile />} />
        <Route path="messege" element={<Messege />} />
        <Route path="saved" element={<Saved />} />
        {/* <Route path="liked" element={<Liked />} /> */}
        <Route path="follower/*" element={<Follower />} />
        <Route path="following/*" element={<Following />} />
        <Route path="notification" element={<Notification />} />
        <Route path="setting" element={<Setting />} />
        <Route path="logout" element={<Logout />} />
      </Routes>
    </StyledComponents>
  );
}
let StyledComponents = styled.div`
  display: flex;
  position: relative;
  .open-button {
    position: absolute;
    margin: 10px 30px ;
  }
  .sidebar-container {
    display: block;
  }
  @media screen and (min-width: 650px) {
    .side-btn {
      display: none;
    }
  }
`;
export default Home;
