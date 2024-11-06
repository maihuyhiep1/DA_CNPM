<<<<<<< HEAD
# DA_CNPM
Clone repo về thư mục khác, chuyển sang nhánh KhoaPham

Cài package còn thiếu: npm install

Đổi tên .env.example thành .env, điền thông tin database. (NODE_ENV để là developement)

Sửa file ./src/config/config.json (mục developement)

Tạo bảng users trong database: npx sequelize-cli db:migrate

Tạo User trong database để test: node .\src\services\test-UserServices.js

Chạy project: npm start

Api để ở file usercontrollers
Gọi api bằng postman hoặc bằng cách nào đó. nhập đúng email, mật khẩu thì trả về errCode = 0, errMessage = 'Ok', và role của user (xem thêm ở file userService)
=======
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
>>>>>>> main
