const express = require('express');
const sequelize = require('./src/config/db'); // Import Sequelize từ file db.js
const postRoutes = require('./src/routes/postRoutes');
const multer = require('multer'); // Import multer
const cors = require('cors'); // Import cors
const path = require('path');
require('dotenv').config();
const fs = require('fs'); // Import fs để kiểm tra và tạo thư mục uploads

const app = express();

// Cấu hình CORS để chỉ cho phép yêu cầu từ cổng 5173
const corsOptions = {
  origin: 'http://localhost:5173', // Địa chỉ frontend của bạn
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Phương thức HTTP được phép
  allowedHeaders: ['Content-Type', 'Authorization'], // Headers được phép
};

app.use(express.json({ limit: '20mb' })); // Tăng giới hạn kích thước body
app.use(express.urlencoded({ extended: true, limit: '20mb' })); // Tăng giới hạn cho form-urlencoded
app.use(cors(corsOptions));

const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

app.use('/uploads', express.static(uploadDir));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Đường dẫn lưu tệp
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  },
});

const upload = multer({ storage: storage });

app.use(upload.single('avatar')); 
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

app.use('/api', postRoutes);

sequelize.sync().then(() => {
  console.log('Cơ sở dữ liệu đã được đồng bộ hóa.');
}).catch((error) => {
  console.error('Lỗi khi đồng bộ cơ sở dữ liệu:', error);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server đang chạy trên cổng ${PORT}`);
});
