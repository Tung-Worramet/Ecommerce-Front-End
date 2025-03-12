import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const LoadingToRedirect = () => {
  const [count, setCount] = useState(5); // countdown 5 วิ แล้ว redirect
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      // setInterval จะทำงานทุกๆ 1 วิ มาจาก 1000ms
      setCount((currentCount) => {
        if (currentCount === 1) {
          clearInterval(interval); // หยุดการจับเวลา
          setRedirect(true); // setRedirect เป็น true
        }
        return currentCount - 1;
      });
    }, 1000);

    return () => clearInterval(interval); // เคลียข้อมูลทุกอย่างก่อนจะทำงานรอบใหม่
  }, []); // ที่ใส่ [] เพื่อป้องกัน infinity loop

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return <div>No Permission Redirect in {count}</div>;
};

export default LoadingToRedirect;
