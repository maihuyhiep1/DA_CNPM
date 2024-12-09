import React, { useState, useEffect } from "react";
import "./posts.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PostManagementPage = () => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPostsAndReports = async () => {
            try {
                // Fetch posts
                const postResponse = await axios.get(`http://localhost:8386/api/posts`, {
                    withCredentials: true,
                });

                console.log("LẤY POSTS:", postResponse.data);

                // Fetch reports
                const reportResponse = await axios.get(`http://localhost:8386/api/reports/`, {
                    withCredentials: true,
                });

                console.log("LẤY REPORTS:", reportResponse.data.data);

                // Count reports by post_id
                const reportCounts = reportResponse.data.data.reduce((acc, report) => {
                    acc[report.post.post_id] = (acc[report.post.post_id] || 0) + 1;
                    return acc;
                }, {});

                console.log("COUNTED REPORTS:", reportCounts);

                // Map posts to include report counts
                const postsWithReports = postResponse.data.map((post) => ({
                    ...post,
                    reports: reportCounts[post.post_id] || 0, // Add report count or default to 0
                }));

                setPosts(postsWithReports);
            } catch (err) {
                console.error("Error fetching data:", err.message);
            }
        };

        fetchPostsAndReports();
    }, []);

    const handleDeletePost = async (postId) => {
        try {
            const response = await axios.delete(
                `http://localhost:8386/api/admin/posts/${postId}`,
                { withCredentials: true }
            );
            console.log(response);
            alert(response.data.message);
            setPosts((prevPosts) => prevPosts.filter((post) => post.post_id !== postId));
        } catch (error) {
            console.error("Lỗi khi xoá bài viết:", error.message);
            alert("Có lỗi xảy ra khi xoá bài viết.");
        }
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
                    {posts.length > 0 ? (
                        posts.map((post) => (
                            <tr key={post.id}>
                                <td>{post.author?.name || "Unknown Author"}</td>
                                <td>{post.createdAt}</td>
                                <td>{post.title}</td>
                                <td>{post.reports}</td>
                                <td>{post.like_count}</td>
                                <td>
                                    <button
                                        className="delete-button"
                                        onClick={() => handleDeletePost(post.post_id)}
                                    >
                                        Xoá
                                    </button>
                                </td>
                                <td>
                                    <button
                                        className="view-button"
                                        onClick={() => navigate(`/post/${post.post_id}`)}
                                    >
                                        Xem Post
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7">No posts available.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default PostManagementPage;
