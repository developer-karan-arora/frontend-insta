import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import axios from "axios";
import url from "../../apis/url";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import RequireLogin from "../RequireLogin";


function Setting() {
  let globalAuth = useSelector((store) => store.globalAuth);
  if (!globalAuth) return <RequireLogin />;


  let navigate = useNavigate();
  let [newName, setNewName] = useState("");
  let [newAbout, setNewAbout] = useState("");
  let [newImage, setNewImage] = useState("");
  // get user
  let [user, setUser] = useState({
    followers: [],
    following: [],
    name: "",
    email: "",
  });
  let userEmail = localStorage.getItem("user");
  let finalUrl = url.myProfile + userEmail;
  useEffect(() => {
    axios
      .get(finalUrl)
      .then((res) => {
        console.log(res.data);
        setUser(res.data);
        setNewAbout(res.data.description)
        setNewName(res.data.name)
        setNewImage(res.data.pic)
      })
      .catch((error) => {
        alert("Unable to get Your Details");
      });
  }, []);

  // handle form

  function handleUpdateProfile() {
    if (!newName || !newAbout || !newImage) return alert("Fill details");
    console.log("handle upload 1 - started");
    let formData = new FormData();
    formData.append("file", newImage);
    console.log("handle upload 1 - imgage", newImage);
    formData.append("upload_preset", "insta-clone");
    formData.append("cloud_name", "krnblog05-insta");
    console.log("handle upload 2 - form data collected", formData);
    axios
      .post(url.cloudinaryImageUpload, formData)
      .then((res) => {
        console.log("Cloudinary upload 3 - started", res);
        let data = res.data;
        let ImageUrl = data.url;
        return { image: ImageUrl };
      })
      .then((data) => {
        let { image } = data;
        console.log("Cloudinary upload 3 - started", data);
        console.log("image uploaded", image);
        let body = {};
        body.newAbout = newAbout;
        body.newImage = image;
        body.newName = newName;
        body.userId = localStorage.getItem("userId");
        axios
          .put(url.userUpdate,  body )
          .then((res) => {
            let data = res.data;
            console.log(data);
            if(data.status=="success"){
              alert(data.msg)
              setUser(data.updatedUser);
              return; 
            }else{
              return alert(data.msg)
            }
          })
          .catch((error) => {
            alert(error.msg);
          });
        setNewImage("");
        setFile("");
        // setFile();
      });
  }

  // handle Image preview
  let [file, setFile] = useState();
  function handleUpload(e) {
    setNewImage(e.target.files[0]);
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  }
  return (
    <StyledContainer>
      <button onClick={handleUpdateProfile}>Upload</button>
      <h2>Change profile</h2>
      <div>
        <br />
        <hr />
        <div className="field-image flex">
          <div className="flex-comp center">
            <div>
              <p>
                <b>Old Image</b>{" "}
              </p>
              <img src={user.pic} alt="not a valid image" />
            </div>
          </div>
          <hr />
          <div className="flex-comp center">
            <div>
              <p>
                <b>New Image</b>
              </p>
              <input
                type="file"
                placeholder="Your name"
                accept="image/*"
                onChange={handleUpload}
              />
              <br />
              <img src={file} alt="" />
            </div>
          </div>
        </div>
        <hr />
        <br />
        <div className="field-name">
          <p>
            <b>Old Name:</b> {user.name}
          </p>
          <span>New Name</span>
          <input
            type="text"
            placeholder="Your name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
        </div>
        <br />
        <div className="field-about">
          <p>
            <b>Old About:</b> {user.description || "🧧 Your About is Empty "}{" "}
          </p>
          <div className="about-new">
            <span>New About</span>
            <input
              type="text"
              placeholder="Your about"
              value={newAbout}
              onChange={(e) => setNewAbout(e.target.value)}
            />
          </div>
        </div>
        <br />
      </div>
    </StyledContainer>
  );
}
let StyledContainer = styled.div`
  flex: 1;
  height: 100dvh;
  padding: 40px;
  overflow-y: scroll;
  .flex {
    display: flex;
    text-align: center;
    .flex-comp {
      flex: 1;
    }
  }
  input {
    width: 100%;
    border: none;
    outline: none;
    border: 1px solid lightgray;
    padding: 10px;
    margin: 5px 0;
  }
`;
export default Setting;
