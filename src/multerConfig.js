// multerConfig.js
const multer = require('multer');
const path = require('path');

// Cấu hình lưu trữ file
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Lưu file vào thư mục 'uploads/'
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    // Đặt tên file với thời gian hiện tại và phần mở rộng của file
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// Tạo instance của multer với cấu hình lưu trữ
const upload = multer({ storage: storage });

module.exports = upload;
