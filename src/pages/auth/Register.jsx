import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import zxcvbn from "zxcvbn";
import { API_URL } from "../../utils/config";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const registerSchema = z
  .object({
    email: z.string().email({ message: "Invalid email" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const Register = () => {
  // javascript
  const [passwordScore, setPasswordScore] = useState(0);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver: zodResolver(registerSchema) });

  const validatePassword = () => {
    let password = watch().password;
    return zxcvbn(password ? password : "").score;
  };

  useEffect(() => {
    setPasswordScore(validatePassword());
  }, [watch().password]); // watch จะทำการติดตามการเปลี่ยนแปลงของ password

  const onSubmit = async (data) => {
    // const passwordScore = zxcvbn(data.password).score;
    // if (passwordScore < 1) {
    //   toast.warning("Password not strong");
    //   return;
    // }

    // Sent to Backend
    try {
      const res = await axios.post(`${API_URL}/api/register`, data);
      toast.success(res.data);
    } catch (err) {
      const errMsg = err.response?.data?.message;
      toast.error(errMsg);
    }
  };

  // const t = Array.from(Array(5));
  // console.log(t);

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="h-screen flex items-center justify-center bg-gradient-to-b from-blue-200 to-blue-400"
    >
      <div className="w-full max-w-md bg-white p-8 shadow-lg rounded-lg">
        <h1 className="text-3xl text-center font-bold text-blue-600 mb-6">
          สมัครสมาชิก
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-gray-700 font-semibold">อีเมล</label>
            <input
              {...register("email")}
              type="email"
              placeholder="example@example.com"
              className={`border w-full px-4 py-2 rounded-md focus:outline-none 
                focus:ring-2 focus:ring-blue-500 ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 font-semibold">
              รหัสผ่าน
            </label>
            <input
              {...register("password")}
              type="password"
              placeholder="********"
              className={`border w-full px-4 py-2 rounded-md focus:outline-none 
                focus:ring-2 focus:ring-blue-500 ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}

            {/* Password Strength Indicator */}
            {watch().password?.length > 0 && (
              <div className="flex mt-2">
                {Array.from(Array(5).keys()).map((_, index) => (
                  <span className="w-1/5 px-1" key={index}>
                    <div
                      className={`rounded-md h-2 ${
                        passwordScore <= 2
                          ? "bg-red-300"
                          : passwordScore < 4
                          ? "bg-yellow-300"
                          : "bg-green-300"
                      }`}
                    ></div>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-gray-700 font-semibold">
              ยืนยันรหัสผ่าน
            </label>
            <input
              {...register("confirmPassword")}
              type="password"
              placeholder="********"
              className={`border w-full px-4 py-2 rounded-md focus:outline-none 
                focus:ring-2 focus:ring-blue-500 ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-300"
                }`}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Register Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-500 w-full py-2 rounded-md text-white font-bold shadow-md hover:bg-blue-700 transition-all duration-300"
          >
            สมัครสมาชิก
          </motion.button>

          {/* Already have an account? */}
          <p className="text-center text-gray-500 mt-2">
            มีบัญชีอยู่แล้ว?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              เข้าสู่ระบบ
            </Link>
          </p>
        </form>
      </div>
    </motion.div>

    // โค้ดเก่า
    // <div className="min-h-screen flex items-center justify-center bg-gray-100">
    //   <div className="w-full shadow-md bg-white p-8 max-w-md">
    //     <h1 className="text-2xl text-center my-4 font-bold">Register</h1>
    //     <form onSubmit={handleSubmit(onSubmit)}>
    //       <div className="space-y-4">
    //         {/* Email */}
    //         <div>
    //           <input
    //             {...register("email")}
    //             placeholder="Email"
    //             className={`border w-full px-3 py-1 rounded-md focus:outline-none
    //              focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
    //                errors.email && "border-red-500"
    //              }`}
    //           />
    //           {errors.email && (
    //             <p className="text-red-500 text-sm">{errors.email.message}</p>
    //           )}
    //         </div>
    //         {/* Password */}
    //         <div>
    //           <input
    //             {...register("password")}
    //             placeholder="Password"
    //             type="password"
    //             className={`border w-full px-3 py-1 rounded-md focus:outline-none
    //              focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
    //                errors.password && "border-red-500"
    //              }`}
    //           />
    //           {errors.password && (
    //             <p className="text-red-500 text-sm">
    //               {errors.password.message}
    //             </p>
    //           )}

    //           {watch().password?.length > 0 && (
    //             <div className="flex mt-2">
    //               {Array.from(Array(5).keys()).map((item, index) => (
    //                 <span className="w-1/5 px-1" key={index}>
    //                   <div
    //                     className={`rounded-md h-2 ${
    //                       passwordScore <= 2
    //                         ? "bg-red-300"
    //                         : passwordScore < 4
    //                         ? "bg-yellow-300"
    //                         : "bg-green-300"
    //                     }`}
    //                   ></div>
    //                 </span>
    //               ))}
    //             </div>
    //           )}
    //         </div>
    //         {/* Confirm Password */}
    //         <div>
    //           <input
    //             {...register("confirmPassword")}
    //             placeholder="Confirm Password"
    //             type="password"
    //             className={`border w-full px-3 py-1 rounded-md focus:outline-none
    //              focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
    //                errors.confirmPassword && "border-red-500"
    //              }`}
    //           />
    //           {errors.confirmPassword && (
    //             <p className="text-red-500 text-sm">
    //               {errors.confirmPassword.message}
    //             </p>
    //           )}
    //         </div>

    //         <button className="bg-blue-500 rounded-md w-full p-2 text-white font-bold shadow hover:bg-blue-700">
    //           Register
    //         </button>
    //       </div>
    //     </form>
    //   </div>
    // </div>
  );
};

export default Register;
