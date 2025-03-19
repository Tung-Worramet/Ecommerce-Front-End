import React from "react";
import { Trash2, Minus, Plus } from "lucide-react";
import useEcomStore from "../../store/ecom-store";
import { Link } from "react-router-dom";
import { numberFormat } from "../../utils/number";
import { motion } from "framer-motion";

const CartCard = () => {
  const carts = useEcomStore((state) => state.carts);

  const actionUpdateQuantity = useEcomStore(
    (state) => state.actionUpdateQuantity
  );
  const actionRemoveProduct = useEcomStore(
    (state) => state.actionRemoveProduct
  );
  const getTotalPrice = useEcomStore((state) => state.getTotalPrice);
  // console.log(carts);
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🛒 ตะกร้าสินค้า</h1>

      {/* Card Container */}
      <div className="bg-white shadow-lg rounded-lg p-6 space-y-4">
        {carts.length > 0 ? (
          carts.map((item, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-md shadow-md">
              {/* Row 1 - Product Details */}
              <div className="flex justify-between mb-2">
                {/* Left - Image & Name */}
                <div className="flex gap-4 items-center">
                  {item.images && item.images.length > 0 ? (
                    <img
                      className="w-16 h-16 rounded-md object-cover"
                      src={item.images[0].url}
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gray-300 rounded-md flex items-center justify-center text-center">
                      No Image
                    </div>
                  )}
                  <div className="mb-auto">
                    <p className="text-lg font-semibold">{item.title}</p>
                    {/* <p className="text-sm text-gray-500">{item.description}</p> */}
                  </div>
                </div>
                {/* Right - Remove Button */}
                <button
                  onClick={() => actionRemoveProduct(item.id)}
                  className="text-red-500 hover:text-red-700 transition mb-auto"
                >
                  <Trash2 size={24} />
                </button>
              </div>

              {/* Row 2 - Quantity & Price */}
              <div className="flex justify-between items-center">
                {/* Quantity Controller */}
                <div className="flex items-center rounded-md py-1">
                  <button
                    onClick={() =>
                      actionUpdateQuantity(item.id, item.count - 1)
                    }
                    className="px-3 py-2 bg-gray-300 rounded-l-md hover:bg-gray-400 transition"
                  >
                    <Minus size={12} />
                  </button>
                  <span className="px-4 text-lg font-semibold">
                    {item.count}
                  </span>
                  <button
                    onClick={() =>
                      actionUpdateQuantity(item.id, item.count + 1)
                    }
                    className="px-3 py-2 bg-gray-300 rounded-r-md hover:bg-gray-400 transition"
                  >
                    <Plus size={12} />
                  </button>
                </div>

                {/* Price */}
                <span className="text-xl font-bold text-blue-500">
                  {numberFormat(item.price * item.count)}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">🛍️ ตะกร้าของคุณว่างเปล่า</p>
        )}

        {/* Total & Checkout */}
        {carts.length > 0 && (
          <>
            <div className="flex justify-between text-xl font-bold pb-2">
              <span>รวม:</span>
              <span className="text-green-600">
                {numberFormat(getTotalPrice())}
              </span>
            </div>

            <Link to="/cart">
              <button className="bg-green-500 text-white w-full py-3 rounded-md hover:bg-green-600 transition">
                🛒 ดำเนินการชำระเงิน
              </button>
            </Link>
          </>
        )}
      </div>
    </div>

    // <motion.div
    //   initial={{ opacity: 0, y: 20 }}
    //   animate={{ opacity: 1, y: 0 }}
    //   transition={{ duration: 0.5, ease: "easeOut" }}
    // >
    //   <h1 className="text-2xl font-bold mb-4">🛒 ตะกร้าสินค้า</h1>

    //   <div className="border p-4 bg-white rounded-lg shadow-md">
    //     {carts.length > 0 ? (
    //       carts.map((item, index) => (
    //         <motion.div
    //           key={index}
    //           initial={{ opacity: 0, y: 10 }}
    //           animate={{ opacity: 1, y: 0 }}
    //           transition={{ duration: 0.3 }}
    //           className="bg-gray-100 p-4 rounded-lg shadow-md mb-3 flex flex-col md:flex-row justify-between items-center"
    //         >
    //           {/* 🔹 ภาพสินค้า & รายละเอียด */}
    //           <div className="flex gap-3 items-center w-full md:w-1/3">
    //             {item.images && item.images.length > 0 ? (
    //               <motion.img
    //                 src={item.images[0].url}
    //                 className="w-16 h-16 object-cover rounded-lg shadow-md transition-transform duration-300 hover:scale-110"
    //                 alt={item.title}
    //               />
    //             ) : (
    //               <div className="w-16 h-16 bg-gray-300 flex items-center justify-center text-gray-500 font-semibold rounded-lg">
    //                 No Image
    //               </div>
    //             )}

    //             <div>
    //               <h3 className="font-semibold text-lg truncate">
    //                 {item.title}
    //               </h3>
    //               <p className="text-sm text-gray-500 truncate">
    //                 {item.description}
    //               </p>
    //             </div>
    //           </div>

    //           <div>
    //             <div className="flex justify-end">
    //               {/* 🔹 ปุ่มลบสินค้า */}
    //               <motion.div
    //                 whileHover={{ scale: 1.1 }}
    //                 whileTap={{ scale: 0.9 }}
    //                 onClick={() => actionRemoveProduct(item.id)}
    //                 className="text-red-500 cursor-pointer p-2 hover:text-red-700 transition"
    //               >
    //                 <Trash2 size={20} />
    //               </motion.div>
    //             </div>

    //             <div className="flex mt-5 gap-5">
    //               {/* 🔹 จำนวนสินค้า */}
    //               <div className="flex items-center border rounded-lg px-2 py-1 bg-white shadow-md">
    //                 <motion.button
    //                   whileTap={{ scale: 0.9 }}
    //                   onClick={() =>
    //                     actionUpdateQuantity(item.id, item.count - 1)
    //                   }
    //                   className="px-2 py-1 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
    //                 >
    //                   <Minus size={16} />
    //                 </motion.button>
    //                 <span className="px-3 text-lg font-semibold">
    //                   {item.count}
    //                 </span>
    //                 <motion.button
    //                   whileTap={{ scale: 0.9 }}
    //                   onClick={() =>
    //                     actionUpdateQuantity(item.id, item.count + 1)
    //                   }
    //                   className="px-2 py-1 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
    //                 >
    //                   <Plus size={16} />
    //                 </motion.button>
    //               </div>

    //               {/* 🔹 ราคา */}
    //               <div className="font-bold text-blue-600 text-lg mt-1.5">
    //                 {numberFormat(item.price * item.count)}
    //               </div>
    //             </div>
    //           </div>
    //         </motion.div>
    //       ))
    //     ) : (
    //       <p className="text-center text-gray-500">🛍️ ไม่มีสินค้าในตะกร้า</p>
    //     )}

    //     {/* 🔹 รวมราคาทั้งหมด */}
    //     {carts.length > 0 && (
    //       <div className="flex justify-between text-xl font-semibold mt-4">
    //         <span>รวมทั้งหมด:</span>
    //         <span className="text-blue-600">
    //           {numberFormat(getTotalPrice())}
    //         </span>
    //       </div>
    //     )}

    //     {/* 🔹 ปุ่มชำระเงิน */}
    //     {carts.length > 0 && (
    //       <Link to="/checkout">
    //         <motion.button
    //           whileHover={{ scale: 1.05 }}
    //           whileTap={{ scale: 0.95 }}
    //           className="mt-4 bg-green-500 text-white w-full py-3 rounded-lg shadow-md hover:bg-green-700 transition text-lg"
    //         >
    //           ✅ ดำเนินการชำระเงิน
    //         </motion.button>
    //       </Link>
    //     )}
    //   </div>
    // </motion.div>

    // โค้ดเก่า
    // <div>
    //   <h1 className="text-2xl font-bold">ตะกร้าสินค้า</h1>
    //   {/* Border */}
    //   <div className="border p-2">
    //     {/* Card */}
    //     {carts.map((item, index) => (
    //       <div key={index} className="bg-white p-2 rounded-md shadow-md mb-2">
    //         {/* Row 1 */}
    //         <div className="flex justify-between mb-2">
    //           {/* Left */}
    //           <div className="flex gap-2 items-center">
    //             {item.images && item.images.length > 0 ? (
    //               <img
    //                 className="w-16 h-16 rounded-md"
    //                 src={item.images[0].url}
    //               />
    //             ) : (
    //               <div className="w-16 h-16 bg-gray-200 rounded-md flex text-center items-center">
    //                 No Image
    //               </div>
    //             )}

    //             <div>
    //               <p className="font-bold">{item.title}</p>
    //               <p className="text-sm">{item.description}</p>
    //             </div>
    //           </div>
    //           {/* Right */}
    //           <div
    //             onClick={() => actionRemoveProduct(item.id)}
    //             className="text-red-500 p-2"
    //           >
    //             <Trash2 />
    //           </div>
    //         </div>

    //         {/* Row 2 */}
    //         <div className="flex justify-between">
    //           {/* Left */}
    //           <div className="border rounded-sm px-2 py-1 flex items-center">
    //             <button
    //               onClick={() => actionUpdateQuantity(item.id, item.count - 1)}
    //               className="px-2 py-1 bg-gray-200 rounded-sm hover:bg-gray-300"
    //             >
    //               <Minus size={16} />
    //             </button>
    //             <span className="px-4">{item.count}</span>
    //             <button
    //               onClick={() => actionUpdateQuantity(item.id, item.count + 1)}
    //               className="px-2 py-1 bg-gray-200 rounded-sm hover:bg-gray-300"
    //             >
    //               <Plus size={16} />
    //             </button>
    //           </div>
    //           {/* Right */}
    //           <div className="font-bold text-blue-500">
    //             {numberFormat(item.price * item.count)}
    //           </div>
    //         </div>
    //       </div>
    //     ))}

    //     {/* Total */}
    //     <div className="flex justify-between px-2">
    //       <span>รวม</span>
    //       <span>{numberFormat(getTotalPrice())}</span>
    //     </div>
    //     {/* Button */}
    //     <Link to="/cart">
    //       <button className="mt-4 bg-green-500 text-white w-full py-2 rounded-md hover:bg-green-600">
    //         ดำเนินการชำระเงิน
    //       </button>
    //     </Link>
    //   </div>
    // </div>
  );
};

export default CartCard;
