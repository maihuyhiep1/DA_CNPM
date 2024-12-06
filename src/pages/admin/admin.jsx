import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './admin.css'; 

const ReportsPage = () => {
    const [reports, setReports] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Gọi API
        fetch("http://localhost:8386/api/reports/")
            .then((res) => res.json())
            .then((data) => {
                // Nhóm báo cáo theo post_id
                const groupedReports = Object.values(
                    data.data.reduce((acc, curr) => {
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
                setReports(groupedReports);
            })
            .catch((err) => console.error(err));
    }, []);

    const handleReportClick = (postId) => {
        // Chuyển hướng tới trang chi tiết báo cáo
        navigate(`/admin/${postId}`);
    };

    return (
        <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Report List</h1>
            <table className="min-w-full bg-white border border-gray-300 shadow-lg rounded-lg">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="border px-6 py-3 text-left text-gray-700">STT</th>
                        <th className="border px-6 py-3 text-left text-gray-700">Post Title</th>
                        <th className="border px-6 py-3 text-left text-gray-700">Author</th>
                        <th className="border px-6 py-3 text-left text-gray-700">Status</th>
                        <th className="border px-6 py-3 text-center text-gray-700">Number of Reports</th>
                        <th className="border px-6 py-3 text-center text-gray-700">Post</th>
                    </tr>
                </thead>
                <tbody>
                    {reports.map((report, index) => (
                        <tr key={report.post_id} className="hover:bg-gray-50 transition-colors">
                            <td className="border px-6 py-4">{index + 1}</td>
                            <td
                                className="border px-6 py-4 text-blue-500 cursor-pointer hover:underline"
                                onClick={() => handleReportClick(report.post_id)}
                            >
                                {report.title}
                            </td>
                            <td className="border px-6 py-4">{report.author}</td>
                            <td className="border px-6 py-4">
                                <span
                                    className={`${
                                        report.status === "Resolved"
                                            ? "text-green-500"
                                            : "text-red-500"
                                    } font-semibold`}
                                >
                                    {report.status}
                                </span>
                            </td>
                            <td className="border px-6 py-4 text-center">{report.reportCount}</td>
                            <td className="border px-6 py-4 text-center">
                                <a
                                    href={`/post/${report.post_id}`}
                                    className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition-colors"
                                >
                                    View Post
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ReportsPage;
