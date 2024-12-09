import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import "./admin.css";

const AdminDashboard = () => {
    const [postCount, setPostCount] = useState(0);
    const [accountCount, setAccountCount] = useState(0);
    const deletedPostsCount = 10; // Số lượng bài viết bị báo cáo
    const navigate = useNavigate();

    const [notifications, setNotifications] = useState([]); // Danh sách thông báo đã gửi
    const [currentNotification, setCurrentNotification] = useState(""); // Thông báo hiện tại
    const [showNotifications, setShowNotifications] = useState(false); // Hiển thị danh sách thông báo

    useEffect(() => {
        const fetchStatics = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8386/api/admin/statistics`,
                    { withCredentials: true }
                );
                console.log("LẤY SỐ LIỆU:", response.data);
                setPostCount(response.data.totalPosts);
                setAccountCount(response.data.totalUsers);
                //   setAllPosts(response.data); // Store API posts
            } catch (err) {
                console.log(err.message); // Handle any errors
            }
        };
        fetchStatics();
    }, []);

    const handleSendNotification = () => {
        if (currentNotification.trim()) {
            setNotifications((prev) => [...prev, currentNotification]); // Thêm thông báo vào danh sách
            setCurrentNotification(""); // Xóa nội dung thông báo
            alert("Thông báo đã được gửi đến toàn hệ thống.");
        } else {
            alert("Vui lòng nhập nội dung thông báo.");
        }
    };

    const handleNavigation = (path) => {
        navigate(path);
    };

    const toggleShowNotifications = () => {
        setShowNotifications((prev) => !prev);
    };

    return (
        <div className="admin-dashboard">
            <h1>Admin Dashboard</h1>

            <div className="stats">
                <div className="stat-item"
                    onClick={() => handleNavigation("/admin/posts")}
                    role="button">
                    <h2>{postCount}</h2>
                    <p>Bài đăng</p>
                </div>
                <div className="stat-item"
                    onClick={() => handleNavigation("/admin/users")}
                    role="button">
                    <h2>{accountCount}</h2>
                    <p>Tài khoản</p>
                </div>
                <div className="stat-item"
                    onClick={() => handleNavigation("/admin/deleted-posts")}
                    role="button">
                    <h2>{deletedPostsCount}</h2>
                    <p>Bài viết bị báo cáo</p>
                </div>
            </div>

            <div className="notification-section">
                <h3>Gửi Thông Báo</h3>
                <textarea
                    className="notification-input"
                    placeholder="Viết thông báo ở đây..."
                    value={currentNotification}
                    onChange={(e) => setCurrentNotification(e.target.value)}
                ></textarea>
                <button className="send-button" onClick={handleSendNotification}>
                    Gửi Thông Báo
                </button>
            </div>

            <div className="show-notifications-section">
                <button className="show-button" onClick={toggleShowNotifications}>
                    {showNotifications ? "Ẩn Thông Báo" : "Hiển Thị Tất Cả Thông Báo"}
                </button>
                {showNotifications && (
                    <div className="notification-list">
                        <h3>Danh Sách Thông Báo Đã Gửi</h3>
                        {notifications.length > 0 ? (
                            <ul>
                                {notifications.map((note, index) => (
                                    <li key={index}>{note}</li>
                                ))}
                            </ul>
                        ) : (
                            <p>Chưa có thông báo nào được gửi.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
