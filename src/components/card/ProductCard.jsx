import React from "react";
import { ShoppingCart } from "lucide-react";
import useEcomStore from "../../store/ecom-store";
import { numberFormat } from "../../utils/number";
import { motion } from "framer-motion";

// item นี้มาจากหน้า Shop , item ใน ({ item }) มาจาก item ตัวแรกที่ไม่ได้อยู่ใน {} item={item}
const ProductCard = ({ item }) => {
  const actionAddtoCart = useEcomStore((state) => state.actionAddtoCart);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="border rounded-lg shadow-lg p-4 bg-white hover:shadow-xl transition-all h-full flex flex-col"
    >
      {/* รูปภาพ */}
      <div className="relative overflow-hidden rounded-lg h-60">
        {item.images && item.images.length > 0 ? (
          <img
            src={item.images[0].url}
            className="w-full h-full object-cover rounded-lg hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gray-300 rounded-lg flex items-center justify-center shadow-md">
            No Image
          </div>
        )}
      </div>

      {/* รายละเอียดสินค้า */}
      <div className="py-3 flex-grow">
        <p className="text-lg font-semibold truncate">{item.title}</p>
        <p className="text-sm text-gray-500 min-h-[30px] truncate">
          {item.description}
        </p>
      </div>

      {/* ราคาและปุ่ม Add to Cart */}
      <div className="flex justify-between items-center mt-auto">
        <span className="text-xl font-bold text-gray-800">
          {numberFormat(item.price)}
        </span>
        <button
          onClick={() => actionAddtoCart(item)}
          className="bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-md px-4 py-2 flex items-center gap-2 shadow-md hover:scale-105 transition-all"
        >
          <ShoppingCart size={20} />
        </button>
      </div>
    </motion.div>

    // โค้ดเก่า
    // <motion.div
    //   initial={{ opacity: 0, scale: 0.5 }}
    //   animate={{ opacity: 1, scale: 1 }}
    //   transition={{ duration: 0.5 }}
    // >
    //   <div className="border rounded-md shadow-md p-2 w-48">
    //     <div>
    //       {item.images && item.images.length > 0 ? (
    //         <img
    //           src={item.images[0].url}
    //           className="rounded-md shadow-md w-full h-60 object-cover hover:scale-110 hover:duration-200"
    //         />
    //       ) : (
    //         <div className="w-full h-60 bg-gray-300 rounded-md text-center flex items-center justify-center shadow">
    //           No Image
    //         </div>
    //       )}
    //     </div>

    //     <div className="py-2">
    //       <p className="text-xl truncate">{item.title}</p>
    //       <p className="text-sm text-gray-500 truncate">{item.description}</p>
    //     </div>

    //     <div className="flex justify-between items-center">
    //       <span className="text-xl font-bold">{numberFormat(item.price)}</span>
    //       <button
    //         onClick={() => actionAddtoCart(item)}
    //         className="bg-blue-500 rounded-md p-2 hover:bg-blue-700 shadow-md transition-all hover:scale-105"
    //       >
    //         <ShoppingCart />
    //       </button>
    //     </div>
    //   </div>
    // </motion.div>
  );
};

export default ProductCard;
