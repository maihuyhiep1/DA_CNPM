const express = require('express');
const sequelize = require('./src/config/db'); // Import Sequelize từ file db.js
const postRoutes = require('./src/routes/postRoutes');
const path = require('path');
require('dotenv').config();

const app = express();

// Cấu hình thư mục uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Middleware xử lý JSON
app.use(express.json());

// Routes
app.use('/api', postRoutes);

// Đồng bộ hóa cơ sở dữ liệu
sequelize.sync({ force: true }).then(() => {
    console.log('Cơ sở dữ liệu đã được đồng bộ hóa.');
}).catch((error) => {
    console.error('Lỗi khi đồng bộ cơ sở dữ liệu:', error);
});

// Khởi động server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server đang chạy trên cổng ${PORT}`);
});
