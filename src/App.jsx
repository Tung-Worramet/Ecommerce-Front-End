/* eslint-disable no-unused-vars */
// rafce
import React from "react";
import AppRoutes from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  // javascript

  // return ได้แค่ 1 Element <div></div> = 1 element
  return (
    <>
      <ToastContainer />
      <AppRoutes />
    </>
  );
};

export default App;
