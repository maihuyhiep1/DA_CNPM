import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import './detailPage.css'; // Import file CSS
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { AuthContext } from "../../context/authContext";

const ReportDetailPage = () => {
    const { postId } = useParams();
    const navigate = useNavigate();
    const { currentUser } = useContext(AuthContext);
    const [reportDetails, setReportDetails] = useState(null);

    useEffect(() => {
        // Lấy chi tiết báo cáo theo postId
        fetch(`http://localhost:8386/api/reports/post/${postId}`)
            .then((res) => res.json())
            .then((data) => {
                setReportDetails(data.data); // Lưu thông tin báo cáo
            })
            .catch((err) => console.error(err));
    }, [postId]);

    if (!reportDetails) return <div>Loading...</div>;

    // Hàm xử lý khi nhấn tick hoặc cross
    const handleResolution = async (id, status) => {
        console.log(`Report ID: ${postId} has been marked as ${status}`);
        console.log(currentUser);
        if (status === "resolved") {
            try {
                const response = await axios.delete(
                    `http://localhost:8386/api/admin/posts/${postId}`,
                    { withCredentials: true }
                );
                console.log(response);
                alert(response.data.message);
                // setOpenDialog(false)
            } catch (error) {
                console.error("Lỗi khi xoá bài viết:", error.message);
                alert("Có lỗi xảy ra khi xoá bài viết.");
                setOpenDialog(false)
            }
        } else {
            try {
                for (let i = 0; i < reportDetails.length; i++) {
                    const id = reportDetails[i].id;

                    const response = await axios.delete(
                        `http://localhost:8386/api/reports/${id}`,
                        { withCredentials: true }
                    );

                    console.log(`Report with ID ${id} deleted:`, response.data.message);
                }

                alert("Tất cả các báo cáo đã được xóa thành công!");
            } catch (error) {
                console.error("Lỗi khi xoá báo cáo:", error.message);
                alert("Có lỗi xảy ra khi xóa một số báo cáo.");
            }
        }
        navigate("/admin");
    };

    return (
        <div className="container">
            <h1>Report Details for Post</h1>
            <div>
                <p><strong>Post Title:</strong> {reportDetails[0].post.title}</p>
                <p><strong>Author:</strong> {reportDetails[0].post.author.name}</p>
            </div>

            <td className="border px-6 py-4 text-center">
                <a
                    href={`/post/${postId}`}
                    className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition-colors"
                >
                    View Post
                </a>
            </td>
            <div className="mt-4">
                <h2>Report List</h2>
                <table className="table-auto">
                    <thead>
                        <tr>
                            <th>Reporter</th>
                            <th>Reason</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reportDetails.map((report) => (
                            <tr key={report.id}>
                                <td className="reporter-name">
                                    <img
                                        src={report.reporter.avatar}
                                        alt={report.reporter.name}
                                    />
                                    {report.reporter.name}
                                </td>
                                <td>{report.reason}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Nút tick và cross ở góc dưới phải */}
            <div className="action-buttons">
                <button
                    onClick={() => handleResolution("all", "resolved")}
                    className="bg-green-500"
                >
                    ✓
                </button>
                <button
                    onClick={() => handleResolution("all", "dismissed")}
                    className="bg-red-500"
                >
                    ✗
                </button>
            </div>
        </div>
    );
};

export default ReportDetailPage;
