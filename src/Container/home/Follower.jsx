import axios from "axios";
import React, { useEffect, useState } from "react";
import url from "../../apis/url";
import { Link, useSearchParams } from "react-router-dom";
import { styled } from "styled-components";

function Follower() {
  let pageurl = window.location;
  let params = new URLSearchParams(pageurl.search.slice(1));
  let mail = params.get("email");
  let userId = params.get("id");

  let [follower, setFollower] = useState([]);
  useEffect(() => {
    axios.get(url.getFollower + `/${userId}`).then((res) => {
      let data = res.data;
      setFollower(data);
      console.log(data);
    });
  }, []);
  return (
    <StyledContainer>
      <h2>Follower List Of</h2>
      <p>
        {userId}
        <br />
        <b>- {mail} -</b> is followed by these Accounts
      </p>
      <br />
      <hr />
      <br />
      <div className="list-container">
        {follower && follower.map((e, i) => {
          return (
            <Link to={`/home/profile?email=${e.email}&id=${e._id}`} key={i} className="list-item">
              <div className="image-container center">
                <img src={e.pic} alt="" />
              </div>
              <div className="user-container">
                <p>
                 <b> Name : </b>{e.name}
                </p>
                <p><b>Email : </b>{e.email}</p>
              </div>
            </Link>
          );
        })}
        {
          !follower && <div>
            <p>Guest - have no foollower and following</p>
          </div>
        }
      </div>
    </StyledContainer>
  );
}
let StyledContainer = styled.div`
  flex: 1;
  padding: 40px;
  .list-container {
    display: flex;
    flex-direction: column;
    .list-item {
      display: flex;
      align-items: center;
      border: 1px solid lightgray;
      margin: 2px;
      padding: 4px;
      .user-container {
        padding: 0 20px;
      }
      .image-container {
        min-width: 100px;
        img {
          height: 70px;
          border-radius: 50%;
        }
      }
    }
  }
`;
export default Follower;
