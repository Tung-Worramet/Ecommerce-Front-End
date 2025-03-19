import React from "react";
import { ListCheck } from "lucide-react";
import useEcomStore from "../../store/ecom-store";
import { Link, useNavigate } from "react-router-dom";
import { createUserCart } from "../../api/user";
import { toast } from "react-toastify";
import { numberFormat } from "../../utils/number";

const ListCart = () => {
  const cart = useEcomStore((state) => state.carts);
  const getTotalPrice = useEcomStore((state) => state.getTotalPrice);
  const user = useEcomStore((state) => state.user);
  const token = useEcomStore((state) => state.token);
  const navigate = useNavigate();

  const handleSaveCart = async () => {
    await createUserCart(token, { cart })
      .then((res) => {
        console.log(res);
        toast.success("บันทึกใส่ตะกร้าเรียบร้อย", { position: "top-center" });
        navigate("/checkout");
      })
      .catch((err) => {
        console.log(err);
        toast.warning(err.response.data.message);
      });
  };
  // console.log(user);
  return (
    <div className="container mx-auto pt-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <ListCheck size={32} className="text-blue-500" />
        <p className="text-2xl font-bold text-gray-800">
          รายการสินค้า ({cart.length}) รายการ
        </p>
      </div>

      {/* List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left - รายการสินค้า */}
        <div className="col-span-2 space-y-4">
          {cart.length > 0 ? (
            cart.map((item, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center transition-all hover:shadow-lg"
              >
                <div className="flex gap-4 items-center">
                  {item.images && item.images.length > 0 ? (
                    <img
                      className="w-20 h-20 rounded-md object-cover"
                      src={item.images[0].url}
                      alt={item.title}
                    />
                  ) : (
                    <div className="w-20 h-20 bg-gray-200 rounded-md flex items-center justify-center">
                      No Image
                    </div>
                  )}
                  <div>
                    <p className="font-semibold text-gray-800">{item.title}</p>
                    <p className="text-sm text-gray-600">
                      {numberFormat(item.price)} x {item.count}
                    </p>
                  </div>
                </div>
                <div className="text-lg font-bold text-blue-500">
                  {numberFormat(item.price * item.count)}
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">ไม่มีสินค้าในตะกร้า</p>
          )}
        </div>

        {/* Right - สรุปยอดรวม */}
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col justify-between h-64">
          <p className="text-2xl font-bold text-gray-800">ยอดรวม</p>
          <div className="flex justify-between items-center text-lg font-medium">
            <span className="text-gray-700">รวมสุทธิ</span>
            <span className="text-2xl font-bold text-blue-500">
              {numberFormat(getTotalPrice())}
            </span>
          </div>

          <div className="flex flex-col gap-4">
            {user ? (
              <button
                disabled={cart.length < 1}
                onClick={handleSaveCart}
                className={`w-full rounded-md py-3 text-white font-bold shadow-md transition-all duration-300 ${
                  cart.length < 1
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-b from-red-500 to-red-700 hover:from-red-600 hover:to-red-800"
                }`}
              >
                สั่งซื้อ
              </button>
            ) : (
              <Link to={"/login"}>
                <button className="w-full bg-gradient-to-r from-blue-500 to-blue-700 rounded-md py-3 text-white font-bold shadow-md hover:from-blue-600 hover:to-blue-800 transition-all duration-300">
                  Login
                </button>
              </Link>
            )}

            <Link to={"/shop"}>
              <button className="w-full bg-gray-500 rounded-md py-3 text-white font-bold shadow-md hover:bg-gray-700 transition-all duration-300">
                แก้ไขรายการ
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>

    // โค้ดเก่า
    // <div className="bg-gray-100 rounded-sm p-4">
    //   {/* Header */}
    //   <div className="flex gap-3 mb-4">
    //     <ListCheck size={36} />
    //     <p className="text-2xl font-bold">รายการสินค้า {cart.length} รายการ</p>
    //   </div>

    //   {/* List */}
    //   <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    //     {/* Left */}
    //     <div className="col-span-2">
    //       {/* Card */}
    //       {cart.map((item, index) => (
    //         <div key={index} className="bg-white p-2 rounded-md shadow-md mb-2">
    //           {/* Row 1 */}
    //           <div className="flex justify-between mb-2">
    //             {/* Left */}
    //             <div className="flex gap-2 items-center">
    //               {item.images && item.images.length > 0 ? (
    //                 <img
    //                   className="w-16 h-16 rounded-md"
    //                   src={item.images[0].url}
    //                 />
    //               ) : (
    //                 <div className="w-16 h-16 bg-gray-200 rounded-md flex text-center items-center">
    //                   No Image
    //                 </div>
    //               )}
    //               <div>
    //                 <p className="font-bold">{item.title}</p>
    //                 <p className="text-sm">
    //                   {numberFormat(item.price)} x {item.count}
    //                 </p>
    //               </div>
    //             </div>

    //             {/* Right */}
    //             <div>
    //               <div className="font-bold text-blue-500">
    //                 {numberFormat(item.price * item.count)}
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       ))}
    //     </div>

    //     {/* Right */}
    //     <div className="bg-white p-4 rounded-md shadow-md space-y-4">
    //       <p className="text-2xl font-bold">ยอดรวม</p>
    //       <div className="flex justify-between">
    //         <span>รวมสุทธิ</span>
    //         <span className="text-2xl font-bold">
    //           {numberFormat(getTotalPrice())}
    //         </span>
    //       </div>

    //       <div className="flex flex-col gap-2">
    //         {/* ถ้ายังไม่ login ให้ไป login แต่ถ้า login แล้วให้มีปุ่มสั่งซื้อขึ้นมา */}
    //         {user ? (
    //           <Link>
    //             <button
    //               disabled={cart.length < 1}
    //               onClick={handleSaveCart}
    //               className={`w-full rounded-md text-white py-2 shadow-md ${
    //                 cart.length < 1
    //                   ? "bg-gray-400 cursor-not-allowed"
    //                   : "bg-red-500 hover:bg-red-700"
    //               }`}
    //             >
    //               สั่งซื้อ
    //             </button>
    //           </Link>
    //         ) : (
    //           <Link to={"/login"}>
    //             <button className="bg-blue-500 w-full rounded-md text-white py-2 shadow-md hover:bg-blue-700">
    //               Login
    //             </button>
    //           </Link>
    //         )}

    //         <Link to={"/shop"}>
    //           <button className="bg-gray-500 w-full rounded-md text-white py-2 shadow-md hover:bg-gray-700">
    //             แก้ไขรายการ
    //           </button>
    //         </Link>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default ListCart;
