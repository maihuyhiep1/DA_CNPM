import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './detailPage.css'; // Import file CSS

const ReportDetailPage = () => {
    const { postId } = useParams();
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
    const handleResolution = (id, status) => {
        console.log(`Report ID: ${id} has been marked as ${status}`);
        // Bạn có thể thực hiện gọi API để thay đổi trạng thái của báo cáo ở đây
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
                                <td>
                                    {/* Không cần status nữa */}
                                </td>
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
