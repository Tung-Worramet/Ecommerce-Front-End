import axios from "axios";

export const createCategory = async (token, form) => {
  return await axios.post(
    "https://ecommerce-back-end-ten.vercel.app/api/category",
    form,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const listCategory = async () => {
  return await axios.get(
    "https://ecommerce-back-end-ten.vercel.app/api/category"
  );
};

export const removeCategory = async (token, id) => {
  return await axios.delete(
    "https://ecommerce-back-end-ten.vercel.app/api/category/" + id,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
