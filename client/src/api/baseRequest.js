import axios from "axios";
import Cookies from "js-cookie";

const adminBaseRequest = axios.create({ baseURL: process.env.REACT_APP_BACKEND_API });
const userBaseRequest = axios.create({ baseURL: process.env.NEXT_PUBLIC_SERVER_URL });

adminBaseRequest.interceptors.request.use(async (req) => {
  const token = Cookies.get("adminToken");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

userBaseRequest.interceptors.request.use(async (req) => {
  const token = Cookies.get("userToken");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export { adminBaseRequest, userBaseRequest };
