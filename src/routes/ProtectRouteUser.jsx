import React, { useEffect, useState } from "react";
import useEcomStore from "../store/ecom-store";
import { currentUser } from "../api/auth";
import LoadingToRedirect from "./LoadingToRedirect";

const ProtectRouteUser = ({ element }) => {
  const [ok, setOk] = useState(false);
  const user = useEcomStore((state) => state.user); // useEcomStore เก็บข้อมูล user ไว้ใน localstorage
  const token = useEcomStore((state) => state.token); // useEcomStore เก็บข้อมูล token ไว้ใน localstorage

  useEffect(() => {
    if (user && token) {
      // send to back
      currentUser(token)
        .then((res) => setOk(true))
        .catch((err) => setOk(false));
    }
  }, []); // ที่ใส่ [] เพื่อป้องกัน infinity loop
  return ok ? element : <LoadingToRedirect />;
};

export default ProtectRouteUser;
