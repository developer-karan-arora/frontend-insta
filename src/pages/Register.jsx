import { styled } from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import RegisterSchema from "../schema/RegisterSchema";
import axios from "axios";
import url from "../apis/url";
function Register() {
  // Initial Value
  let navigate = useNavigate();
  const initialValue = {};
  initialValue.name = "";
  initialValue.email = "";
  initialValue.password = "";
  initialValue.confirm_password = "";

  // Form Handeling
  const Formik = useFormik({
    initialValues: initialValue,
    validationSchema: RegisterSchema,
    // Handelling apis
    onSubmit: (value) => {
      axios.post(url.register, value).then((res) => {
        console.log(res);
        console.log(res.data.status);
        if (res.data.status == "success") {
          alert(res.data.msg);
          navigate("/login");
        } else if (res.data.status == "error") {
          alert(res.data.msg);
        } else alert("Operation Failed");
      });
    },
  });

  return (
    <StyledPage className="StyledPage">
      <form onSubmit={Formik.handleSubmit}>
        {/* app Logo */}
        <div className="center">
          <img src="/mylogo.png" height="140px" alt="" />
        </div>
        <h2>MinstaGram</h2>
        <p>
          Existing User? <Link to="/login">Login</Link>
        </p>
        <br />
        {/* form fields */}
        <div className="field-container">
          {/*  */}
          {/* Name */}
          <div className="form-field">
            <input
              type="text"
              name="name"
              placeholder="enter your name"
              value={Formik.values.name}
              onChange={Formik.handleChange}
              onBlur={Formik.handleBlur}
            />
            <p>
              <small>
                {Formik.errors.name && Formik.touched.name ? (
                  Formik.errors.name
                ) : (
                  <>&nbsp;</>
                )}
              </small>
            </p>
          </div>
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
          {/*  */}
          {/* Confirm Password */}
          <div className="form-field">
            <input
              type="password"
              name="confirm_password"
              placeholder="confirm password"
              value={Formik.values.confirm_password}
              onChange={Formik.handleChange}
              onBlur={Formik.handleBlur}
            />
            <p>
              <small>
                {Formik.errors.confirm_password &&
                Formik.touched.confirm_password ? (
                  Formik.errors.confirm_password
                ) : (
                  <>&nbsp;</>
                )}
              </small>
            </p>
          </div>
          {/*  */}
          {/* Submit  */}
          <button type="submit">Register</button>
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
export default Register;
