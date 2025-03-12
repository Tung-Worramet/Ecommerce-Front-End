import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import zxcvbn from "zxcvbn";

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
      const res = await axios.post(
        "https://ecommerce-back-end-ten.vercel.app/api/register",
        data
      );
      toast.success(res.data);
    } catch (err) {
      const errMsg = err.response?.data?.message;
      toast.error(errMsg);
    }
  };

  // const t = Array.from(Array(5));
  // console.log(t);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full shadow-md bg-white p-8 max-w-md">
        <h1 className="text-2xl text-center my-4 font-bold">Register</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            {/* Email */}
            <div>
              <input
                {...register("email")}
                placeholder="Email"
                className={`border w-full px-3 py-1 rounded-md focus:outline-none
                 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                   errors.email && "border-red-500"
                 }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
            {/* Password */}
            <div>
              <input
                {...register("password")}
                placeholder="Password"
                type="password"
                className={`border w-full px-3 py-1 rounded-md focus:outline-none
                 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                   errors.password && "border-red-500"
                 }`}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}

              {watch().password?.length > 0 && (
                <div className="flex mt-2">
                  {Array.from(Array(5).keys()).map((item, index) => (
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
              <input
                {...register("confirmPassword")}
                placeholder="Confirm Password"
                type="password"
                className={`border w-full px-3 py-1 rounded-md focus:outline-none
                 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                   errors.confirmPassword && "border-red-500"
                 }`}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <button className="bg-blue-500 rounded-md w-full p-2 text-white font-bold shadow hover:bg-blue-700">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
