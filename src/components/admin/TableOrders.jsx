import React, { useEffect, useState } from "react";
import useEcomStore from "../../store/ecom-store";
import { getOrdersAdmin, changeOrdersStatus } from "../../api/admin";
import { toast } from "react-toastify";
import { numberFormat } from "../../utils/number";
import { dateFormat } from "../../utils/dateformat";

const TableOrders = () => {
  const token = useEcomStore((state) => state.token);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    hdlgetOrder(token);
  }, []);

  const hdlgetOrder = (token) => {
    getOrdersAdmin(token)
      .then((res) => {
        // console.log(res);
        setOrders(res.data);
        // console.log("orders", orders);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChangeOrderStatus = (token, orderId, orderStatus) => {
    changeOrdersStatus(token, orderId, orderStatus)
      .then((res) => {
        // console.log(res);
        // toast.success("Update order status success");
        toast.success("อัปเดตสถานะคำสั่งซื้อสำเร็จ ✅");
        hdlgetOrder(token); // เรียกใช้ hdlgetOrder เพื่อโหลดข้อมูลใหม่
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // เปลี่ยนสีตามสถานะ
  const getStatusColor = (status) => {
    switch (status) {
      case "Not Process":
        return "bg-gray-300 text-gray-800";
      case "Processing":
        return "bg-blue-300 text-blue-800";
      case "Completed":
        return "bg-green-300 text-green-800";
      case "Cancelled":
        return "bg-red-400 text-white";
      default:
        return "bg-gray-200";
    }
    // switch (status) {
    //   case "Not Process":
    //     return "bg-gray-200";
    //   case "Processing":
    //     return "bg-blue-200";
    //   case "Completed":
    //     return "bg-green-200";
    //   case "Cancelled":
    //     return "bg-red-500 ";
    // }
  };

  return (
    <div className="container mx-auto p-6 bg-white shadow-md rounded-md mt-3">
      <h1 className="text-2xl font-bold text-gray-700 mb-4">
        📦 คำสั่งซื้อทั้งหมด
      </h1>

      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="px-4 py-2 border">ลำดับ</th>
              <th className="px-4 py-2 border text-left">ผู้ใช้งาน</th>
              <th className="px-4 py-2 border text-left">ที่อยู่</th>
              <th className="px-4 py-2 border">วันที่</th>
              <th className="px-4 py-2 border">สินค้า</th>
              <th className="px-4 py-2 border">ยอดรวม</th>
              <th className="px-4 py-2 border">สถานะ</th>
              <th className="px-4 py-2 border">เปลี่ยนสถานะ</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((item, index) => (
              <tr
                key={index}
                className="border hover:bg-gray-100 transition-all"
              >
                <td className="px-4 py-2 text-center">{index + 1}</td>

                <td className="px-4 py-2">
                  <p className="font-bold">{item.orderedBy.email}</p>
                </td>

                <td className="px-4 py-2">
                  <p>{item.orderedBy.address}</p>
                </td>

                <td className="px-4 py-2 text-center">
                  {dateFormat(item.createdAt)}
                </td>

                <td className="px-4 py-2">
                  {item.products.map((product, idx) => (
                    <li key={idx} className="text-sm">
                      {product.product.title}{" "}
                      <span className="text-gray-500">
                        {product.count} x {numberFormat(product.price)}
                      </span>
                    </li>
                  ))}
                </td>

                <td className="px-4 py-2 font-bold text-blue-600 text-center">
                  {numberFormat(item.cartTotal)}
                </td>

                <td className="px-4 py-2 text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-bold ${getStatusColor(
                      item.orderStatus
                    )}`}
                  >
                    {item.orderStatus}
                  </span>
                </td>

                <td className="px-4 py-2 text-center">
                  <select
                    value={item.orderStatus}
                    onChange={(e) =>
                      handleChangeOrderStatus(token, item.id, e.target.value)
                    }
                    className="border px-3 py-1 rounded-md shadow-md bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option>Not Process</option>
                    <option>Processing</option>
                    <option>Completed</option>
                    <option>Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    // โค้ดเก่า
    // <div className="container mx-auto p-4 bg-white shadow-md rounded-md">
    //   <div>
    //     <table className="w-full">
    //       <thead>
    //         <tr className="bg-gray-100">
    //           <th>ลำดับ</th>
    //           {/* <th>ที่อยู่</th> */}
    //           <th>ผู้ใช้งาน</th>
    //           <th>วันที่</th>
    //           <th>สินค้า</th>
    //           <th>รวม</th>
    //           <th>สถานะ</th>
    //           <th>จัดการ</th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         {orders?.map((item, index) => {
    //           //   console.log(item);
    //           return (
    //             <tr key={index} className="border">
    //               <td className="text-center">{index + 1}</td>
    //               <td>
    //                 <p>{item.orderedBy.email}</p>
    //                 <p>{item.orderedBy.address}</p>
    //               </td>
    //               <td>{dateFormat(item.createdAt)}</td>
    //               <td className="px-2 py-4">
    //                 {item.products.map((product, index) => (
    //                   <li key={index}>
    //                     {product.product.title}{" "}
    //                     <span className="text-sm">
    //                       {product.count} x {numberFormat(product.price)}
    //                     </span>
    //                   </li>
    //                 ))}
    //               </td>
    //               <td>{numberFormat(item.cartTotal)} </td>

    //               {/* สถานะ */}
    //               <td>
    //                 <span
    //                   className={`${getStatusColor(
    //                     item.orderStatus
    //                   )} px-2 py-1 rounded-full`}
    //                 >
    //                   {item.orderStatus}
    //                 </span>
    //               </td>

    //               {/* เปลี่ยนสถานะ */}
    //               <td>
    //                 <select
    //                   value={item.orderStatus}
    //                   onChange={(e) =>
    //                     handleChangeOrderStatus(token, item.id, e.target.value)
    //                   }
    //                 >
    //                   <option>Not Process</option>
    //                   <option>Processing</option>
    //                   <option>Completed</option>
    //                   <option>Cancelled</option>
    //                 </select>
    //               </td>
    //             </tr>
    //           );
    //         })}
    //       </tbody>
    //     </table>
    //   </div>
    // </div>
  );
};

export default TableOrders;
