import axios from "axios";

export const addCategory = async (category) => {
  return axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/${category}`);
};

export const getAllCategory = async () => {
  return axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/category`);
};

export const getItemsGroupedByCategories = async () => {
  return axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/category?groupItems=true`)
};