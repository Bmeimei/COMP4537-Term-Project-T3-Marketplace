import axios from "axios";
import Cookies from "js-cookie";

const baseRequest = axios.create({ baseURL: process.env.REACT_APP_BACKEND_API });

baseRequest.interceptors.request.use(async (req) => {
  const token = Cookies.get("adminToken");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default baseRequest;
