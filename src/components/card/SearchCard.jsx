import React, { useState, useEffect } from "react";
import useEcomStore from "../../store/ecom-store";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { numberFormat } from "../../utils/number";
import { Search, Filter } from "lucide-react";

const SearchCard = () => {
  const getProduct = useEcomStore((state) => state.getProduct);
  const products = useEcomStore((state) => state.products);
  const actionSearchFilters = useEcomStore(
    (state) => state.actionSearchFilters
  );
  const getCategory = useEcomStore((state) => state.getCategory);
  const categories = useEcomStore((state) => state.categories);

  const [text, setText] = useState("");
  const [categorySelected, setCategorySelected] = useState([]);
  const [price, setPrice] = useState([0, 100000]);
  const [ok, setOk] = useState(false);

  const [filteredProducts, setFilteredProducts] = useState([]);

  // console.log(categories);
  useEffect(() => {
    getCategory();
  }, []);

  // Step 1 Search Text
  // console.log(text);
  useEffect(() => {
    const delay = setTimeout(() => {
      if (text) {
        actionSearchFilters({ query: text });
      } else {
        getProduct();
      }
    }, 500);

    return () => clearTimeout(delay); // เมื่อ component ถูก unmount ให้ clear timeout
  }, [text]); // การที่ใส่ text ลงใน [] คือการทำให้ useEffect ติดตามการกระทำของ text เมื่อ text มีการเปลี่ยนแปลง useEffect ก็จะมีการทำงานใหม่ 1 ครั้ง แล้วเรียกใช้ฟังค์ชั่นที่อยู่ใน useEffect ด้วย

  // Step 2 Search by Category
  const handleCheck = (e) => {
    // console.log(e.target.value);
    const inCheck = e.target.value; // ค่าที่เรา ติ๊ก ไว้
    const inState = [...categorySelected]; // [] เป็น array ว่างๆ ไว้เก็บค่าที่เรา ติ๊ก
    const findCheck = inState.indexOf(inCheck); // จะเข้าไปค้นหาใน array ถ้าไม่เจอจะ return -1

    if (findCheck === -1) {
      inState.push(inCheck); // เพิ่มใน array ที่เราเลือก
    } else {
      inState.splice(findCheck, 1); // ลบใน array ที่เราเลือก
    }
    setCategorySelected(inState);

    if (inState.length > 0) {
      actionSearchFilters({ category: inState });
    } else {
      getProduct();
    }
  };
  // console.log(categorySelected);

  // Step 3 Search by Price
  useEffect(() => {
    actionSearchFilters({ price });
  }, [ok]);

  const handlePrice = (value) => {
    // console.log(value);
    setPrice(value); // อัปเดตช่วงราคาที่เลือก

    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg space-y-6">
      {/* Header */}
      {/* <div className="flex items-center gap-2">
        <Filter size={24} className="text-blue-600" />
        <h2 className="text-2xl font-bold">ค้นหาสินค้า</h2>
      </div> */}

      {/* ค้นหาด้วยข้อความ */}
      <div className="relative">
        <Search className="absolute left-3 top-2 text-gray-400" />
        <input
          className="border rounded-md w-full py-2 pl-10 pr-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          type="text"
          placeholder="ค้นหาสินค้า..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      {/* ค้นหาด้วยหมวดหมู่ */}
      <div>
        <h3 className="text-lg font-semibold mb-2">📂 หมวดหมู่สินค้า</h3>
        <div className="space-y-2">
          {categories.map((item, index) => (
            <label
              key={index}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="checkbox"
                className="w-4 h-4"
                onChange={handleCheck}
                value={item.id}
              />
              <span className="text-gray-700">{item.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* ค้นหาด้วยราคา */}
      <div>
        <h3 className="text-lg font-semibold mb-2">💰 ค้นหาราคา</h3>
        <div className="flex justify-between text-gray-700">
          <span>Min: {numberFormat(price[0])}</span>
          <span>Max: {numberFormat(price[1])}</span>
        </div>
        <Slider
          onChange={handlePrice}
          range
          min={0}
          max={100000}
          defaultValue={[100, 100000]}
        />
      </div>
    </div>

    // โค้ดเก่า
    // <div>
    //   <h1 className="text-xl font-bold md-4">ค้นหาสินค้า</h1>
    //   {/* ช่องใส่คำค้น  Search by Text*/}
    //   <input
    //     className="border rounded-md w-full mb-4 px-2"
    //     type="text"
    //     placeholder="ค้นหาสินค้า..."
    //     value={text}
    //     onChange={(e) => setText(e.target.id)}
    //   />
    //   <hr />

    //   {/* เลือกหมวดหมู่ Search by category*/}
    //   <div>
    //     <h1 className="text-xl">หมวดหมู่สินค้า</h1>
    //     <div>
    //       {categories.map((item, index) => (
    //         <div className="flex gap-2" key={index}>
    //           <input type="checkbox" onChange={handleCheck} value={item.id} />
    //           <label>{item.name}</label>
    //         </div>
    //       ))}
    //     </div>
    //   </div>
    //   <hr />

    //   {/* Search by Price */}
    //   <div>
    //     <h1>ค้าหาราคา</h1>
    //     <div>
    //       <div className="flex justify-between">
    //         <span>Min : {numberFormat(price[0])}</span>
    //         <span>Max : {numberFormat(price[1])}</span>
    //       </div>
    //       <Slider
    //         onChange={handlePrice}
    //         range
    //         min={0}
    //         max={100000}
    //         defaultValue={[100, 100000]}
    //       />
    //     </div>
    //   </div>
    // </div>
  );
};

export default SearchCard;
