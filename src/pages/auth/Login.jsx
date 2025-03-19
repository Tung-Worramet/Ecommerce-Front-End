import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import useEcomStore from "../../store/ecom-store";
import { useNavigate } from "react-router-dom"; // useNavigate เอาไว้ redirect ไปหน้าอื่นๆ
import { Link } from "react-router-dom";
import { Mail, Lock } from "lucide-react"; // ใช้ icon

const Login = () => {
  // javascript
  const navigate = useNavigate();
  const actionLogin = useEcomStore((state) => state.actionLogin);
  const user = useEcomStore((state) => state.user);

  // console.log("user zustand", user);

  const [form, setForm] = useState({
    // setForm คือ เอาไว้เซ็ตค่า กำหนดค่า เปลี่ยนvalue ให้กับตัวแปร form
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    // ใช้ฟังชั่น setForm เพื่อเปลี่ยนค่าในตัวแปร form
    // ...form คือการคักลอก object ใน useState
    // key: value  key=[e.target.name]  value=e.target.value
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // ป้องกันการรีเฟรช

    // Sent to Backend
    try {
      const res = await actionLogin(form);
      const role = res.data.payload.role;
      roleRedirect(role); // เมื่อ role เป็น admin ให้ redirect ไปหน้า admin และ role เป็น user ให้ redirect ไปหน้า user
      toast.success("Login success!");
    } catch (err) {
      const errMsg = err.response?.data?.message;
      toast.error(errMsg);
    }
  };

  const roleRedirect = (role) => {
    if (role === "admin") {
      navigate("/admin");
    } else {
      navigate(-1); // -1 จะทำให้กลับไป previous url คือ มาจากหน้าไหนให้กลับไปหน้านั้น
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-b from-blue-200 to-blue-400">
      <div className="w-full max-w-md bg-white p-8 shadow-lg rounded-lg">
        <h1 className="text-3xl text-center font-bold text-blue-600 mb-6">
          เข้าสู่ระบบ
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            {/* <label className="block text-gray-600 font-medium">อีเมล</label> */}
            <div className="flex items-center border rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
              {/* ไอคอนอีเมล */}
              <Mail className="text-gray-500 w-7 h-7 mr-2" />
              <input
                placeholder="อีเมล"
                className="w-full focus:outline-none"
                onChange={handleOnChange}
                name="email"
                type="email"
                autoComplete="off"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            {/* <label className="block text-gray-600 font-medium">รหัสผ่าน</label> */}
            <div className="flex items-center border rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
              {/* ไอคอนรหัสผ่าน */}
              <Lock className="text-gray-500 w-7 h-7 mr-2" />
              <input
                placeholder="รหัสผ่าน"
                className="w-full focus:outline-none"
                onChange={handleOnChange}
                name="password"
                type="password"
                required
              />
            </div>
          </div>

          {/* Button */}
          <button
            className="bg-blue-500 w-full py-2 rounded-md text-white font-bold shadow-md 
              hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
          >
            เข้าสู่ระบบ
          </button>

          {/* Register Link */}
          <p className="text-center text-gray-500 mt-2">
            ยังไม่มีบัญชี?{" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              สมัครสมาชิก
            </Link>
          </p>
        </form>
      </div>
    </div>

    // โค้ดเก่า
    // <div className="min-h-screen flex items-center justify-center bg-gray-100">
    //   <div className="w-full shadow-md bg-white p-8 max-w-md">
    //     <h1 className="text-2xl text-center my-4 font-bold">Login</h1>
    //     <form onSubmit={handleSubmit}>
    //       <div className="space-y-4">
    //         {/* Email */}
    //         <input
    //           placeholder="Email"
    //           className="border w-full px-3 py-1 rounded-md focus:outline-none
    //              focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    //           onChange={handleOnChange}
    //           name="email"
    //           type="email"
    //         />
    //         {/* Password */}
    //         <input
    //           placeholder="Password"
    //           className="border w-full px-3 py-1 rounded-md focus:outline-none
    //              focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    //           onChange={handleOnChange}
    //           name="password"
    //           type="password"
    //         />
    //         <button className="bg-blue-500 rounded-md w-full p-2 text-white font-bold shadow hover:bg-blue-700">
    //           Login
    //         </button>
    //       </div>
    //     </form>
    //   </div>
    // </div>
  );
};

export default Login;
