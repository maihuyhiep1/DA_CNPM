import React, { useState } from "react";
import "./posts.css";
import { useNavigate } from "react-router-dom";

const PostManagementPage = () => {
    const navigate = useNavigate();
    // Dữ liệu giả lập cho danh sách bài viết
    const [posts, setPosts] = useState([
        {
            id: 1,
            author: "John Doe",
            createdAt: "2024-01-10",
            title: "Post 1 Title",
            reports: 3,
            likes: 25,
        },
        {
            id: 2,
            author: "Jane Smith",
            createdAt: "2024-02-15",
            title: "Post 2 Title",
            reports: 1,
            likes: 40,
        },
        {
            id: 3,
            author: "Emily Johnson",
            createdAt: "2024-03-20",
            title: "Post 3 Title",
            reports: 5,
            likes: 15,
        },
    ]);

    const handleDeletePost = (id) => {
        setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
        alert("Bài viết đã bị xoá.");
    };

    const handleViewPost = (id) => {
        alert(`Đang xem bài viết có ID: ${id}`);
        // Thêm logic chuyển hướng đến trang chi tiết post tại đây
    };

    return (
        <div className="post-management">
            <h1>Quản Lý Bài Viết</h1>
            <table className="post-table">
                <thead>
                    <tr>
                        <th>Tác Giả</th>
                        <th>Ngày Đăng</th>
                        <th>Tiêu Đề</th>
                        <th>Số Report</th>
                        <th>Số Like</th>
                        <th>Xoá</th>
                        <th>Xem Post</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map((post) => (
                        <tr key={post.id}>
                            <td>{post.author}</td>
                            <td>{post.createdAt}</td>
                            <td>{post.title}</td>
                            <td>{post.reports}</td>
                            <td>{post.likes}</td>
                            <td>
                                <button
                                    className="delete-button"
                                    onClick={() => handleDeletePost(post.id)}
                                >
                                    Xoá
                                </button>
                            </td>
                            <td>
                                <button
                                    className="view-button"
                                    onClick={() => navigate(`/post/${post.id}`)}
                                >
                                    Xem Post
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PostManagementPage;
