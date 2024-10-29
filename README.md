# DA_CNPM
Clone repo về thư mục khác, chuyển sang nhánh KhoaPham

Cài package còn thiếu: npm install

Đổi tên .env.example thành .env, điền thông tin database.
Sửa file ./src/config/config.json (mục developement)

Tạo bảng users trong database: npx sequelize-cli db:migrate

Tạo User trong database để test: node .\src\services\test-UserServices.js

Chạy project: npm start

Gọi api bằng postman hoặc bằng cách nào đó. nhập đúng email, mật khẩu thì trả về errCode = 0, errMessage = 'Ok', và role của user (xem thêm ở file userService)
