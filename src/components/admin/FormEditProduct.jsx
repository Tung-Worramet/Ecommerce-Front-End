import React, { useState, useEffect } from "react";
import useEcomStore from "../../store/ecom-store";
import { createProduct, readProduct, updateProduct } from "../../api/product";
import { toast } from "react-toastify";
import UploadFile from "./UploadFile";
import { useParams, useNavigate } from "react-router-dom"; // useParams ใช้ในการอ่านค่าบน url , useNavigate ใช้ในการ redirect ไปหน้าต่างๆ

const initialState = {
  title: "fk2",
  description: "description",
  price: 3000,
  quantity: 40,
  categoryId: "",
  images: [],
};

// จะนำไปใช้ในหน้า pages/admin/Product
const FormEditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // token, getCategory มาจาก globle state
  const token = useEcomStore((state) => state.token); // useEcomStore เก็บข้อมูล token ไว้ใน localstorage

  const getCategory = useEcomStore((state) => state.getCategory); // เรียกฟังก์ชัน getCategory
  const categories = useEcomStore((state) => state.categories); // เรียกสถานะ categories
  const [form, setForm] = useState(initialState);

  useEffect(() => {
    getCategory();
    fetchProduct(token, id, form);
  }, []);

  const fetchProduct = async (token, id, form) => {
    try {
      const res = await readProduct(token, id, form);
      console.log("res from backend", res);
      setForm(res.data);
    } catch (err) {
      console.log("Err fetch data", err);
    }
  };

  const handleOnChange = (e) => {
    // console.log(e.target.name, e.target.value);
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // ป้องกันการรีเฟรช
    try {
      const res = await updateProduct(token, id, form);
      toast.success(`Add ${res.data.title} success`);
      navigate("/admin/product"); // ให้ redirect ไปหน้า product
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-3">
      <h1 className="text-2xl font-bold text-gray-700 mb-4">
        📦 เพิ่ม/แก้ไขสินค้า
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* 📝 Input: Title */}
        <div>
          <label className="block text-gray-600 mb-1">ชื่อสินค้า</label>
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.title}
            onChange={handleOnChange}
            placeholder="Title"
            name="title"
            required
          />
        </div>

        {/* 📝 Input: Description */}
        <div>
          <label className="block text-gray-600 mb-1">รายละเอียดสินค้า</label>
          <textarea
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.description}
            onChange={handleOnChange}
            placeholder="Description"
            name="description"
            rows="3"
            required
          ></textarea>
        </div>

        {/* 📝 Input: Price & Quantity */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-600 mb-1">ราคา</label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.price}
              onChange={handleOnChange}
              placeholder="Price"
              name="price"
              type="number"
              required
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-1">จำนวน</label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.quantity}
              onChange={handleOnChange}
              placeholder="Quantity"
              name="quantity"
              type="number"
              required
            />
          </div>
        </div>

        {/* 🛒 Select: Category */}
        <div>
          <label className="block text-gray-600 mb-1">หมวดหมู่</label>
          <select
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="categoryId"
            onChange={handleOnChange}
            required
            value={form.categoryId}
          >
            <option value="" disabled>
              กรุณาเลือกหมวดหมู่
            </option>
            {categories.map((item, index) => (
              <option key={index} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        {/* 📷 File Upload */}
        <div>
          {/* <label className="block text-gray-600 mb-1">รูปภาพ</label> */}
          <UploadFile form={form} setForm={setForm} />
        </div>

        {/* 🔘 Submit Button */}
        <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-all font-bold">
          🛒 เพิ่ม/แก้ไขสินค้า
        </button>
      </form>
    </div>

    // โค้ดเก่า
    // <div className="container mx-auto p-4 bg-white shadow-md rounded-md">
    //   <form onSubmit={handleSubmit}>
    //     <h1>เพิ่มข้อมูลสินค้า</h1>
    //     <input
    //       className="border"
    //       value={form.title}
    //       onChange={handleOnChange}
    //       placeholder="Title"
    //       name="title"
    //     />
    //     <input
    //       className="border"
    //       value={form.description}
    //       onChange={handleOnChange}
    //       placeholder="Description"
    //       name="description"
    //     />
    //     <input
    //       className="border"
    //       value={form.price}
    //       onChange={handleOnChange}
    //       placeholder="Price"
    //       name="price"
    //       type="number"
    //     />
    //     <input
    //       className="border"
    //       value={form.quantity}
    //       onChange={handleOnChange}
    //       placeholder="Quantity"
    //       name="quantity"
    //       type="number"
    //     />
    //     <select
    //       className="border"
    //       name="categoryId"
    //       onChange={handleOnChange}
    //       required
    //       value={form.categoryId}
    //     >
    //       <option value="" disabled>
    //         Please Select
    //       </option>
    //       {categories.map((item, index) => (
    //         // กำหนด value เพื่อที่จะเอา id
    //         <option key={index} value={item.id}>
    //           {item.name}
    //         </option>
    //       ))}
    //     </select>
    //     <hr />

    //     {/* Upload file */}
    //     {/* form={form} setForm={setForm} คือการส่ง props ไปให้ UploadFile สิ่งที่จะนำไปใช้คือคำด้านหน้า = คือ form setForm ส่วนใน {} คือ ข้อมูลในหน้านี้ */}
    //     <UploadFile form={form} setForm={setForm} />

    //     <button className="bg-blue-500">แก้ไขสินค้า</button>
    //   </form>
    //   <hr />
    //   <br />
    // </div>
  );
};

export default FormEditProduct;
