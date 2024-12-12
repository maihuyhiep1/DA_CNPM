import React, { useState, useEffect } from "react";
import "./users.css";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { toast } from 'react-toastify';

const UserManagementPage = () => {
    const [users, setUsers] = useState([]);
    const location = useLocation();
    const params = location.state;
    console.log(params)
    const [admin, setAdmin] = useState(params || false);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const [userResponse, modResponse] = await Promise.all([
                    axios.get(`http://localhost:8386/api/admin/users`, {
                        withCredentials: true,
                    }),
                    admin ? axios.get(`http://localhost:8386/api/admin/moderators`, {
                        withCredentials: true,
                    }) : Promise.resolve(null),
                ]);

                console.log("LẤY USERS:", userResponse.data);
                if (admin) console.log("LẤY MODS:", modResponse.data);

                // Combine both responses into one array
                const combinedData = [
                    ...userResponse.data.users.map((user) => ({ ...user, role: "user" })),
                    ...(admin ? modResponse.data.moderators.map((mod) => ({ ...mod, role: "mod" })) : []),
                ];

                setUsers(combinedData);
            } catch (err) {
                console.error("Error fetching data:", err.message);
            }
        };

        fetchData();
    }, []);

    const handleRoleChange = async (id) => {
        setUsers((prevUsers) =>
            prevUsers.map((user) =>
                user.id === id
                    ? { ...user, role: user.role === "user" ? "mod" : "user" }
                    : user
            )
        );

        const updatedUser = users.find((user) => user.id === id);
        const response = await axios.put(
            `http://localhost:8386/api/admin/${updatedUser.role === "user" ? "assign-moderator" : "remove-moderator"}/${id}`,
            {},
            { withCredentials: true }
        );
        console.log(response)
        toast("Role đã được thay đổi.");
    };

    const handleDelete = async (id) => {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
        try {
            await axios.delete(`http://localhost:8386/api/admin/delete-user/${id}`, {
                withCredentials: true,
            });
            toast("Tài khoản đã bị xoá.");
        } catch (err) {
            console.error("Error deleting user:", err.message);
        }
    };

    return (
        <div className="user-management">
            <h1>Quản Lý Người Dùng</h1>
            <table className="user-table">
                <thead>
                    <tr>
                        <th>Tên</th>
                        <th>Ngày Tạo Tài Khoản</th>
                        {admin && <th>Role</th>}
                        {admin && <th>Thay Đổi Role</th>}
                        <th>Xoá Tài Khoản</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length > 0 ? (
                        users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.createdAt}</td>
                                {admin && <td>{user.role === "mod" ? "Quản trị viên" : "Người dùng"}</td>}
                                {admin && <td>
                                    <button
                                        className="role-button"
                                        onClick={() => handleRoleChange(user.id)}
                                    >
                                        {user.role === "user" ? "Set to Mod" : "Set to User"}
                                    </button>
                                </td>}
                                <td>
                                    <button
                                        className="delete-button"
                                        onClick={() => handleDelete(user.id)}
                                    >
                                        Xoá
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">No users found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default UserManagementPage;
