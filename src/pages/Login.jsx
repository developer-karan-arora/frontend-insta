import { styled } from "styled-components";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import LoginSchema from "../schema/LoginSchema";
import React, { useEffect } from "react";
import axios from "axios";
import url from "../apis/url";
function Login() {
  // Initial Value
  let navigate = useNavigate();
  const initialValue = {};
  initialValue.email = "";
  initialValue.password = "";

  // is Login
  useEffect(() => {
    let isLogin = false;
    if (localStorage.getItem("isLogin") == "true") isLogin = true;
    if (isLogin) {
      alert("already login");
      navigate("/home");
      window.location.reload();
    } else {
      console.log("not Login yet");
    }
  }, []);

  // Form Handelling
  const Formik = useFormik({
    initialValues: initialValue,
    validationSchema: LoginSchema,
    // handelling APIs
    onSubmit: (value) => {
      console.log(value);
      axios.post(url.login, value).then((res) => {
        let data = res.data;
        console.log(data);
        if (data.status == "error") {
          alert(data.msg);
        } else if (data.status == "success") {
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("user", data.email);
          localStorage.setItem("userId", data.userId);
          localStorage.setItem("isLogin", true);
          alert(data.msg);
          navigate("/home");
          window.location.reload();
        }
      });
    },
  });

  // Page Started
  return (
    <StyledPage className="StyledPage">
      <form onSubmit={Formik.handleSubmit}>
        {/* App Logo */}
        <div className="center">
          <img src="/mylogo.png" height="140px" alt="" />
        </div>
        <h2>MinstaGram</h2>
        <p>
          New User? <Link to="/register">Register</Link>
        </p>
        <br />
        {/* Form Fields */}
        <div className="field-container">
          {/*  */}
          {/* Email */}
          <div className="form-field">
            <input
              type="text"
              name="email"
              placeholder="enter email"
              value={Formik.values.email}
              onChange={Formik.handleChange}
              onBlur={Formik.handleBlur}
            />
            <p>
              <small>
                {Formik.errors.email && Formik.touched.email ? (
                  Formik.errors.email
                ) : (
                  <>&nbsp;</>
                )}
              </small>
            </p>
          </div>
          {/*  */}
          {/* Password */}
          <div className="form-field">
            <input
              type="password"
              name="password"
              placeholder="enter password"
              value={Formik.values.password}
              onChange={Formik.handleChange}
              onBlur={Formik.handleBlur}
            />
            <p>
              <small>
                {Formik.errors.password && Formik.touched.password ? (
                  Formik.errors.password
                ) : (
                  <>&nbsp;</>
                )}
              </small>
            </p>
          </div>
          <button type="submit">LogIn</button>
          
        </div>
      </form>
    </StyledPage>
  );
}
let StyledPage = styled.div`
  padding-top: 100px;
  display: flex;
  justify-content: center;
  form {
    text-align: center;
    height: 350px;
    padding: 5px 20px;
    width: 350px;
    border-radius: 3px;
    border: 1px solid lightgrey;
    .field-container {
      border-radius: 2px;
      padding: 60px 20px;
      background-color: #f5f0f0;
      box-shadow: 2px 2px 4px grey;
    }
    button {
      width: 100%;
      border: none;
      outline: none;
      padding: 8px 0;
      color: white;
      font-family: monospace;
      font-size: 14px;
      background-color: #0095f6;
    }
    .form-field {
      text-align: left;
      margin: 2px 0;
      small {
        font-weight: 500;
        color: #f12a2a;
      }
      input {
        width: 100%;
        height: 24px;
        padding: 0 10px;
        outline: none;
        border: 1px solid lightgrey;
      }
    }
  }
`;
export default Login;
