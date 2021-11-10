import axios from "axios";

export const loginRequest = async (username, password) => {
  return await axios.post("http://localhost:5050/admin/login", {
    username,
    password
  });
};
