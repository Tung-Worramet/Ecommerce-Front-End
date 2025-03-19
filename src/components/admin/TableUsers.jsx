import React, { useState, useEffect } from "react";
import { changeUserRole, getListAllUsers } from "../../api/admin";
import useEcomStore from "../../store/ecom-store";
import { changeUserStatus } from "../../api/admin";
import { toast } from "react-toastify";

const TableUsers = () => {
  const token = useEcomStore((state) => state.token);
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10); // ✅ จำนวนแถวต่อหน้า (เริ่มต้นที่ 20)

  // ✅ คำนวณหน้าปัจจุบัน
  const totalPages = Math.ceil(users.length / rowsPerPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = users.slice(indexOfFirstRow, indexOfLastRow);

  useEffect(() => {
    handleGetUsers(token);
  }, []);

  const handleGetUsers = (token) => {
    getListAllUsers(token)
      .then((res) => {
        // console.log(res);
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChangeUserStatus = (userId, userStatus) => {
    // console.log(userId, userStatus);
    const value = {
      id: userId,
      enabled: !userStatus,
    };

    changeUserStatus(token, value)
      .then((res) => {
        console.log(res);
        handleGetUsers(token);
        toast.success("Update Status Success");
      })
      .catch((err) => console.log(err));
  };

  const handleChangeUserRole = (userId, userRole) => {
    // console.log(userId, userStatus);
    const value = {
      id: userId,
      role: userRole,
    };

    changeUserRole(token, value)
      .then((res) => {
        console.log(res);
        handleGetUsers(token);
        toast.success("Update Role Success");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container mx-auto p-4 bg-white shadow-md rounded-md mt-3">
      <h1 className="text-2xl font-bold mb-4">📋 รายชื่อผู้ใช้งาน</h1>

      {/* ✅ Dropdown เลือกจำนวนแถวที่แสดง */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <label className="mr-2 font-bold">แสดงแถว:</label>
          <select
            className="border px-2 py-1 rounded-md"
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(Number(e.target.value));
              setCurrentPage(1); // รีเซ็ตไปหน้าแรก
            }}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
      </div>

      {/* ✅ Table Users */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="py-2 px-4 border">ลำดับ</th>
              <th className="py-2 px-4 border text-left">Email</th>
              <th className="py-2 px-4 border">สิทธิ์</th>
              <th className="py-2 px-4 border">สถานะ</th>
              <th className="py-2 px-4 border">จัดการ</th>
            </tr>
          </thead>

          <tbody>
            {currentRows.map((item, index) => (
              <tr
                key={index}
                className="border hover:bg-gray-100 transition-all"
              >
                <td className="py-2 px-4 text-center">
                  {indexOfFirstRow + index + 1}
                </td>
                <td className="py-2 px-4">{item.email}</td>
                <td className="py-2 px-4 text-center">
                  <select
                    onChange={(e) =>
                      handleChangeUserRole(item.id, e.target.value)
                    }
                    value={item.role}
                    className="border rounded-md p-1 bg-white shadow-sm hover:bg-gray-50 transition-all"
                  >
                    <option value="user">👤 User</option>
                    <option value="admin">🛠 Admin</option>
                  </select>
                </td>
                <td
                  className={`py-2 px-4 text-center font-bold ${
                    item.enabled ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {item.enabled ? "🟢 Active" : "🔴 Inactive"}
                </td>
                <td className="py-2 px-4 text-center">
                  <button
                    className={`px-3 py-1 rounded-md shadow-md text-white transition-all ${
                      item.enabled
                        ? "bg-yellow-400 hover:bg-yellow-500"
                        : "bg-green-500 hover:bg-green-600"
                    }`}
                    onClick={() =>
                      handleChangeUserStatus(item.id, item.enabled)
                    }
                  >
                    {item.enabled ? "⛔ Disable" : "✅ Enable"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ✅ Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-4 space-x-2">
          <button
            className={`px-3 py-1 rounded-md shadow-md ${
              currentPage === 1
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-700 text-white"
            }`}
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            ◀ Prev
          </button>

          <span className="font-bold text-lg">
            หน้า {currentPage} / {totalPages}
          </span>

          <button
            className={`px-3 py-1 rounded-md shadow-md ${
              currentPage === totalPages
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-700 text-white"
            }`}
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next ▶
          </button>
        </div>
      )}
    </div>

    // <div className="container mx-auto p-4 bg-white shadow-md rounded-md">
    //   <h1 className="text-xl font-bold mb-4">📋 รายชื่อผู้ใช้งาน</h1>

    //   <div className="overflow-x-auto">
    //     <table className="w-full border-collapse border border-gray-200">
    //       {/* 🟢 Table Header */}
    //       <thead>
    //         <tr className="bg-gray-200 text-gray-700">
    //           <th className="py-2 px-4 border">ลำดับ</th>
    //           <th className="py-2 px-4 border text-left">Email</th>
    //           <th className="py-2 px-4 border">สิทธิ์</th>
    //           <th className="py-2 px-4 border">สถานะ</th>
    //           <th className="py-2 px-4 border">จัดการ</th>
    //         </tr>
    //       </thead>

    //       {/* 🟠 Table Body */}
    //       <tbody>
    //         {users?.map((item, index) => (
    //           <tr
    //             key={index}
    //             className="border hover:bg-gray-100 transition-all"
    //           >
    //             <td className="py-2 px-4 text-center">{index + 1}</td>
    //             <td className="py-2 px-4">{item.email}</td>
    //             <td className="py-2 px-4 text-center">
    //               <select
    //                 onChange={(e) =>
    //                   handleChangeUserRole(item.id, e.target.value)
    //                 }
    //                 value={item.role}
    //                 className="border rounded-md p-1 bg-white shadow-sm hover:bg-gray-50 transition-all"
    //               >
    //                 <option value="user">👤 User</option>
    //                 <option value="admin">🛠 Admin</option>
    //               </select>
    //             </td>
    //             <td
    //               className={`py-2 px-4 text-center font-bold ${
    //                 item.enabled ? "text-green-500" : "text-red-500"
    //               }`}
    //             >
    //               {item.enabled ? "🟢 Active" : "🔴 Inactive"}
    //             </td>
    //             <td className="py-2 px-4 text-center">
    //               <button
    //                 className={`px-3 py-1 rounded-md shadow-md text-white transition-all ${
    //                   item.enabled
    //                     ? "bg-yellow-400 hover:bg-yellow-500"
    //                     : "bg-green-500 hover:bg-green-600"
    //                 }`}
    //                 onClick={() =>
    //                   handleChangeUserStatus(item.id, item.enabled)
    //                 }
    //               >
    //                 {item.enabled ? "⛔ Disable" : "✅ Enable"}
    //               </button>
    //             </td>
    //           </tr>
    //         ))}
    //       </tbody>
    //     </table>
    //   </div>
    // </div>

    // โค้ดเก่า
    // <div className="container mx-auto p-4 bg-white shadow-md rounded-md">
    //   <table className="w-full">
    //     <thead>
    //       <tr>
    //         <th>ลำดับ</th>
    //         <th>Email</th>
    //         {/* <th>วันที่แก้ไขล่าสุด</th> */}
    //         <th>สิทธิ์</th>
    //         <th>สถานะ</th>
    //         <th>จัดการ</th>
    //       </tr>
    //     </thead>

    //     <tbody>
    //       {users?.map((item, index) => (
    //         <tr key={index}>
    //           <td>{index + 1}</td>
    //           <td>{item.email}</td>
    //           {/* <td>Germany</td> */}
    //           <td>
    //             <select
    //               onChange={(e) =>
    //                 handleChangeUserRole(item.id, e.target.value)
    //               }
    //               value={item.role}
    //             >
    //               <option>user</option>
    //               <option>admin</option>
    //             </select>
    //           </td>
    //           <td>{item.enabled ? "Active" : "Inactive"}</td>
    //           <td>
    //             <button
    //               className="bg-yellow-400 p-1 rounded-md shadow-md text-white"
    //               onClick={() => handleChangeUserStatus(item.id, item.enabled)}
    //             >
    //               {item.enabled ? "Disable" : "Enable"}
    //             </button>
    //           </td>
    //         </tr>
    //       ))}
    //     </tbody>
    //   </table>
    // </div>
  );
};

export default TableUsers;
