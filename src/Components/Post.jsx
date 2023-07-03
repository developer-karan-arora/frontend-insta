import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
// import { AiFillLike, AiOutlineLike } from "react-icons/Ai";
// import { BsBookmarkCheck, BsBookmarkCheckFill } from "react-icons/Bs";
import axios from "axios";
import url from "../apis/url";
import { Link } from "react-router-dom";
function Post({ data, userDetails, del }) {
  // like and save
  let _id = data._id;
  let userId = localStorage.getItem("userId");
  let [likedArray, setLikdArray] = useState(Array.from(data.likes));

  // is post liked
  let [isLike, setLike] = useState(false);
  let [isSaved, setSaved] = useState(false);
  useEffect(() => {
    if (likedArray.indexOf(userId) > 0) setLike(true);
  }, []);
  useEffect(() => {
    if (userDetails.saved) {
      if (userDetails.saved.indexOf(_id) >= 0) {
        setSaved(true);
        console.log(userDetails.saved.indexOf(_id))
      }
    }
  }, []);

  // handellike
  function handleLike() {
    if (userId == null || userId == undefined) return alert("login to use ");
    if (isLike) {
      // dislike logic
      console.log("disliking");
      axios
        .put(url.dislikePost, {
          userId: userId,
          _id: _id,
        })
        .then((res) => {
          let newdata = res.data;
          console.log(newdata);
          console.log(likedArray);
          setLikdArray(newdata.likes);
          console.log(likedArray);
          setLike(false);
        })
        .catch((error) => {
          alert(error.msg);
        });
      // setLike(false)
    } else {
      // like logic
      axios
        .put(url.likePost, {
          userId: userId,
          _id: _id,
        })
        .then((res) => {
          let newdata = res.data;
          console.log(newdata);
          console.log(likedArray);
          setLikdArray(Array.from(newdata.likes));
          console.log(likedArray);
          setLike(true);
        })
        .catch((error) => {
          alert(error.msg);
        });
    }
  }
  // handle save
  function handleSave() {
    if (userId == null || userId == undefined) return alert("login to use ");
    if (isSaved) {
      axios
        .put(url.unsavePost, {
          userId: userId,
          _id: _id,
        })
        .then((res) => {
          let data = res.data;
          console.log(res);
          setSaved(false);
          alert("post unsaved");
        })
        .catch((error) => {
          alert(error.msg);
        });
    } else {
      axios
        .put(url.savePost, {
          userId: userId,
          _id: _id,
        })
        .then((res) => {
          let data = res.data;
          console.log(res);
          setSaved(true);
          alert("new post saved");
        })
        .catch((error) => {
          alert(error.msg);
        });
    }
  }

  //handle comments
  let [comments, setComments] = useState(data.comments);
  let [text, setText] = useState("");
  function handleComment() {
    console.log("comment Initaiated");
    let body = {};
    body.userId = userId;
    body._id = _id;
    body.text = text;
    axios.put(url.comment, body).then((result) => {
      let data = result.data;
      console.log(data);
      setText("");
      setComments(data.comments);
      alert("posted");
      return;
    });
  }

  // handle delete
  let [show, setShow] = useState(true);
  function handleDelete() {
    console.log("deletng post");
    axios
      .post(url.delete, { _id })
      .then((result) => {
        let data = result.data;
        console.log(data);
        alert(data.msg);
        setShow(false);
      })
      .catch((error) => {
        alert(error.msg);
      });
  }
  // handelling date
  let date = new Date(data.createdAt);
  let year = date.getFullYear();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  date = day + "-" + month + "-" + year;
  if (show == false) return <></>;
  // console.log("data",data)
  return (
    <StyledComponent>
      <div className="p-6 rel">
        {del && (
          <button className="del-btn" onClick={handleDelete}>
            Delete
          </button>
        )}
        <div className="title">
          <b>Title : </b> {data.title}{" "}
        </div>
        <div className="description">
          <b>Desc : </b>
          {data.body}
        </div>
        <div className="name">
          <Link
            to={`/home/profile?email=${data.postedByEmail}&id=${data.postedBy}`}
            className="link-col"
          >
            ({data.postedByEmail})
          </Link>
        </div>
      </div>
      <div className="img">
        <img src={data.image || ""} alt="image not avl" />
      </div>
      <div className="likes flex">
        <span>{likedArray.length} Likes</span>
        <span> {date}</span>{" "}
      </div>
      <div className="tools">
        <span onClick={handleLike}>
          {isLike ? (
            <span>Liked</span>
            // <AiFillLike className="link-col" />
          ) : (
            <span>Like</span>
            // <AiOutlineLike className="link-col" />
          )}
        </span>
        <span onClick={handleSave}>
          {isSaved ? (
            <span>Bookmarked</span>
            // <BsBookmarkCheckFill className="link-col" />
          ) : (
            <span>Bookmark New</span>
            // <BsBookmarkCheck className="link-col" />
          )}
        </span>
      </div>
      <div className="details">
        <div className="comments">
          <ul>
            {comments.map((data, index) => {
              return (
                <li key={index}>
                  <b>
                    {!(data.postedBy == null) ? data.postedBy.name : "Guest"} :
                  </b>
                  {data.text}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="new-comment">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button onClick={handleComment}>Comment</button>
        </div>
      </div>
    </StyledComponent>
  );
}
let StyledComponent = styled.div`
  width: -webkit-fill-available;
  border: 1px solid lightgray;
  margin: 10px 0;
  border-radius: 3px;
  padding: 5px 0 16px 0;
  max-width: 450px;
  button {
    width: 100%;
    color: inherit;
    margin: 0 7px;
    padding: 4px 3px;
  }
  .rel {
    position: relative;
  }
  .del-btn {
    position: absolute;
    right: 0;
    width: fit-content;
    color: inherit;
    margin: 0 7px;
    padding: 4px 3px;
  }
  .new-comment {
    display: flex;
    justify-content: center;
    margin: 4px 0;
    input {
      width: calc(100% - 10px);
      border: 1px solid lightgrey;
      outline: none;
    }
    button {
      max-width: fit-content;
    }
  }
  img {
    width: 100%;
    max-width: 450px;
  }
  .img {
    text-align: center;
    border-bottom: 1px solid lightgrey;
  }
  li {
    list-style-type: none;
  }
  .details {
    padding: 2px 20px 5px 20px;
  }
  .flex {
    display: flex;
    justify-content: space-between;
  }
  .likes {
    padding: 0 20px;
  }
  .tools {
    display: flex;
    border-top: 1px solid lightgrey;
    border-bottom: 1px solid lightgrey;
    text-align: center;
    justify-content: space-between;
    span {
      flex: 1;
      padding-top: 5px;
    }
    span:first-child {
      border-right: 1px solid lightgray;
    }
    span:nth-child(2) {
      border-right: 1px solid lightgray;
    }
  }
`;
export default Post;
