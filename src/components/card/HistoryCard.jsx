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
        return "bg-blue-200";
      case "Completed":
        return "bg-green-200";
      case "Cancelled":
        return "bg-red-500";
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">ประวัติการสั่งซื้อ</h1>

      {/* คลุม */}
      <div className="space-y-4">
        {/* Card Loop Order */}
        {orders?.map((item, index) => {
          return (
            <div key={index} className="bg-gray-100 p-4 rounded-md shadow-md">
              {/* Header */}
              <div className="flex justify-between mb-2">
                {/* Left */}
                <div>
                  <p className="text-sm">Order Date</p>
                  <p className="font-bold">{dateFormat(item.updatedAt)}</p>
                </div>
                {/* Right */}
                <div>
                  <span
                    className={`${getStatusColor(
                      item.orderStatus
                    )} px-2 py-1 rounded-full`}
                  >
                    {item.orderStatus}
                  </span>
                </div>
              </div>

              {/* Table Loop Product */}
              <div>
                <table className="border w-full">
                  <thead>
                    <tr className="bg-gray-200">
                      <th>สินค้า</th>
                      <th>จำนวน</th>
                      <th>ราคา</th>
                      <th>รวม</th>
                    </tr>
                  </thead>
                  <tbody>
                    {item.products?.map((product, index) => {
                      //   console.log("product", product);
                      return (
                        <tr key={index}>
                          <td>{product.product.title}</td>
                          <td className="text-center">{product.count}</td>
                          <td className="text-center">
                            {numberFormat(product.price)}
                          </td>
                          <td className="text-center">
                            {numberFormat(product.price * product.count)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Total */}
              <div>
                <div className="text-right">
                  <p>ราคาสุทธิ</p>
                  <p>{numberFormat(item.cartTotal)}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HistoryCard;
