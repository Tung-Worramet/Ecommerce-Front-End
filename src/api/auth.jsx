import axios from "axios";

export const currentUser = async (token) =>
  await axios.post(
    "https://ecommerce-back-end-ten.vercel.app/api/current-user",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

//   แบบมีปีกกา ต้องมี return
export const currentAdmin = async (token) => {
  return await axios.post(
    "https://ecommerce-back-end-ten.vercel.app/api/current-admin",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
