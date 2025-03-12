import React, { useState, useEffect } from "react";
import useEcomStore from "../../store/ecom-store";
import { createProduct, deleteProduct } from "../../api/product";
import { toast } from "react-toastify";
import UploadFile from "./UploadFile";
import { Link } from "react-router-dom";
import { Pencil, Trash } from "lucide-react";
import { numberFormat } from "../../utils/number";
import { dateFormat } from "../../utils/dateformat";

// ใช้ในการ reset
const initialState = {
  title: "",
  description: "",
  price: 0,
  quantity: 0,
  categoryId: "",
  images: [],
};

// จะนำไปใช้ในหน้า pages/admin/Product
const FormProduct = () => {
  // token, getCategory มาจาก globle state
  const token = useEcomStore((state) => state.token); // useEcomStore เก็บข้อมูล token ไว้ใน localstorage

  const getCategory = useEcomStore((state) => state.getCategory); // เรียกฟังก์ชัน getCategory
  const categories = useEcomStore((state) => state.categories); // เรียกสถานะ categories

  // ทำให้ State redender คือ เคลียร์ทุกค่าทิ้ง
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: 0,
    quantity: 0,
    categoryId: "",
    images: [],
  });

  const getProduct = useEcomStore((state) => state.getProduct);
  const products = useEcomStore((state) => state.products);

  useEffect(() => {
    getCategory();
    getProduct(100);
  }, []);
  //   console.log(products);

  const handleOnChange = (e) => {
    // console.log(e.target.name, e.target.value);
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // ป้องกันการรีเฟรช
    try {
      const res = await createProduct(token, form);
      setForm(initialState); // ล้างข้อมูลใน form ทั้งหมด
      getProduct(); // โหลดข้อมูล products ใหม่จาก API
      toast.success(`Add ${res.data.title} success`);
    } catch (err) {
      console.log("Err handleSubmit", err);
    }
  };

  const handleDelete = async (id) => {
    // window.confirm เป็น javascript ของ windows
    if (window.confirm("Are you sure you want to delete")) {
      try {
        const res = await deleteProduct(token, id);
        toast.success(res.data);
        getProduct(); // โหลดข้อมูล products ใหม่จาก API
      } catch (err) {
        console.log("Err handleDelete", err);
      }
    }
  };

  return (
    // standard
    <div className="container mx-auto p-4 bg-white shadow-md rounded-md">
      <form onSubmit={handleSubmit}>
        <h1>เพิ่มข้อมูลสินค้า</h1>
        <input
          className="border"
          value={form.title}
          onChange={handleOnChange}
          placeholder="Title"
          name="title"
        />
        <input
          className="border"
          value={form.description}
          onChange={handleOnChange}
          placeholder="Description"
          name="description"
        />
        <input
          className="border"
          value={form.price}
          onChange={handleOnChange}
          placeholder="Price"
          name="price"
          type="number"
        />
        <input
          className="border"
          value={form.quantity}
          onChange={handleOnChange}
          placeholder="Quantity"
          name="quantity"
          type="number"
        />
        <select
          className="border"
          name="categoryId"
          onChange={handleOnChange}
          required
          value={form.categoryId}
        >
          <option value="" disabled>
            Please Select
          </option>
          {categories.map((item, index) => (
            // กำหนด value เพื่อที่จะเอา id
            <option key={index} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
        <hr />

        {/* Upload file */}
        {/* form={form} setForm={setForm} คือการส่ง props ไปให้ UploadFile สิ่งที่จะนำไปใช้คือคำด้านหน้า = คือ form setForm ส่วนใน {} คือ ข้อมูลในหน้านี้ */}
        <UploadFile form={form} setForm={setForm} />

        <button className="bg-blue-500 p-2 rounded-md shadow-md hover:scale-110 hover:-translate-y-1 hover:duration-500">
          เพิ่มสินค้า
        </button>
      </form>
      <hr />
      <br />
      <table className="table w-full text-center border">
        <thead>
          <tr className="bg-gray-200 border">
            <th scope="col">ลำดับ</th>
            <th scope="col">รูปภาพ</th>
            <th scope="col">ชื่อสินค้า</th>
            <th scope="col">รายละเอียด</th>
            <th scope="col">ราคา</th>
            <th scope="col">จำนวน</th>
            <th scope="col">จำนวนที่ขาย</th>
            <th scope="col">วันที่อัพเดต</th>
            <th scope="col">จัดการ</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>
                {item.images.length > 0 ? (
                  <img
                    className="w-24 h-24 rounded-lg shadow-md"
                    src={item.images[0].url}
                  />
                ) : (
                  <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center shadow-md">
                    No Image
                  </div>
                )}
              </td>
              <td>{item.title}</td>
              <td>{item.description}</td>
              <td>{numberFormat(item.price)}</td>
              <td>{item.quantity}</td>
              <td>{item.sold}</td>
              <td>{dateFormat(item.updatedAt)}</td>
              <td className="flex gap-2">
                <p className="bg-yellow-400 rounded-md p-1 shadow-md hover:scale-110 hover:-translate-y-1 hover:duration-500">
                  <Link to={"/admin/product/" + item.id}>
                    <Pencil />
                  </Link>
                </p>
                <p
                  className="bg-red-500 rounded-md p-1 shadow-md hover:scale-110 hover:-translate-y-1 hover:duration-500"
                  onClick={() => handleDelete(item.id)}
                >
                  <Trash />
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    // // แต่ง css
    // <div className="container mx-auto p-6 bg-gray-100">
    //   {/* ฟอร์มเพิ่มสินค้า */}
    //   <form
    //     onSubmit={handleSubmit}
    //     className="bg-white rounded-lg shadow-md p-6 space-y-4"
    //   >
    //     <h1 className="text-2xl font-bold text-gray-800">เพิ่มข้อมูลสินค้า</h1>
    //     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    //       {/* ชื่อสินค้า */}
    //       <div>
    //         <label className="block text-gray-700 font-medium mb-1">
    //           ชื่อสินค้า
    //         </label>
    //         <input
    //           type="text"
    //           name="title"
    //           value={form.title}
    //           onChange={handleOnChange}
    //           className="w-full border rounded-md p-2"
    //           placeholder="กรอกชื่อสินค้า"
    //         />
    //       </div>

    //       {/* เลือกหมวดหมู่ */}
    //       <div>
    //         <label className="block text-gray-700 font-medium mb-1">
    //           เลือกหมวดหมู่
    //         </label>
    //         <select
    //           name="category"
    //           value={form.category}
    //           onChange={handleOnChange}
    //           className="w-full border rounded-md p-2"
    //         >
    //           <option value="" disabled>
    //             กรุณาเลือกหมวดหมู่
    //           </option>
    //           {categories.map((category) => (
    //             <option key={category.id} value={category.id}>
    //               {category.name}
    //             </option>
    //           ))}
    //         </select>
    //       </div>

    //       {/* ราคา */}
    //       <div>
    //         <label className="block text-gray-700 font-medium mb-1">ราคา</label>
    //         <input
    //           type="number"
    //           name="price"
    //           value={form.price}
    //           onChange={handleOnChange}
    //           className="w-full border rounded-md p-2"
    //           placeholder="กรอกราคา"
    //         />
    //       </div>

    //       {/* จำนวนสินค้า */}
    //       <div>
    //         <label className="block text-gray-700 font-medium mb-1">
    //           จำนวนสินค้า
    //         </label>
    //         <input
    //           type="number"
    //           name="quantity"
    //           value={form.quantity}
    //           onChange={handleOnChange}
    //           className="w-full border rounded-md p-2"
    //           placeholder="กรอกจำนวนสินค้า"
    //         />
    //       </div>

    //       {/* รายละเอียด */}
    //       <div className="md:col-span-2">
    //         <label className="block text-gray-700 font-medium mb-1">
    //           รายละเอียด
    //         </label>
    //         <textarea
    //           name="description"
    //           value={form.description}
    //           onChange={handleOnChange}
    //           className="w-full border rounded-md p-2"
    //           placeholder="กรอกรายละเอียดสินค้า"
    //           rows="3"
    //         />
    //       </div>
    //     </div>

    //     <UploadFile form={form} setForm={setForm} />
    //     <button className="w-full bg-blue-500 text-white font-semibold p-3 rounded-md shadow-md hover:bg-blue-600 transition-all">
    //       เพิ่มสินค้า
    //     </button>
    //   </form>

    //   <hr className="my-6" />

    //   {/* ตารางรายการสินค้า */}
    //   <h2 className="text-2xl font-bold text-gray-800 mb-4">รายการสินค้า</h2>
    //   <div className="overflow-x-auto">
    //     <table className="table-auto w-full border-collapse bg-white rounded-lg shadow-md">
    //       <thead className="bg-blue-500 text-white">
    //         <tr>
    //           <th className="p-4 text-center rounded-tl-lg">#</th>
    //           <th className="p-4 text-center">รูปภาพ</th>
    //           <th className="p-4 text-center">ชื่อสินค้า</th>
    //           <th className="p-4 text-center">รายละเอียด</th>
    //           <th className="p-4 text-center">ราคา</th>
    //           <th className="p-4 text-center">จำนวน</th>
    //           <th className="p-4 text-center">ขายแล้ว</th>
    //           <th className="p-4 text-center">วันที่อัพเดต</th>
    //           <th className="p-4 text-center rounded-tr-lg">จัดการ</th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         {products.map((item, index) => (
    //           <tr
    //             key={index}
    //             className="hover:bg-gray-100 transition-all border-b text-center"
    //           >
    //             {/* ลำดับ */}
    //             <td className="p-4">{index + 1}</td>

    //             {/* รูปภาพ */}
    //             <td className="p-4">
    //               <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center mx-auto">
    //                 {item.images.length > 0 ? (
    //                   <img
    //                     className="w-full h-full object-cover rounded-lg"
    //                     src={item.images[0].url}
    //                     alt={item.title}
    //                   />
    //                 ) : (
    //                   <span className="text-gray-500">No Image</span>
    //                 )}
    //               </div>
    //             </td>

    //             {/* ชื่อสินค้า */}
    //             <td className="p-4">{item.title}</td>

    //             {/* รายละเอียดสินค้า */}
    //             <td className="p-4">{item.description}</td>

    //             {/* ราคา */}
    //             <td className="p-4 text-green-600 font-bold">฿{item.price}</td>

    //             {/* จำนวน */}
    //             <td className="p-4">{item.quantity}</td>

    //             {/* จำนวนที่ขาย */}
    //             <td className="p-4 text-red-500">{item.sold}</td>

    //             {/* วันที่อัพเดต */}
    //             <td className="p-4 text-sm text-gray-500">{item.updatedAt}</td>

    //             {/* จัดการ */}
    //             <td className="p-4 text-center">
    //               <div className="flex items-center justify-center gap-2">
    //                 <Link
    //                   to={`/admin/product/${item.id}`}
    //                   className="bg-yellow-500 text-white px-3 py-2 rounded-md hover:bg-yellow-600 hover:scale-105 transition-all flex items-center justify-center"
    //                 >
    //                   <Pencil />
    //                 </Link>
    //                 <button
    //                   onClick={() => handleDelete(item.id)}
    //                   className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600 hover:scale-105 transition-all flex items-center justify-center"
    //                 >
    //                   <Trash />
    //                 </button>
    //               </div>
    //             </td>
    //           </tr>
    //         ))}
    //       </tbody>
    //     </table>
    //   </div>
    // </div>
  );
};

export default FormProduct;
