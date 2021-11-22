import axios from "axios";
import { userBaseRequest } from "./baseRequest";

export const loginRequest = async (email, password) => {
  return await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/login`, {
    email,
    password
  });
};

export const signupRequest = async (username, email, password) => {
  return await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/signup`, {
    username,
    email,
    password
  });
};

export const getCurrentUser = () => {
  return userBaseRequest(`${process.env.NEXT_PUBLIC_SERVER_URL}/user`);
};
