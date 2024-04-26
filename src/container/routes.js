import axios from "axios";
import assert from "../assert";

let backend_api = assert.backend_url;

//Login
const login = async ({ data }) => {
  try {
    let response = await axios.post(`${backend_api}/auth/login`, data);
    //console.log(response);
    return response.data.token;
  } catch (error) {
    alert("Invalid Credentials");
  }
};
//SignUp
const signUp = async ({ data }) => {
  try {
    let response = await axios.post(`${backend_api}/auth/signup`, data);
    return response.data.token;
  } catch (error) {
    alert("Please try again later");
  }
};
//Set OTP
const SetOtp = async ({ email }) => {
  try {
    let response = await axios.put(`${backend_api}/auth/set-otp`, { email });
    return response.data.otp;
  } catch (error) {
    alert("Invalid Email");
  }
};
//OTP Verification
const otpVerify = async ({ data }) => {
  try {
    let response = await axios.put(`${backend_api}/auth/reset-password`, data);
    //console.log(response);
    return response.data.message;
  } catch (error) {
    alert("Invalid OTP");
  }
};
//Get User
const getUser = async (token) => {
  try {
    //console.log(token);
    let response = await axios.get(`${backend_api}/auth/get-user`, {
      headers: {
        "x-auth": token,
      },
    });
    //console.log(response);
    return response.data.user;
  } catch (error) {
    alert("Invalid Email");
  }
};
export { login, signUp, SetOtp, otpVerify, getUser };