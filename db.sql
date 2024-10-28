DROP DATABASE social_network;
CREATE DATABASE social_network;

USE social_network;

CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    hashed_pw VARCHAR(255) NOT NULL,
    post_count INT DEFAULT 0,
    like_count INT DEFAULT 0,
    follower_count INT DEFAULT 0,
    avatar VARCHAR(255),
    description TEXT,
    role ENUM('User', 'Mod', 'Admin') DEFAULT 'User'
);


CREATE TABLE posts (
    post_id INT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author_id INT,
    date DATETIME DEFAULT CURRENT_TIMESTAMP,
    avatar VARCHAR(255),
    content TEXT,
    is_qna BOOLEAN DEFAULT FALSE,
    like_count INT DEFAULT 0,
    cmt_count INT DEFAULT 0,
    FOREIGN KEY (author_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE comments (
    comment_id INT AUTO_INCREMENT PRIMARY KEY,
    author_id INT,
    post_id INT,
    content TEXT,
    date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (post_id) REFERENCES posts(post_id) ON DELETE CASCADE
);


CREATE TABLE liked_posts (
    user_id INT,
    post_id INT,
    PRIMARY KEY(user_id, post_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (post_id) REFERENCES posts(post_id) ON DELETE CASCADE
);

INSERT INTO users (name, email, hashed_pw, post_count, like_count, follower_count, avatar, description, role)
VALUES ('Nguyen Van A', 'a@gmail.com', 'hashedpassword1', 5, 10, 100, 'avatar_a.jpg', 'I love coding.', 'User'),
       ('Le Thi B', 'b@gmail.com', 'hashedpassword2', 2, 5, 50, 'avatar_b.jpg', 'A tech enthusiast.', 'Mod'),
       ('Tran Van C', 'c@gmail.com', 'hashedpassword3', 3, 8, 75, 'avatar_c.jpg', 'Admin here!', 'Admin');

INSERT INTO posts (title, author_id, avatar, content, is_qna, like_count, cmt_count)
VALUES ('How to learn Node.js?', 1, 'post_avatar1.jpg', 'Node.js is a powerful JavaScript runtime.', FALSE, 3, 2),
       ('What is the best database for web apps?', 2, 'post_avatar2.jpg', 'There are many options like MySQL, MongoDB...', TRUE, 5, 1),
       ('Tips for improving coding skills', 3, 'post_avatar3.jpg', 'Practice makes perfect. Keep coding every day.', FALSE, 7, 3);

INSERT INTO comments (author_id, post_id, content)
VALUES (2, 1, 'I agree! Node.js is amazing.'),
       (3, 1, 'Thanks for sharing, very helpful.'),
       (1, 2, 'I think MySQL is a great choice for most cases.'),
       (3, 3, 'Good advice! Keep practicing.'),
       (2, 3, 'Thanks, I will try to follow this.'),
       (1, 3, 'This post is very inspiring.');
       
SELECT * FROM posts;
