import React, { useState } from "react";
import "./ForgotReset.css";
import * as yup from "yup";
import { useFormik } from "formik";
import { SetOtp, otpVerify } from "../container/routes";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

//Validation Schema
let fieldValidationSchema = yup.object({
  email: yup.string().required("Please Enter your Email"),
  password: yup.string().required("Please Enter a Valid Password"),
  confirmPassword: yup.string().required("Please Confirm Your Password"),
});

const ForgotReset = () => {
  let [value, setValue] = useState(false);
  let [otp, setOtp] = useState("");
  return (
    <div className="container-fluid reset-container">
      <div className="row reset-main">
      <div className="col reset-column">
        {value === false ? (
          <Email value={value} setValue={setValue} otp={otp} setOtp={setOtp} />
        ) : (
          <NewPassword otp={otp}/>
        )}
      </div>
    </div>
    </div>
  );
};

//Component for Send OTP
const Email = ({ value, setValue,otp,setOtp }) => {
  let [encrypt, setEncrypt] = useState("");
  
  let [emailId, setEmailId] = useState("");

  //Handle Fetch Data
  async function fetchData() {
    let msg = await SetOtp({ email: emailId });
    if (msg) {
      setEncrypt(msg);
    }
  }
  //Handle Check OTP
  function checkOtp() {
    if (otp === encrypt) {
      setValue(true);
    } else {
      alert("Invalid OTP");
    }
  }
  return (
    <div className="reset-box">
      <form className="reset-form">
        <h1>Enter your Email</h1>
        <div className="otp-confirmation">
          <TextField
            name="email"
            type="email"
            label="Email"
            placeholder="Enter your email"
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
          />
          <br />
          <Button variant="contained" onClick={fetchData}>
            Send OTP
          </Button>
        </div>
        <h1>Enter Otp</h1>
        <div className="otp-confirmation">
          <TextField
            name="otp"
            type="otp"
            label="OTP"
            placeholder="Enter the otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <br />
          <Button
            variant="contained"
            className="confirm-btn"
            onClick={checkOtp}
          >
            Confirm
          </Button>
        </div>
      </form>
    </div>
  );
};

// Component for Create New Password
const NewPassword = ({otp}) => {
    let navigate = useNavigate();
    let { handleChange, values, errors, handleSubmit } = useFormik({
      initialValues: {
        email: "",
        password: "",
        confirmPassword: "",
      },
      validationSchema: fieldValidationSchema,
      onSubmit: () => {
        handleResetPassword();
      },
    });
  
    //Handle Reset Password
    async function handleResetPassword() {
      if (values.password === values.confirmPassword) {
        let obj = {
          email: values.email,
          password: values.password,
          otp,
        };
  
        await otpVerify({data: obj});
        navigate("/login");
      } else {
        alert("Ensure both passwords are correct");
      }
    }
    return (
      <div className="reset-box">
        <form className="reset-form" onSubmit={handleSubmit}>
          <h1>Enter your Email</h1>
          <TextField
            name="email"
            type="email"
            label="Email"
            placeholder="Enter your email"
            value={values.email}
            onChange={handleChange}
          />
          {errors.email && <p style={{ color: "crimson" }}>{errors.email}</p>}
          <br />
          <TextField
            name="password"
            type="password"
            label="Password"
            placeholder="Enter New Password"
            value={values.password}
            onChange={handleChange}
          />
          {errors.password && (
            <p style={{ color: "crimson" }}>{errors.password}</p>
          )}
          <br />
          <TextField
            name="confirmPassword"
            type="password"
            label="Confirm Password"
            placeholder="Confirm your password"
            value={values.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && (
            <p style={{ color: "crimson" }}>{errors.confirmPassword}</p>
          )}
          <br />
          <div>
            <Button variant="contained" className="confirm-btn" type="submit">
              Reset
            </Button>
          </div>
        </form>
      </div>
    );
  };

export default ForgotReset;
