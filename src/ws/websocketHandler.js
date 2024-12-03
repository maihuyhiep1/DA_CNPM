const WebSocket = require('ws');

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

function sendNotificationToUser(userId, notification) {
    const socket = userConnections.get(userId);
    if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({ type: 'notification', data: notification }));
        console.log(`Notification sent to userId: ${userId}`);
    } else {
        console.log(`User ${userId} is not connected.`);
    }
}

module.exports = {
    initWebSocketServer,
    sendNotificationToUser,
};
