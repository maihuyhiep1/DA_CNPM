const multer = require('multer');
const path = require('path');

// Cấu hình lưu trữ cho `multer`
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Thư mục lưu trữ ảnh
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, Date.now() + ext); // Tạo tên file duy nhất với timestamp
    }
});

// Cấu hình multer
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);

        if (extname && mimetype) {
            cb(null, true);
        } else {
            cb(new Error('Chỉ hỗ trợ các tệp hình ảnh!'));
        }
    }
});

module.exports = upload;
