import axios from "axios";
import { API_URL } from "../utils/config";

export const currentUser = async (token) =>
  await axios.post(
    `${API_URL}/api/current-user`,
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
    `${API_URL}/api/current-admin`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
