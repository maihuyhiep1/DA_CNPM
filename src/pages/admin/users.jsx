import React, { useState } from "react";
import "./users.css";

const UserManagementPage = () => {
  // Dữ liệu giả lập cho danh sách người dùng
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", createdAt: "2023-01-15", role: "user" },
    { id: 2, name: "Jane Smith", createdAt: "2023-03-10", role: "mod" },
    { id: 3, name: "Emily Johnson", createdAt: "2023-05-22", role: "mod" },
  ]);

  const handleRoleChange = (id) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id
          ? { ...user, role: user.role === "user" ? "mod" : "user" }
          : user
      )
    );
    alert("Role đã được thay đổi.");
  };

  const handleDelete = (id) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    alert("Tài khoản đã bị xoá.");
  };

  return (
    <div className="user-management">
      <h1>Quản Lý Người Dùng</h1>
      <table className="user-table">
        <thead>
          <tr>
            <th>Tên</th>
            <th>Ngày Tạo Tài Khoản</th>
            <th>Role</th>
            <th>Thay Đổi Role</th>
            <th>Xoá Tài Khoản</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.createdAt}</td>
              <td>{user.role}</td>
              <td>
                <button
                  className="role-button"
                  onClick={() => handleRoleChange(user.id)}
                >
                  {user.role === "user" ? "Set to Mod" : "Set to User"}
                </button>
              </td>
              <td>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(user.id)}
                >
                  Xoá
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagementPage;
