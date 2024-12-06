const WebSocket = require('ws');
const PostNotification = require('../models/index').PostNotification;

const userConnections = new Map(); 

function initWebSocketServer(server) {
    const wss = new WebSocket.Server({ server });

    wss.on('connection', (socket) => {
        console.log('New WebSocket connection.');
        let userId;
        socket.on('message', (message) => {
            try {
                const data = JSON.parse(message);
                console.log(data);
                if (data.type === 'register' && data.userId) {
                    userId = data.userId;
                    userConnections.set(userId, socket);
                    console.log(`User ${userId} connected.`);
                }
            } catch (err) {
                console.error('Invalid message format:', message);
            }
        });
        socket.on('close', () => {
            console.log(`User ${userId} disconnected.`);
            if (userId) userConnections.delete(userId);
        });
        socket.on('error', (err) => {
            console.error('Socket error:', err.message);
        });
    });

    console.log('WebSocket server initialized.');
}
async function sendNotificationToUsers(post_id, notification) {
    try {
        // Lấy tất cả postId và userId từ bảng PostNotification
        const postNotifications = await PostNotification.findAll({
            where: {post_id : post_id},
            attributes: ['post_id', 'user_id'], // Điều chỉnh theo mô hình cơ sở dữ liệu của bạn
        });

        // Tạo một Map để nhóm các userId theo post_id
        const userGroups = new Map();
        postNotifications.forEach(({ post_id, user_id }) => {
            if (!userGroups.has(post_id)) {
                userGroups.set(post_id, []);
            }
            userGroups.get(post_id).push(user_id);
        });

        // Gửi thông báo tới tất cả các user_id trong danh sách
        userGroups.forEach((user_ids, post_id) => {
            user_ids.forEach((user_id) => {
                const socket = userConnections.get(user_id);
                if (socket && socket.readyState === WebSocket.OPEN) {
                    socket.send(JSON.stringify({ type: 'notification', post_id, data: notification }));
                    console.log(`Notification sent to user_id: ${user_id} for post_id: ${post_id}`);
                } else {
                    console.log(`User ${user_id} is not connected.`);
                }
            });
        });
    } catch (error) {
        console.error('Error sending notifications:', error);
    }
}


module.exports = {
    initWebSocketServer,
    sendNotificationToUsers,
};
