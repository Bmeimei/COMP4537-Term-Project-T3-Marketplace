import axios from "axios";
import baseRequest from "./baseRequest";

export const loginRequest = async (email, password) => {
    return await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/login`, {
        email,
        password
    });
};

export const getEndpoint = () => baseRequest.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/endpoint`);
