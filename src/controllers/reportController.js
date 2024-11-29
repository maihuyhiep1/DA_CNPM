const { Report, Post, User } = require('../models'); // Import models (adjust paths if necessary)

const reportController = {
    // Tạo báo cáo
    async createReport(req, res) {
        try {
            const { post_id, reporterId, reason } = req.body;

            // Kiểm tra xem post_id có tồn tại trong bảng posts hay không
            const post = await Post.findByPk(post_id);
            if (!post) {
                return res.status(404).json({
                    success: false,
                    message: 'Post not found'
                });
            }

            // Kiểm tra xem người báo cáo (reporterId) có tồn tại không
            const user = await User.findByPk(reporterId);
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'Reporter not found'
                });
            }

            // Nếu post và reporter tồn tại, tạo báo cáo
            const newReport = await Report.create({
                post_id,
                reporterId,
                reason,
                status: 'pending',  // mặc định trạng thái là 'pending'
            });

            res.status(201).json({
                success: true,
                message: 'Report created successfully',
                data: newReport
            });
        } catch (error) {
            console.error('Error creating report:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    },

    // Lấy tất cả báo cáo
    async getAllReports(req, res) {
        try {
            const reports = await Report.findAll();
            if (!reports || reports.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'No reports found'
                });
            }
            res.status(200).json({
                success: true,
                data: reports
            });
        } catch (error) {
            console.error('Error fetching reports:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    },

    // Lấy báo cáo theo ID
    async getReportById(req, res) {
        try {
            const reportId = req.params.id;
            const report = await Report.findByPk(reportId);

            if (!report) {
                return res.status(404).json({
                    success: false,
                    message: 'Report not found'
                });
            }

            res.status(200).json({
                success: true,
                data: report
            });
        } catch (error) {
            console.error('Error fetching report:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    },

    // Cập nhật báo cáo (ví dụ: thay đổi trạng thái hoặc ghi chú)
    async updateReport(req, res) {
        try {
            const reportId = req.params.id;
            const { status, resolutionNotes, resolvedBy } = req.body;

            // Kiểm tra xem báo cáo có tồn tại không
            const report = await Report.findByPk(reportId);
            if (!report) {
                return res.status(404).json({
                    success: false,
                    message: 'Report not found'
                });
            }

            // Kiểm tra nếu trạng thái mới hợp lệ
            const validStatuses = ['pending', 'resolved', 'rejected'];
            if (!validStatuses.includes(status)) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid status value'
                });
            }

            // Cập nhật báo cáo
            const updatedReport = await report.update({
                status,
                resolutionNotes,
                resolvedBy,
            });

            res.status(200).json({
                success: true,
                message: 'Report updated successfully',
                data: updatedReport
            });
        } catch (error) {
            console.error('Error updating report:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    },

    async getByStatus(req, res) {
        try {
            const { status } = req.query;

            if (!status) {
                return res.status(400).json({
                    success: false,
                    message: "Status is required"
                });
            }

            const reports = await Report.findAll({
                where: { status },
                include: [
                    { model: Post, as: "post", attributes: ["title"] },
                    { model: User, as: "reporter", attributes: ["name", "email"] },
                ],
            });

            return res.status(200).json({
                success: true,
                data: reports
            });
        } catch (error) {
            console.error("Error fetching reports by status:", error);
            return res.status(500).json({
                success: false,
                message: "Server error"
            });
        }
    },

    // Xoá báo cáo
    async deleteReport(req, res) {
        try {
            const reportId = req.params.id;

            // Kiểm tra xem báo cáo có tồn tại không
            const report = await Report.findByPk(reportId);
            if (!report) {
                return res.status(404).json({
                    success: false,
                    message: 'Report not found'
                });
            }

            // Xoá báo cáo
            await report.destroy();

            res.status(200).json({
                success: true,
                message: 'Report deleted successfully'
            });
        } catch (error) {
            console.error('Error deleting report:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    }
};

module.exports = reportController;
