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
  exports.updatePost = (postId,author_id, updatedFields, callback) => {
    // Chỉ cập nhật các trường title, avatar, và content
    const sql = `
        UPDATE posts 
        SET 
            title = COALESCE(?, title), 
            avatar = COALESCE(?, avatar), 
            content = COALESCE(?, content) 
        WHERE post_id = ? AND author_id = ?;
    `;

    // Mảng giá trị cho các trường được cập nhật
    const values = [
        updatedFields.title || null,
        updatedFields.avatar || null,
        updatedFields.content || null,
        postId,
        author_id
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
  

  exports.toggleLikePost = (userId, postId, callback) => {
    const checkLikeSql = `SELECT * FROM post_likes WHERE user_id = ? AND post_id = ?`;
    db.query(checkLikeSql, [userId, postId], (err, results) => {
        if (err) {
            return callback(err, null);
        }

        if (results.length === 0) {
            // Nếu người dùng chưa like bài viết, thêm lượt thích
            const insertSql = `INSERT INTO post_likes (user_id, post_id) VALUES (?, ?)`;
            db.query(insertSql, [userId, postId], (err, result) => {
                if (err) {
                    return callback(err, null);
                }

                // Cập nhật like_count trong bảng posts
                const updatePostSql = `UPDATE posts SET like_count = like_count + 1 WHERE post_id = ?`;
                db.query(updatePostSql, [postId], (err, result) => {
                    if (err) {
                        return callback(err, null);
                    }
                    return callback(null, { message: 'Đã like bài viết thành công!' });
                });
            });
        } else {
            // Nếu người dùng đã like bài viết, xóa lượt thích
            const deleteSql = `DELETE FROM post_likes WHERE user_id = ? AND post_id = ?`;
            db.query(deleteSql, [userId, postId], (err, result) => {
                if (err) {
                    return callback(err, null);
                }

                // Cập nhật like_count trong bảng posts
                const updatePostSql = `UPDATE posts SET like_count = like_count - 1 WHERE post_id = ?`;
                db.query(updatePostSql, [postId], (err, result) => {
                    if (err) {
                        return callback(err, null);
                    }
                    return callback(null, { message: 'Đã bỏ like bài viết thành công!' });
                });
            });
        }
    });
};
