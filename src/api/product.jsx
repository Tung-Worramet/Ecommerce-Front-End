import axios from "axios";
import { API_URL } from "../utils/config";

export const createProduct = async (token, form) => {
  return await axios.post(`${API_URL}/api/product`, form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const listProduct = async (count = 20) => {
  return await axios.get(`${API_URL}/api/products/` + count);
};

export const readProduct = async (token, id) => {
  return await axios.get(`${API_URL}/api/product/` + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateProduct = async (token, id, form) => {
  return await axios.put(`${API_URL}/api/product/` + id, form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteProduct = async (token, id) => {
  return await axios.delete(`${API_URL}/api/product/` + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const uploadFiles = async (token, form) => {
  return await axios.post(
    `${API_URL}/api/images`,
    {
      image: form,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const removeFiles = async (token, public_id) => {
  return await axios.post(
    `${API_URL}/api/removeimages`,
    {
      public_id,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const searchFilters = async (arg) => {
  return await axios.post(`${API_URL}/api/search/filters`, arg);
};

export const listProductBy = async (sort, order, limit) => {
  return await axios.post(`${API_URL}/api/productby`, {
    sort,
    order,
    limit,
  });
};
