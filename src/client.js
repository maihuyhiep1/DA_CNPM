import { toast } from "react-toastify";

function connectWebSocket(userId) {
    const socket = new WebSocket('ws://localhost:8386'); // Thay bằng địa chỉ server BE
    socket.onopen = () => {
        console.log('WebSocket connected.');
        const registerMessage = JSON.stringify({
            type: 'register',
            userId: userId,
        });
        socket.send(registerMessage);
        console.log('User ID sent to server:', userId);
    };
    socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log("Nhận được thông báo", data);
        if (data.type === 'notification') {
            console.log('Notification received:', data.data);
            // Thay alert bằng toast hoặc logic tùy chỉnh
            toast(`Notification: ${data.data}`);
        }
    };
    socket.onclose = () => {
        console.log('WebSocket disconnected, reconnecting...');
        setTimeout(connectWebSocket, 500);
    };
    socket.onerror = (error) => {
        console.error('WebSocket error:', error);
    };

    return socket;
}

export default connectWebSocket;