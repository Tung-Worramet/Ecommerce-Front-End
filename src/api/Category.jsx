import axios from "axios";
import { API_URL } from "../utils/config";

export const createCategory = async (token, form) => {
  return await axios.post(`${API_URL}/api/category`, form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const listCategory = async () => {
  return await axios.get(`${API_URL}/api/category`);
};

export const removeCategory = async (token, id) => {
  return await axios.delete(`${API_URL}/api/category/` + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
