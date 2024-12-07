const { Report, Post, User, Notification } = require('../models'); // Import models (adjust paths if necessary)

const noticesController = {
    async getAllNotificationsByUser(req, res) {
        const { userId } = req.params;

        try {
            const notifications = await Notification.findAll({
                where: { user_id: userId },
                order: [['createdAt', 'DESC']], // Sắp xếp theo thời gian mới nhất
            });

            return res.status(200).json({
                success: true,
                data : notifications
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                success: false,
                message: 'Lỗi tìm thông báo' + error
            });
        }
    },
    async deleteNotificationById(req, res) {
        const { id } = req.params;

        try {
            const deleted = await Notification.destroy({
                where: { id },
            });

            if (!deleted) {
                return res.status(404).json({
                    success: false,
                    message: 'Không tìm thấy thông báo'
                });
            }

            return res.status(200).json({
                success: true,
                message: 'Xoá thông báo thành công'
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                success: false,
                message: 'Lỗi xoá thông báo' + error
            });
        }
    }
};

module.exports = noticesController; // Export the controller