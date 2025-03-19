import React, { useEffect, useState, useRef } from "react";
import useEcomStore from "../../store/ecom-store";
import { getOrdersAdmin } from "../../api/admin";
import { numberFormat } from "../../utils/number";
import { dateFormat } from "../../utils/dateformat";
import { Line } from "react-chartjs-2";
import { Chart } from "chart.js/auto";
import { Users, ShoppingCart, DollarSign, Package } from "lucide-react";

const FormDashboard = () => {
  const token = useEcomStore((state) => state.token);
  const [orders, setOrders] = useState([]);
  const [totalSales, setTotalSales] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const chartRef = useRef(null); // ใช้เก็บอ้างอิงถึง chart instance

  useEffect(() => {
    hdlgetOrders(token);
  }, [token]); // เพิ่ม dependency list ป้องกัน re-fetch ทุก render

  const hdlgetOrders = async (token) => {
    try {
      const res = await getOrdersAdmin(token);
      setOrders(res.data);

      // คำนวณสถิติ
      let sales = 0;
      let customers = new Set();
      res.data.forEach((order) => {
        sales += order.cartTotal;
        customers.add(order.orderedBy.email);
      });

      setTotalSales(sales);
      setTotalOrders(res.data.length);
      setTotalCustomers(customers.size);
    } catch (err) {
      console.error("Error fetching orders", err);
    }
  };

  // ✅ จัดกลุ่มยอดขายตามวัน (ลบเวลาออก)
  const salesByDate = orders.reduce((acc, order) => {
    const date = dateFormat(order.createdAt).split(" ")[0]; // ใช้ YYYY-MM-DD เท่านั้น
    if (!acc[date]) {
      acc[date] = 0;
    }
    acc[date] += order.cartTotal;
    return acc;
  }, {});

  // ✅ แปลงข้อมูลให้ใช้กับ Chart.js
  const labels = Object.keys(salesByDate); // ดึงเฉพาะวันที่
  const dataValues = Object.values(salesByDate); // ดึงยอดรวมของแต่ละวัน

  // ข้อมูลสำหรับกราฟ
  const chartData = {
    labels,
    datasets: [
      {
        label: "ยอดขายรายวัน",
        data: dataValues,
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderWidth: 2,
        tension: 0.3,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  // Function กำหนดสีของสถานะคำสั่งซื้อ
  const getStatusClass = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-500 text-white";
      case "Processing":
        return "bg-blue-500 text-white";
      case "Cancelled":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-300 text-gray-700";
    }
  };

  // Component สำหรับแสดงการ์ดสถิติ
  const StatCard = ({ icon, label, value, bgColor }) => (
    <div
      className={`${bgColor} text-white p-6 rounded-lg shadow-md flex items-center gap-4`}
    >
      {icon}
      <div>
        <p className="text-lg">{label}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">📊 Dashboard</h1>

      {/*  Cards สถิติหลัก */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          icon={<DollarSign size={36} />}
          label="ยอดขายทั้งหมด"
          value={numberFormat(totalSales)}
          bgColor="bg-blue-500"
        />
        <StatCard
          icon={<ShoppingCart size={36} />}
          label="คำสั่งซื้อทั้งหมด"
          value={totalOrders}
          bgColor="bg-green-500"
        />
        <StatCard
          icon={<Users size={36} />}
          label="ลูกค้าทั้งหมด"
          value={totalCustomers}
          bgColor="bg-yellow-500"
        />
        <StatCard
          icon={<Package size={36} />}
          label="สินค้าทั้งหมด"
          value="50"
          bgColor="bg-red-500"
        />
      </div>

      {/*  กราฟยอดขาย */}
      <div className="bg-white p-6 shadow-md rounded-lg mt-8">
        <h2 className="text-xl font-bold mb-4">📈 แนวโน้มยอดขาย</h2>
        <div className="h-80">
          <Line ref={chartRef} data={chartData} options={chartOptions} />
        </div>
      </div>

      {/*  ตารางคำสั่งซื้อล่าสุด */}
      <div className="bg-white p-6 shadow-md rounded-lg mt-8">
        <h2 className="text-xl font-bold mb-4">📋 คำสั่งซื้อล่าสุด</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">ลำดับ</th>
              <th className="p-2 border">ผู้ใช้</th>
              <th className="p-2 border">วันที่</th>
              <th className="p-2 border">ยอดรวม</th>
              <th className="p-2 border">สถานะ</th>
            </tr>
          </thead>
          <tbody>
            {orders.slice(0, 5).map((order, index) => (
              <tr key={index} className="border text-center hover:bg-gray-100">
                <td className="p-2">{index + 1}</td>
                <td className="p-2">{order.orderedBy.email}</td>
                <td className="p-2">{dateFormat(order.createdAt)}</td>
                <td className="p-2">{numberFormat(order.cartTotal)}</td>
                <td className="p-2">
                  <span
                    className={`font-bold px-3 py-1 rounded-full ${getStatusClass(
                      order.orderStatus
                    )}`}
                  >
                    {order.orderStatus}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FormDashboard;
