import React, { useState } from "react";
import "./Login.css";
import * as yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { login } from "../container/routes";
import { Button, TextField } from "@mui/material";

//Validation Schema
let fieldValidationSchema = yup.object({
  email: yup.string().required("Please Enter your Email"),
  password: yup.string().required("Please Enter a Valid Password"),
});

const Login = () => {
  let navigate = useNavigate();
  let [loading, setLoading] = useState(false);
  let { handleSubmit, handleChange, values, errors } = useFormik({
    initialValues: {
      password: "",
      email: "",
    },
    validationSchema: fieldValidationSchema,
    onSubmit: (user) => {
      handleLogin(user);
    },
  });
  async function handleLogin(user) {
    setLoading(true);
    let token = await login({ data: user });
    if (token) {
      localStorage.setItem("token", token);
      alert("Login Successfully")
      navigate("/");
      setLoading(false);
    }
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>LogIn</h1>
        <br />
        <form onSubmit={handleSubmit} className="login-form">
          <TextField
            name="email"
            type="email"
            label="Email"
            placeholder="Enter your email"
            value={values.email}
            onChange={handleChange}
          />
          {errors.email ? (
            <div style={{ color: "crimson" }}>{errors.email}</div>
          ) : (
            ""
          )}
          <br />
          <TextField
            name="password"
            type="password"
            label="Password"
            placeholder="Enter your Password"
            value={values.password}
            onChange={handleChange}
          />
          {errors.password ? (
            <div style={{ color: "crimson" }}>{errors.password}</div>
          ) : (
            ""
          )}
          <br />
          <div>
            <p className="log-btn">
              <a
                href="/reset-password"
                style={{ marginLeft: "65%", color: "blue" }}
              >
                Forgot Password ?
              </a>
            </p>
          </div>
          <br />
          <div className="submit-btn">
            {loading ? (
              <Button variant="contained" type="submit">
                Logging In...
              </Button>
            ) : (
              <Button variant="contained" type="submit">
                LogIn
              </Button>
            )}
          </div>
        </form>
        <br />
        <div>
          <p className="log-btn">
            Don't haven account ?{" "}
            <a href="/signup" style={{ color: "blue" }}>
              Register !
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
