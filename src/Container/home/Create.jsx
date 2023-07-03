import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { styled } from "styled-components";
import { useSelector } from "react-redux";
import RequireLogin from "../RequireLogin";
import url from "../../apis/url";
import axios from "axios";
function Create() {
  // handlling user Login status
  let globalAuth = useSelector((store) => store.globalAuth);
  if (!globalAuth) return <RequireLogin />;

  // form fields
  let navigate = useNavigate();
  let [isCreating, setIsCreating] = useState(false);
  let [file, setFile] = useState();
  let [title, setTitle] = useState("");
  let [image, setImage] = useState("");
  let [description, setDescription] = useState("");

  // handle Image preview
  function handleUpload(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  }
  // handelling image upload
  function handleSubmit(e) {
    if(!image || !title || !description) {
      return alert("Fill all feilds")
    }
    let data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "insta-clone");
    data.append("cloud_name", "krnblog05-insta");
    axios
      .post(url.cloudinaryImageUpload, data)
      .then((res) => {
        setIsCreating(true);
        let data = res.data;
        let ImageUrl = data.url;
        console.log("url", ImageUrl);
        return { title, body: description, image: ImageUrl };
      })
      .then((data) => {
        let token = localStorage.getItem("jwt");
        let config = {};
        config.headers = {
          Authorization: `Bearer ${token}`,
        };
        console.log(data);
        console.log(token);
        axios.post(url.uploadNewPost, data, config).then((res) => {
          let data = res.data;
          console.log(data);
          if (data.status == "error") {
            setIsCreating(false);
            alert(data.msg);
          } else if (data.status == "success") {
            setIsCreating(false);
            alert(data.msg);
            navigate("/home");
          }
        });
      });
  }
  return (
    <StyledContainer>
      <form>
        {isCreating && (
          <div className="section-creating center">
            <div>
              <h2> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Creating </h2>
              <br />
              <br />
              <img
                src="/mylogo.png"
                alt="LogoImg"
                className="rotateanimation"
              />
            </div>
          </div>
        )}
        <div className="section-head">
          <h2>Create new </h2>
          <div onClick={handleSubmit} className="btn-submit">
            Submit
          </div>
        </div>
        <input
          required
          name="title"
          type="text"
          placeholder="Enter Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          required
          name="description"
          type={"text"}
          placeholder={"Enter Description"}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          required
          type={"file"}
          name="image"
          onChange={(e) => {
            console.log(e.target.files[0]);
            setImage(e.target.files[0]);
            handleUpload(e);
          }}
          // value={image}
          accept="image/*"
        />
        <div className="border">
          <img src={file} alt="" />
        </div>
      </form>
    </StyledContainer>
  );
}
let StyledContainer = styled.div`
  height: 100dvh;
  overflow-y: scroll;
  padding: 20px 40px;
  flex: 1;
  .border {
    border: 1px solid lightgrey;
  }
  input {
    width: 100%;
    border: none;
    outline: none;
    border: 1px solid lightgray;
    padding: 10px;
    margin: 5px 0;
  }
  .section-head {
    display: flex;
    justify-content: space-between;
    padding-bottom: 20px;
  }
  img {
    max-width: 100%;
  }
  form {
    position: relative;
    .section-creating {
      background-color: #49494936;
      position: absolute;
      height: 100dvh;
      width: 100%;
    }
  }
  .btn-submit {
    padding: 10px 40px;
    color: white;
    font-weight: 600;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    background-color: #fd4a92;
    font-size: 15px;
  }
`;
export default Create;
