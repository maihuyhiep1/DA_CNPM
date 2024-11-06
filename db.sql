-- Xóa database nếu đã tồn tại và tạo mới
DROP DATABASE IF EXISTS social_network;
CREATE DATABASE social_network;
USE social_network;

-- Tạo bảng users
CREATE TABLE users (
    user_id VARCHAR(36) PRIMARY KEY,          -- UUID dạng chuỗi 36 ký tự
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    hashed_pw VARCHAR(255) NOT NULL,           -- Mật khẩu đã băm
    post_count INT DEFAULT 0,                  -- Số bài đăng
    like_count INT DEFAULT 0,                  -- Số lượt thích
    avatar VARCHAR(255),                       -- Link ảnh đại diện
    follower_count INT DEFAULT 0,              -- Số người theo dõi
    description TEXT,                          -- Mô tả người dùng
    role ENUM('User', 'Mod', 'Admin') DEFAULT 'User'  -- Vai trò của người dùng
);

-- Tạo bảng posts
CREATE TABLE posts (
    post_id VARCHAR(36) PRIMARY KEY,           -- UUID dạng chuỗi 36 ký tự
    title VARCHAR(255) NOT NULL,
    author_id VARCHAR(36),                     -- Khóa ngoại tham chiếu đến user_id
    date DATETIME DEFAULT CURRENT_TIMESTAMP,   -- Thời gian tạo bài viết
    avatar VARCHAR(255),                       -- Link ảnh bài viết
    is_qna BOOLEAN DEFAULT FALSE,              -- Đánh dấu QnA
    like_count INT DEFAULT 0,                  -- Số lượt thích
    cmt_count INT DEFAULT 0,                   -- Số lượt bình luận
    content TEXT,                              -- Nội dung bài viết (link CDN)
    FOREIGN KEY (author_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Tạo bảng comments
CREATE TABLE comments (
    comment_id INT AUTO_INCREMENT PRIMARY KEY, -- ID tự động tăng
    post_id VARCHAR(36),                       -- Khóa ngoại tham chiếu đến post_id
    author_id VARCHAR(36),                     -- Khóa ngoại tham chiếu đến user_id
    content TEXT NOT NULL,                     -- Nội dung bình luận
    date DATETIME DEFAULT CURRENT_TIMESTAMP,   -- Thời gian bình luận
    FOREIGN KEY (post_id) REFERENCES posts(post_id) ON DELETE CASCADE,
    FOREIGN KEY (author_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Bảng trung gian để lưu thông tin user nào đã like post nào
CREATE TABLE post_likes (
    user_id VARCHAR(36),
    post_id VARCHAR(36),
    PRIMARY KEY (user_id, post_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (post_id) REFERENCES posts(post_id) ON DELETE CASCADE
);

-- Bảng trung gian để lưu thông tin user nào đã like comment nào (nếu cần)
CREATE TABLE comment_likes (
    user_id VARCHAR(36),
    comment_id INT,
    PRIMARY KEY (user_id, comment_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (comment_id) REFERENCES comments(comment_id) ON DELETE CASCADE
);

-- Bảng trung gian để lưu thông tin về những người dùng nào đã thích post nào
CREATE TABLE post_liked_users (
    post_id VARCHAR(36),
    liked_user_id VARCHAR(36),
    PRIMARY KEY (post_id, liked_user_id),
    FOREIGN KEY (post_id) REFERENCES posts(post_id) ON DELETE CASCADE,
    FOREIGN KEY (liked_user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Bảng trung gian để lưu thông tin về những bình luận trên mỗi bài viết
CREATE TABLE post_comments (
    post_id VARCHAR(36),
    comment_id INT,
    PRIMARY KEY (post_id, comment_id),
    FOREIGN KEY (post_id) REFERENCES posts(post_id) ON DELETE CASCADE,
    FOREIGN KEY (comment_id) REFERENCES comments(comment_id) ON DELETE CASCADE
);

INSERT INTO users (user_id, name, email, hashed_pw, post_count, like_count, avatar, follower_count, description, role)
VALUES 
(UUID(), 'Nguyễn Văn A', 'nguyenvana@example.com', 'hashed_password_1', 2, 10, 'https://cdn.example.com/avatar1.png', 50, 'Developer and tech enthusiast', 'User'),
(UUID(), 'Trần Thị B', 'tranthib@example.com', 'hashed_password_2', 1, 5, 'https://cdn.example.com/avatar2.png', 30, 'Content creator', 'Mod'),
(UUID(), 'Lê Minh C', 'leminhc@example.com', 'hashed_password_3', 3, 20, 'https://cdn.example.com/avatar3.png', 100, 'Admin of the network', 'Admin');

-- Lấy user_id của các người dùng vừa tạo
SELECT * FROM users;

-- Thêm mẫu bài viết vào bảng posts (giả sử sử dụng user_id từ kết quả SELECT ở trên)
-- Thay UUID cho post_id và author_id phù hợp từ kết quả SELECT của bảng users
INSERT INTO posts (post_id, title, author_id, avatar, is_qna, content)
VALUES 
(UUID(), 'Giới thiệu về Node.js', (SELECT user_id FROM users WHERE name='Nguyễn Văn A'), 'https://cdn.example.com/post1.png', FALSE, 'Đây là bài viết về Node.js.'),
(UUID(), 'Hướng dẫn lập trình web với Express', (SELECT user_id FROM users WHERE name='Nguyễn Văn A'), 'https://cdn.example.com/post2.png', TRUE, 'Bài viết ngắn về Express.'),
(UUID(), 'Cách tạo API với MongoDB', (SELECT user_id FROM users WHERE name='Trần Thị B'), 'https://cdn.example.com/post3.png', FALSE, 'API đơn giản với MongoDB.');

-- Kiểm tra lại dữ liệu vừa thêm vào bảng posts
SELECT * FROM posts;
