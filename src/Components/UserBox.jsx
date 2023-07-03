import React from "react";
import { styled } from "styled-components";
import { Link } from "react-router-dom";
function UserBox({userData}) {
  let xyzRandomImage = "https://www.freepik.com/free-photos-vectors/user-icon"
  return (
    <StyledComponent>
      <div className="user-box">
        <div className="section-image">
          <img src={(userData.pic)?userData.pic:xyzRandomImage} alt="" />
        </div>
        <div className="section-user">
          <p>{userData.name}</p>
          <p className="light">{userData.email}</p>
        </div>
        <div className="section-follow center">
          <Link to={`/home/profile?email=${userData.email}&id=${userData._id}`}><button>Visit</button></Link>
        </div>
      </div>
    </StyledComponent>
  );
}
let StyledComponent = styled.div`
  .user-box {
    display: flex;
    height: 60px;
    padding: 10px 30px;
    border-bottom: 1px solid lightgray;
    .section-image {
      padding-right: 10px;
      width: 50px;
      img {
        height: 40px;
        max-width: 50px;
      }
    }
    .section-user {
      flex: 1;
      max-width: 220px;
      overflow: hidden;
      .light {
        color: grey;
      }
    }
  }
  .user-box:hover {
    background-color: lightgrey;
    border-radius: 2px;
  }
  button {
    padding: 7px 30px;
    border-radius: 0;
    border: none;
  }
`;
export default UserBox;
