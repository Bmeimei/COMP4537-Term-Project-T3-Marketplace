import axios from "axios";
import { adminBaseRequest } from "./baseRequest";

export const adminLoginRequest = async (username, password) => {
  return await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/admin/login`, {
    username,
    password
  });
};

export const getEndpoint = () =>
  adminBaseRequest.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/endpoint`);
