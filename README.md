# **Knowledge Sharing Platform - API Documentation**

Dưới đây là tài liệu API cho dự án **Knowledge Sharing Platform**. Nền tảng này cho phép người dùng tạo, chỉnh sửa, xóa và tương tác với các bài viết chia sẻ kiến thức. API cung cấp các chức năng như tạo bài viết, cập nhật, xóa bài viết, cũng như các tính năng liên quan đến hình ảnh và likes.

## **Mục lục**

- [Tổng quan API](#tổng-quan-api)
- [Các API](#các-api)
  - [Lấy tất cả bài viết](#lấy-tất-cả-bài-viết)
  - [Lấy bài viết theo ID](#lấy-bài-viết-theo-id)
  - [Lấy bài viết phổ biến](#lấy-bài-viết-phổ-biến)
  - [Tạo bài viết](#tạo-bài-viết)
  - [Cập nhật bài viết](#cập-nhật-bài-viết)
  - [Xóa bài viết](#xóa-bài-viết)
  - [Like bài viết](#like-bài-viết)
- [Cấu hình](#cấu-hình)

---

## **Tổng quan API**

Các API trong dự án hỗ trợ các thao tác chính như:

- **Lấy danh sách bài viết** hoặc bài viết chi tiết.
- **Tạo mới**, **cập nhật** và **xóa** bài viết.
- **Tương tác với bài viết** thông qua việc **like** hoặc **unlike**.

Tất cả các API yêu cầu xác thực JWT cho các thao tác cần quyền (tạo, cập nhật, xóa bài viết, like bài viết).

---

## **Các API**

### **Lấy tất cả bài viết**

**URL**: `/posts`  
**Method**: `GET`

#### Mô tả:

Lấy danh sách tất cả bài viết từ hệ thống.

#### Response:

```json
[
  {
    "post_id": 1,
    "title": "Bài viết 1",
    "avatar": "http://localhost:3000/uploads/avatar1.jpg",
    "snippet": "Đoạn trích ngắn của bài viết"
  }
]
```

---

### **Lấy bài viết theo ID**

**URL**: `/posts/:postId`  
**Method**: `GET`

#### Mô tả:

Lấy thông tin chi tiết của một bài viết dựa trên `postId`.

#### Response:

```json
{
  "post_id": 1,
  "title": "Bài viết 1",
  "avatar": "http://localhost:3000/uploads/avatar1.jpg",
  "content": "<p>Đây là nội dung bài viết</p>",
  "images": [{ "image_url": "http://localhost:3000/uploads/image1.jpg" }]
}
```

---

### **Lấy bài viết phổ biến**

**URL**: `/posts/popular`  
**Method**: `GET`

#### Mô tả:

Lấy các bài viết phổ biến trong khoảng thời gian nhất định (tuần hoặc tháng).

#### Query Parameters:

- `time`: `'week'` hoặc `'month'`

#### Response:

```json
[
  {
    "post_id": 1,
    "title": "Bài viết phổ biến",
    "avatar": "http://localhost:3000/uploads/avatar.jpg",
    "snippet": "Đoạn trích ngắn của bài viết",
    "like_count": 150
  }
]
```

---

### **Tạo bài viết**

**URL**: `/posts`  
**Method**: `POST`

#### Mô tả:

Tạo một bài viết mới. Nội dung bài viết có thể bao gồm văn bản và hình ảnh.

#### Body:

```json
{
  "title": "Tiêu đề bài viết",
  "content": [
    { "type": "text", "value": "Nội dung văn bản" },
    { "type": "image", "value": "image.jpg" }
  ],
  "is_qna": true
}
```

#### Response:

```json
{
  "message": "Tạo bài viết thành công",
  "postId": 1
}
```

---

### **Cập nhật bài viết**

**URL**: `/posts/:postId`  
**Method**: `PUT`

#### Mô tả:

Cập nhật bài viết theo ID. Có thể cập nhật tiêu đề, nội dung (bao gồm văn bản và hình ảnh) và avatar.

#### Body:

```json
{
  "title": "Cập nhật tiêu đề",
  "content": [{ "type": "text", "value": "Nội dung mới" }]
}
```

#### Response:

```json
{
  "message": "Cập nhật bài viết thành công"
}
```

---

### **Xóa bài viết**

**URL**: `/posts/:postId`  
**Method**: `DELETE`

#### Mô tả:

Xóa bài viết theo ID.

#### Response:

```json
{
  "message": "Xóa bài viết thành công"
}
```

---

### **Like bài viết**

**URL**: `/posts/:postId/like`  
**Method**: `POST`

#### Mô tả:

Like hoặc bỏ like bài viết.

#### Response:

```json
{
  "message": "Đã like bài viết thành công!"
}
```

---

## **Cấu hình**

Dự án sử dụng **MySQL** và **Sequelize ORM** để quản lý cơ sở dữ liệu. Hãy đảm bảo rằng bạn đã cấu hình đúng các biến môi trường trong file `.env`:

```plaintext
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=password
DB_NAME=social_network

```

---

Cảm ơn bạn đã sử dụng API của chúng tôi! Nếu bạn có bất kỳ câu hỏi nào, đừng ngần ngại liên hệ với chúng tôi qua issue hoặc pull request.
