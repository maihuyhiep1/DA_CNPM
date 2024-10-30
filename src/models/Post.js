const db = require('../config/db');
const { v4: uuidv4 } = require('uuid');

// Lấy tất cả bài đăng
exports.getAllPosts = (callback) => {
  const query = 'SELECT * FROM posts';
  db.query(query, (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
};

// Lấy bài đăng theo ID
// Lấy bài đăng theo ID
exports.getPostById = (post_id, callback) => {
    const query = 'SELECT * FROM posts WHERE post_id = ?';
    db.query(query, [post_id], (err, result) => {
      if (err) return callback(err);
      callback(null, result);
    });
  };
  
  // Tạo bài đăng mới
  exports.createPost = (title, author_id, avatar, is_qna, content, callback) => {
    const post_id = uuidv4();
    
    // Truy vấn SQL để chèn bài viết mới
    const sql = `
        INSERT INTO posts (post_id, title, author_id, date, avatar, is_qna, like_count, cmt_count, content)
        VALUES (?, ?, ?, CURRENT_TIMESTAMP, ?, ?, ?, ?, ?)
    `;
    
    const values = [
        post_id,
        title,
        author_id,
        avatar,
        is_qna || false,
        0, // Khởi tạo like_count
        0, // Khởi tạo cmt_count
        content
    ];

    // Thực hiện truy vấn
    db.query(sql, values, (err, results) => {
        if (err) {
            return callback(err, null);
        }
        return callback(null, { message: 'Post created successfully!', post_id });
    });
};
  
  // Cập nhật bài đăng
  exports.updatePost = (postId, updatedFields, callback) => {
    // Chỉ cập nhật các trường title, avatar, và content
    const sql = `
        UPDATE posts 
        SET 
            title = COALESCE(?, title), 
            avatar = COALESCE(?, avatar), 
            content = COALESCE(?, content) 
        WHERE post_id = ?;
    `;

    // Mảng giá trị cho các trường được cập nhật
    const values = [
        updatedFields.title || null,
        updatedFields.avatar || null,
        updatedFields.content || null,
        postId
    ];

    // Thực hiện truy vấn
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error updating post:', err);
            return callback(err, null);
        }
        // Kiểm tra nếu không có bản ghi nào được cập nhật
        if (result.affectedRows === 0) {
            return callback(null, { message: 'No post found with the specified ID.' });
        }
        callback(null, { message: 'Post updated successfully!' });
    });
};


  
  // Xóa bài đăng
  exports.deletePost = (post_id, callback) => {
    const query = 'DELETE FROM posts WHERE post_id = ?';
    db.query(query, [post_id], (err, result) => {
      if (err) return callback(err);
      callback(null, result);
    });
  };
  