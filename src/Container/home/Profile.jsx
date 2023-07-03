import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import axios from "axios";
import url from "../../apis/url";
import Post from "../../Components/Post";
import { Link, useNavigate } from "react-router-dom";
function Profile() {
  let pageurl = window.location;
  let params = new URLSearchParams(pageurl.search.slice(1));
  let mail = params.get("email");
  let userId = params.get("id");
  let navigate = useNavigate();

  let [user, setUser] = useState({ followers: [], following: [] });
  let finalUrl = url.profile + mail;
  // console.log(finalUrl);
  useEffect(() => {
    axios
      .get(finalUrl)
      .then((res) => {
        console.log("res.data user  ");
        setUser(res.data);
      })
      .catch((error) => {
        alert("Unable to get Your Details");
      });
  }, []);

  //   posts
  let [mypost, setMypost] = useState([]);
  useEffect(() => {
    axios.post(url.mypost, { postedBy: userId }).then((result) => {
      let data = result.data;
      setMypost(data);
      console.log(data);
    });
  }, []);

  // fetch my followers
  let [isFollowed, setIsFollowed] = useState(false);
  let [myFollowing, setMyFollowing] = useState([]);
  let myId = localStorage.getItem("userId");
  useEffect(() => {
    myId && axios.get(url.getFollowing + `/${myId}`).then((res) => {
      let data = res.data;
      setMyFollowing(data);
      console.log(data);
      data.map((e) => {
        if (e._id == userId) {
          console.log("we found u already followed 🤐🤐");
          setIsFollowed(true);
        }
      });
    });
  }, []);


  // handle follow
  function handleFollow(){
    let body={}
    body.userId = myId
    body.targetUserId=userId
    axios.post(url.follow,body).then((res)=>{
      let data = res.data
      if(data.status=="success"){
        alert(data.msg)
        setIsFollowed(true);
      }else{
        alert(data.msg)
      }
    }).catch(error=>{
      alert(error.msg)
    })
  }
  // handle unfollow
  function handleUnFollow(){
    let body={}
    body.userId = myId
    body.targetUserId=userId
    axios.post(url.unfollow,body).then((res)=>{
      let data = res.data
      if(data.status=="success"){
        alert(data.msg)
        setIsFollowed(false)
      }else{
        alert(data.msg)
      }
    }).catch(error=>{
      alert(error.msg)
    })
  }
  // handleMsgUser
  function handleMsgUser(){
    let userId1 = myId
    let userId2 = user._id;
    let userMail1 = localStorage.getItem("user")
    let userMail2 = user.email
    // let userMail2 ;
    if(userId1 && userId2 && userMail1 && userMail2) {
      console.log("new conv bw",userId1,userId2)
      axios.post(url.chat_addConversation,{userId1, userId2 , userMail1, userMail2}).then(res=>{
        let data = res.data;
        console.log(data)
        alert(data.msg)
        navigate("/home/messege")
      })
        }else{
      alert("plese sign in to msg")
    }
  }
  return (
    <StyledContainer>
      <div className="section-user">
        <div className="user-photo center">
          <img src={user.pic || " "} alt="" />
        </div> 
        <div className="user-info">
          <p className="nam">
            <b>Name : </b>
            {user.name}
          </p>
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
          <div>
            {
              myId && <>{isFollowed ? (
                <button onClick={handleUnFollow}>Followed</button>
              ) : (
                <button onClick={handleFollow}>Follow User</button>
              )}</>
            }
            {
              !myId && <button onClick={()=>{alert("Login to use follow unfollow user")}}>Follow User</button>
            }{
              <button onClick={handleMsgUser}>Messege User</button>
            }
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
                <Post key={index} data={data} userDetails={user} del={false} />
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
    .content-photo {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
`;

export default Profile;
