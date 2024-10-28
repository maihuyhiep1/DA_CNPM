const express = require('express');
const bodyParser = require('body-parser');
const postRoutes = require('./src/routes/postRoutes');
require('dotenv').config();
const cors = require('cors');

const app = express(); // Khởi tạo ứng dụng Express
app.use(cors()); // Sử dụng middleware CORS
app.use(bodyParser.json()); // Sử dụng body-parser để phân tích dữ liệu JSON

app.use('/api', postRoutes); // Định nghĩa các route API cho bài viết

const PORT = process.env.PORT ; // Lấy port từ biến môi trường hoặc mặc định là 3000
app.listen(PORT, () => { // Bắt đầu lắng nghe trên port đã định
    console.log(`Server is running on port ${PORT}`); // In ra thông báo server đang chạy
});
