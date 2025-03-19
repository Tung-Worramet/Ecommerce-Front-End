import React, { useEffect, useState } from "react";
import { listUserCart, saveAddress } from "../../api/user";
import useEcomStore from "../../store/ecom-store";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { numberFormat } from "../../utils/number";

const SummaryCard = () => {
  const token = useEcomStore((state) => state.token);
  const [products, setProducts] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);

  const [address, setAddress] = useState("");
  const [addressSaved, setAddressSaved] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    hdlGetUserCart(token);
  }, []);

  const hdlGetUserCart = (token) => {
    listUserCart(token)
      .then((res) => {
        // console.log(res);
        setProducts(res.data.products);
        setCartTotal(res.data.cartTotal);
      })
      .catch((err) => console.log(err));
  };

  const hdlSaveAddress = () => {
    if (!address) {
      return toast.warning("Please fill address");
    }
    saveAddress(token, address)
      .then((res) => {
        // console.log(res);
        toast.success(res.data.message);
        setAddressSaved(true);
      })
      .catch((err) => console.log(err));
  };

  const hdlGoToPayment = () => {
    if (!addressSaved) {
      return toast.warning("กรุณากรอกที่อยู่");
    }
    navigate("/user/payment");
  };

  return (
    <div className="container max-w-7xl mx-auto px-4 pt-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left - ที่อยู่การจัดส่ง */}
        <div className="w-full md:w-1/2">
          <div className="bg-white p-6 rounded-lg border border-gray-300 shadow-lg">
            <h1 className="font-bold text-xl text-gray-800 mb-4">
              📍 ที่อยู่จัดส่งสินค้า
            </h1>
            <textarea
              required
              onChange={(e) => setAddress(e.target.value)}
              placeholder="กรุณากรอกที่อยู่ของคุณ"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
            />
            <button
              onClick={hdlSaveAddress}
              className="mt-4 w-full bg-blue-500 text-white py-3 rounded-lg font-semibold shadow-md transition-all hover:bg-blue-700 hover:scale-105"
            >
              บันทึกที่อยู่
            </button>
          </div>
        </div>

        {/* Right - คำสั่งซื้อ */}
        <div className="w-full md:w-1/2">
          <div className="bg-white p-6 rounded-lg border border-gray-300 shadow-lg">
            <h1 className="text-xl font-bold text-gray-800 mb-4">
              🛍 คำสั่งซื้อของคุณ
            </h1>

            {/* Product List */}
            <div className="space-y-4 max-h-[500px] overflow-y-auto">
              {products?.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-end border-b pb-3"
                >
                  <div>
                    <p className="font-semibold text-gray-800">
                      {item.product.title}
                    </p>
                    <p className="text-sm text-gray-600">
                      จำนวน: {item.count} x {numberFormat(item.product.price)}
                    </p>
                  </div>
                  <p className="text-lg font-bold text-red-500">
                    {numberFormat(item.count * item.product.price)}
                  </p>
                </div>
              ))}
            </div>

            {/* ค่าจัดส่ง & ส่วนลด */}
            <div className="mt-4 text-gray-700">
              <div className="flex justify-between">
                <span>🚚 ค่าจัดส่ง :</span>
                <span>฿0.00</span>
              </div>
              <div className="flex justify-between">
                <span>🎉 ส่วนลด :</span>
                <span>-฿0.00</span>
              </div>
            </div>

            {/* ยอดรวม */}
            <div className="mt-4 border-t pt-4">
              <div className="flex justify-between items-center text-lg font-bold text-gray-800">
                <span>💰 ยอดรวมสุทธิ :</span>
                <span className="text-red-500 text-2xl">
                  {numberFormat(cartTotal)}
                </span>
              </div>
            </div>

            {/* ปุ่มดำเนินการชำระเงิน */}
            <button
              onClick={hdlGoToPayment}
              className="mt-6 w-full bg-green-500 text-white py-3 rounded-lg font-semibold shadow-md transition-all hover:bg-green-700 hover:scale-105"
            >
              🏦 ดำเนินการชำระเงิน
            </button>
          </div>
        </div>
      </div>
    </div>

    // โค้ดเก่า
    // <div className="mx-auto">
    //   <div className="flex flex-warp gap-4">
    //     {/* Left */}
    //     <div className="w-2/4 ">
    //       <div className="bg-gray-200 p-4 rounded-md border shadow-md space-y-4">
    //         <h1 className="font-bold text-lg">ที่อยู่การจัดส่ง</h1>
    //         <textarea
    //           required
    //           onChange={(e) => setAddress(e.target.value)}
    //           placeholder="กรุณากรอกที่อยู่"
    //           className="w-full px-2"
    //         />
    //         <button
    //           onClick={hdlSaveAddress}
    //           className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 hover:scale-105 hover:duration-200"
    //         >
    //           Save Address
    //         </button>
    //       </div>
    //     </div>

    //     {/* Right */}
    //     <div className="w-2/4">
    //       <div className="bg-gray-200 p-4 rounded-md border shadow-md space-y-4">
    //         <h1 className="text-lg font-bold">คำสั่งซื้อของคุณ</h1>

    //         {/* Item List */}
    //         {products?.map((item, index) => (
    //           <div key={index}>
    //             <div className="flex justify-between items-end">
    //               {/* Left */}
    //               <div>
    //                 <p className="font-bold">{item.product.title}</p>
    //                 <p className="text-sm">
    //                   จำนวน : {item.count} x {numberFormat(item.product.price)}
    //                 </p>
    //               </div>

    //               {/* Right */}
    //               <div>
    //                 <p className="text-red-500 font-bold">
    //                   {numberFormat(item.count * item.product.price)}
    //                 </p>
    //               </div>
    //             </div>
    //           </div>
    //         ))}

    //         <hr className="size-0.5 bg-gray-500 w-full " />

    //         {/* ค่าจัดส่ง ส่วนลด */}
    //         <div>
    //           <div className="flex justify-between">
    //             <p>ค่าจัดส่ง :</p>
    //             <p>0.00</p>
    //           </div>
    //           <div className="flex justify-between">
    //             <p>ส่วนลด :</p>
    //             <p>0.00</p>
    //           </div>
    //         </div>

    //         <hr className="size-0.5 bg-gray-500 w-full " />

    //         {/* ยอดรวม */}
    //         <div>
    //           <div className="flex justify-between items-center">
    //             <p className="font-bold">ยอดรวมสุทธิ :</p>
    //             <p className="text-red-500 font-bold text-lg">
    //               {numberFormat(cartTotal)}
    //             </p>
    //           </div>
    //           <div className="pt-4">
    //             <button
    //               onClick={hdlGoToPayment}
    //               //   disabled={!addressSaved}
    //               className="bg-green-400 w-full p-2 rounded-md shadow-md text-white hover:bg-green-600 hover:duration-200"
    //             >
    //               ดำเนินการชำระเงิน
    //             </button>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default SummaryCard;
