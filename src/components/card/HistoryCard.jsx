import React, { useState, useEffect } from "react";
import useEcomStore from "../../store/ecom-store";
import { getOrders } from "../../api/user";
import { numberFormat } from "../../utils/number";
import { dateFormat } from "../../utils/dateformat";

const HistoryCard = () => {
  const token = useEcomStore((state) => state.token);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    hdlgetOrders(token);
  }, []);

  const hdlgetOrders = (token) => {
    getOrders(token)
      .then((res) => {
        // console.log("res", res);
        setOrders(res.data.orders);
        // console.log("orders", orders);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Not Process":
        return "bg-gray-500";
      case "Processing":
        return "bg-blue-300";
      case "Completed":
        return "bg-green-300";
      case "Cancelled":
        return "bg-red-500";
    }
  };

  return (
    <div className="container mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">
        📜 ประวัติการสั่งซื้อ
      </h1>

      {/* คลุมทั้งหมด */}
      <div className="space-y-6">
        {orders
          ?.slice() // ใช้ slice() เพื่อป้องกันการแก้ไขค่าเดิมใน state
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // เรียงจากล่าสุด → เก่าสุด
          .map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg border border-gray-200 shadow-md"
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-sm text-gray-500">📅 วันที่สั่งซื้อ</p>
                  <p className="font-bold text-gray-800">
                    {dateFormat(item.createdAt)}
                  </p>
                </div>
                <div>
                  <span
                    className={`${getStatusColor(
                      item.orderStatus
                    )} px-3 py-1 rounded-full text-white font-semibold`}
                  >
                    {item.orderStatus}
                  </span>
                </div>
              </div>

              {/* Table Loop Product */}
              <div className="overflow-x-auto">
                <table className="w-full border rounded-lg">
                  <thead>
                    <tr className="bg-gray-100 border-b">
                      <th className="p-3 text-left text-gray-600">สินค้า</th>
                      <th className="p-3 text-center text-gray-600">จำนวน</th>
                      <th className="p-3 text-center text-gray-600">ราคา</th>
                      <th className="p-3 text-center text-gray-600">รวม</th>
                    </tr>
                  </thead>
                  <tbody>
                    {item.products?.map((product, index) => (
                      <tr key={index} className="border-b">
                        <td className="p-3">{product.product.title}</td>
                        <td className="p-3 text-center">{product.count}</td>
                        <td className="p-3 text-center">
                          {numberFormat(product.price)}
                        </td>
                        <td className="p-3 text-center font-bold text-red-500">
                          {numberFormat(product.price * product.count)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Total */}
              <div className="text-right mt-4">
                <p className="text-gray-600 text-sm">💰 ราคาสุทธิ</p>
                <p className="text-2xl font-bold text-blue-600">
                  {numberFormat(item.cartTotal)}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>

    // โค้ดเก่า
    // <div className="space-y-6">
    //   <h1 className="text-2xl font-bold">ประวัติการสั่งซื้อ</h1>

    //   {/* คลุม */}
    //   <div className="space-y-4">
    //     {/* Card Loop Order */}
    //     {orders?.map((item, index) => {
    //       return (
    //         <div key={index} className="bg-gray-100 p-4 rounded-md shadow-md">
    //           {/* Header */}
    //           <div className="flex justify-between mb-2">
    //             {/* Left */}
    //             <div>
    //               <p className="text-sm">Order Date</p>
    //               <p className="font-bold">{dateFormat(item.updatedAt)}</p>
    //             </div>
    //             {/* Right */}
    //             <div>
    //               <span
    //                 className={`${getStatusColor(
    //                   item.orderStatus
    //                 )} px-2 py-1 rounded-full`}
    //               >
    //                 {item.orderStatus}
    //               </span>
    //             </div>
    //           </div>

    //           {/* Table Loop Product */}
    //           <div>
    //             <table className="border w-full">
    //               <thead>
    //                 <tr className="bg-gray-200">
    //                   <th>สินค้า</th>
    //                   <th>จำนวน</th>
    //                   <th>ราคา</th>
    //                   <th>รวม</th>
    //                 </tr>
    //               </thead>
    //               <tbody>
    //                 {item.products?.map((product, index) => {
    //                   //   console.log("product", product);
    //                   return (
    //                     <tr key={index}>
    //                       <td>{product.product.title}</td>
    //                       <td className="text-center">{product.count}</td>
    //                       <td className="text-center">
    //                         {numberFormat(product.price)}
    //                       </td>
    //                       <td className="text-center">
    //                         {numberFormat(product.price * product.count)}
    //                       </td>
    //                     </tr>
    //                   );
    //                 })}
    //               </tbody>
    //             </table>
    //           </div>

    //           {/* Total */}
    //           <div>
    //             <div className="text-right">
    //               <p>ราคาสุทธิ</p>
    //               <p>{numberFormat(item.cartTotal)}</p>
    //             </div>
    //           </div>
    //         </div>
    //       );
    //     })}
    //   </div>
    // </div>
  );
};

export default HistoryCard;
