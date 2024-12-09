import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import "./admin.css";

const AdminDashboard = () => {
    const [postCount, setPostCount] = useState(0);
    const [accountCount, setAccountCount] = useState(0);
    const [deletedPostsCount, setDeletedPostsCount] = useState(0);
    const navigate = useNavigate();

    const [notifications, setNotifications] = useState([]); // Danh sách thông báo đã gửi
    const [currentNotification, setCurrentNotification] = useState([]); // Thông báo hiện tại
    const [showNotifications, setShowNotifications] = useState(false); // Hiển thị danh sách thông báo
    const [onlyForMods, setOnlyForMods] = useState(false);

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

        const fetchNotices = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8386/api/admin/server-notices`,
                    { withCredentials: true }
                );
                console.log("LẤY SỐ LIỆU:", response.data);
                setNotifications(response.data.data);
                //   setAllPosts(response.data); // Store API posts
            } catch (err) {
                console.log(err.message); // Handle any errors
            }
        };

        const fetchReports = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:8386/api/reports/",
                    { withCredentials: true }
                )
                console.log(response);

                const groupedReports = Object.values(
                    response.data.data.reduce((acc, curr) => {
                        if (!acc[curr.post_id]) {
                            acc[curr.post_id] = {
                                id: curr.id,
                                post_id: curr.post.post_id,
                                title: curr.post.title,
                                author: curr.post.author.name,
                                status: curr.status,
                                reportCount: 0,
                                post: curr.post,
                            };
                        }
                        acc[curr.post_id].reportCount++;
                        return acc;
                    }, {})
                );
                console.log(groupedReports);
                setDeletedPostsCount(groupedReports.length);
            } catch (error) {
                console.log(error.message)
            }
        }
        fetchReports();
        fetchStatics();
        fetchNotices();
    }, []);
    const handleSendNotification = () => {
        if (currentNotification.trim()) {
            setNotifications((prev) => [
                ...prev,
                {
                    content: currentNotification, // Use the input value directly
                    onlyMod: onlyForMods, // Include the toggle state
                },
            ]); // Add the notification to the list

            setCurrentNotification(""); // Clear the notification input
            setOnlyForMods(false); // Reset the toggle
            alert(
                `Thông báo đã được gửi ${onlyForMods ? "đến các mod" : "đến toàn hệ thống"
                }.`
            );
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
                    onClick={() => handleNavigation("/moderator")}
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
                <div className="toggle-section">
                    <input
                        type="checkbox"
                        id="mod-toggle"
                        checked={onlyForMods}
                        onChange={(e) => setOnlyForMods(e.target.checked)}
                    />
                    <label htmlFor="mod-toggle">Chỉ gửi thông báo cho mod</label>
                </div>
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
                                    <li key={index}>
                                        {note.content} {note.onlyMod && "(Chỉ gửi cho mod)"}
                                    </li>
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
