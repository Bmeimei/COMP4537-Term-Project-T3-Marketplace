import axios from "axios";
import { userBaseRequest } from "./baseRequest";

export const getAllItem = async () => {
  return await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/item`);
};

export const getItemById = async (id) => {
  return await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/item/${id}`);
};

export const deleteItemById = async (id) => {
  return await userBaseRequest.delete(`${process.env.NEXT_PUBLIC_SERVER_URL}/item/${id}`);
};

export const addItem = async (name, price, description, category, image) => {
  return await userBaseRequest.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/item`, {
    name,
    price,
    description,
    category,
    image
  });
};

export const updateItem = async (id, name, price, description, category, image) => {
  return await userBaseRequest.put(`${process.env.NEXT_PUBLIC_SERVER_URL}/item/${id}`, {
    name,
    price,
    description,
    category,
    image
  });
};

export const hideItemById = async (id) => {
  return await userBaseRequest.patch(`${process.env.NEXT_PUBLIC_SERVER_URL}/item/${id}`, {
    isValid: false
  });
};

export const displayItemById = async (id) => {
  return await userBaseRequest.patch(`${process.env.NEXT_PUBLIC_SERVER_URL}/item/${id}`, {
    isValid: true
  });
};
