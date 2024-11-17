### DA_CNPM
## Cài đặt môi trường
Clone repo về thư mục khác, chuyển sang nhánh `KhoaPham`

- Cài package còn thiếu: `npm install`

- Đổi tên `env.example` thành `.env`

- Sửa file `./src/config/config.json` (mục developement)

## Chạy project: `npm start`

## Các route của API
# POST: `/api/signin-send` (gửi otp qua mail)
Route nhận vào `email, password, username, name` (name tương ứng với nickname của FE)

Nếu thiếu một trong các trường trên, route trả về json object chứa `errCode:4`

Nếu email đã được sử dụng, trả về `errCode:1`

Nếu không có lỗi, trả về `errCode:0`

Sau khi hoàn tất, một record trong table confirmation-code sẽ được tạo. Với `status` là `active` và `expiresDate` là 10 phút sau khi otp được tạo.

# POST: `/api/signin-verify` (Kiểm tra Otp)
Route nhận vào `email, password, username, name` (name tương ứng với nickname của FE)

Nếu thiếu một trong các trường trên, route trả về json object chứa `errCode:4`

Nếu sai OTP trả về `errCode:3`

Nếu đúng Otp trả về `errCode:0`, sau đó thực hiện tạo user từ các thông tin đã nhận

Nếu email đã được sử dụng, trả về `errCode:1`

Nếu thiếu email, trả về `errcode:2`

Nếu username đã được sử dụng, trả về `errCode:5`

Nếu thiếu name, trả về `errCode:6`

# POST: `/api/login`
Nhận vào `username`, `password`. Nếu thiếu trả về `errCode:4`

Đăng nhập thành công trả về errCode:0 và thông tin của user.

Sai mật khẩu errcode3

User không tồn tại errcode2

tài khoản chưa được tạo errcode1

# GET `/google/auth`
Chuyển tới trang đăng nhập bằng google

Đăng nhập thành công trả về thông tin user. errcode0. Nếu muốn thì cho redirect về trang nào đó (liên hệ Backend)

Đăng nhập thất bại thì errcode1, sau đó redirect về `/login/faied` (có thể tùy chỉnh trong file route)
# GET `/logout` đăng xuất. (chỉ hoạt động với acc đăng nhập bằng google)

sau khi logout thì redirect về `/` (có thể tùy chỉnh trong ở hàm userLogout trong file googleAuthController)
# GET `/login-success` 
Lấy dữ liệu user sau khi đăng nhập


# POST `/api/forgot-password/send` 
Nhận vào `username`

Trả về `errCode`:
- `0` nếu thành công
- `1` user not found
- `2` email not found
- `3` missing input

Trả về email dưới dạng abc*****@gmail.com

thành công thì gửi otp tới email

# POST `/api/forgot-password/verify` 

nhận vào `username`, `email`, `code`, `password` (`password` là mật khẩu mới)

Trả về `errCode`:
- `0` nếu thành công
- `1` otp sai
- `2` user not found
- `3` missing input

Thành công thì đổi mật khẩu user thành mật khẩu mới