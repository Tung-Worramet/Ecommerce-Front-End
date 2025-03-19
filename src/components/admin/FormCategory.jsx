import React, { useState, useEffect } from "react";
import {
  createCategory,
  listCategory,
  removeCategory,
} from "../../api/Category";
import useEcomStore from "../../store/ecom-store";
import { toast } from "react-toastify";
import { Trash2, PlusCircle } from "lucide-react";

const FormCategory = () => {
  const [name, setName] = useState("");
  const token = useEcomStore((state) => state.token); // useEcomStore เก็บข้อมูล token ไว้ใน localstorage
  const [loading, setLoading] = useState(false);

  // list Category
  //   const [categories, setCategories] = useState([]);
  const categories = useEcomStore((state) => state.categories);
  const getCategory = useEcomStore((state) => state.getCategory);

  // list Category
  useEffect(() => {
    getCategory(); // เรียกฟังก์ชั่น getCategory เมื่อเริ่มหน้า
  }, []); // ที่ใส่ [] เพื่อป้องกัน infinity loop

  //   list Category
  //   const getCategory = async (token) => {
  //     try {
  //       const res = await listCategory(token);
  //       setCategories(res.data); // นำข้อมูลไปเก็บไว้ใน categories
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  // Add Category
  const handleSubmit = async (e) => {
    e.preventDefault(); // ป้องกันการรีเฟรชหน้าตอนกด submit
    if (!name) {
      return toast.warning("Please fill data");
    }
    try {
      const res = await createCategory(token, { name });
      toast.success(`Add category ${res.data.name} success`);
      getCategory(token); // เพื่อตอนที่เพิ่มข้อมูลเข้ามาใหม่ข้อมูลจะแสดงเลย ไม่ต้องรีเฟรชหน้า
    } catch (err) {
      console.log(err);
    }
  };

  const handleRemove = async (id) => {
    try {
      const res = await removeCategory(token, id);
      toast.success(`Delete category ${res.data.name} success`);
      getCategory(token); // หลังลบข้อมูลเสร็จข้อมูลจะหายไปเลย ไม่ต้องรีเฟรชหน้า
    } catch (err) {
      console.log(err);
    }
  };

  //   return (
  //     <div className="container mx-auto p-4 bg-white shadow-md rounded-md">
  //       <h1>Category Management</h1>
  //       <form className="my-4" onSubmit={handleSubmit}>
  //         <input
  //           className="border"
  //           type="text"
  //           onChange={(e) => setName(e.target.value)}
  //         />
  //         <button className="bg-blue-500">Add Category</button>
  //       </form>
  //       <hr />
  //       <ul className="list-none">
  //         {categories.map((item, index) => (
  //           <li key={index} className="flex justify-between my-2">
  //             <span>{item.name}</span>

  //             <button
  //               className="bg-red-500 rounded-md px-2 py-1.5"
  //               onClick={() => handleRemove(item.id)}
  //             >
  //               <Trash2 color="white" />
  //             </button>
  //           </li>
  //         ))}
  //       </ul>
  //     </div>
  //   );

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg max-w-lg mt-3">
      <h1 className="text-2xl font-bold text-gray-700 mb-4 flex items-center gap-2">
        จัดการหมวดหมู่สินค้า
      </h1>

      {/* ✅ Form เพิ่มหมวดหมู่ */}
      <form className="flex gap-4 mb-6" onSubmit={handleSubmit}>
        <input
          type="text"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="กรอกชื่อหมวดหมู่..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition flex items-center gap-2"
        >
          {loading ? "กำลังเพิ่ม..." : "เพิ่ม"}
        </button>
      </form>

      <hr className="mb-4" />

      {/* ✅ แสดงรายการหมวดหมู่ */}
      <ul className="space-y-3">
        {categories.length > 0 ? (
          categories.map((item, index) => (
            <li
              key={index}
              className="flex items-center justify-between p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
            >
              <span className="text-gray-800">{item.name}</span>
              <button
                onClick={() => {
                  handleRemove(item.id);
                  toast.error("ลบหมวดหมู่แล้ว ❌");
                }}
                className="flex items-center justify-center w-8 h-8 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </li>
          ))
        ) : (
          <p className="text-center text-gray-500">ไม่มีหมวดหมู่</p>
        )}
      </ul>
    </div>

    // โค้ดเก่า
    // <div className="container mx-auto p-6 bg-white shadow-md rounded-md max-w-xl">
    //   <h1 className="text-2xl font-bold text-gray-700 mb-4">
    //     Category Management
    //   </h1>
    //   <form className="flex gap-4 mb-6" onSubmit={handleSubmit}>
    //     <input
    //       type="text"
    //       className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    //       placeholder="Enter category"
    //       value={name}
    //       onChange={(e) => setName(e.target.value)}
    //     />
    //     <button
    //       type="submit"
    //       className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
    //     >
    //       Add Category
    //     </button>
    //   </form>
    //   <hr className="mb-4" />
    //   <ul className="space-y-3">
    //     {categories.map((item, index) => (
    //       <li
    //         key={index}
    //         className="flex items-center justify-between p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
    //       >
    //         <span className="text-gray-800">{item.name}</span>
    //         <button
    //           onClick={() => handleRemove(item.id)}
    //           className="flex items-center justify-center w-8 h-8 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
    //         >
    //           <Trash2 className="w-4 h-4" />
    //         </button>
    //       </li>
    //     ))}
    //   </ul>
    // </div>
  );
};

export default FormCategory;
