import axios from "axios";
import { API_URL } from "../utils/config";

export const createUserCart = async (token, cart) => {
  return await axios.post(`${API_URL}/api/user/cart`, cart, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const listUserCart = async (token) => {
  return await axios.get(`${API_URL}/api/user/cart`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const saveAddress = async (token, address) => {
  return await axios.post(
    `${API_URL}/api/user/address`,
    { address },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const saveOrder = async (token, payload) => {
  return await axios.post(`${API_URL}/api/user/order`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getOrders = async (token) => {
  return await axios.get(`${API_URL}/api/user/order`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
