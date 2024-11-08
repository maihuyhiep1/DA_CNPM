const db = require('../config/db');
const { v4: uuidv4 } = require('uuid');

// Lấy tất cả bài đăng
exports.getAllPosts = async () => {
  const query = 'SELECT * FROM posts';
  try {
    const [results] = await db.query(query);
    return results;
  } catch (error) {
    throw error;
  }
};

// Lấy bài đăng theo ID
exports.getPostById = async (post_id) => {
  const query = 'SELECT * FROM posts WHERE post_id = ?';
  try {
    const [result] = await db.query(query, [post_id]);
    return result;
  } catch (error) {
    throw error;
  }
};

// Tạo bài đăng mới
exports.createPost = async (title, author_id, avatar, is_qna, content) => {
  const post_id = uuidv4();
  const sql = `
    INSERT INTO posts (post_id, title, author_id, date, avatar, is_qna, like_count, cmt_count, content)
    VALUES (?, ?, ?, CURRENT_TIMESTAMP, ?, ?, ?, ?, ?)
  `;
  const values = [post_id, title, author_id, avatar, is_qna || false, 0, 0, content];

  try {
    await db.query(sql, values);
    return { message: 'Post created successfully!', post_id };
  } catch (error) {
    throw error;
  }
};

// Cập nhật bài đăng
exports.updatePost = async (postId, author_id, updatedFields) => {
  const sql = `
    UPDATE posts 
    SET 
      title = COALESCE(?, title), 
      avatar = COALESCE(?, avatar), 
      content = COALESCE(?, content) 
    WHERE post_id = ? AND author_id = ?;
  `;
  const values = [
    updatedFields.title || null,
    updatedFields.avatar || null,
    updatedFields.content || null,
    postId,
    author_id
  ];

  try {
    const [result] = await db.query(sql, values);
    if (result.affectedRows === 0) {
      return { message: 'No post found with the specified ID.' };
    }
    return { message: 'Post updated successfully!' };
  } catch (error) {
    throw error;
  }
};

// Xóa bài đăng
exports.deletePost = async (post_id) => {
  const query = 'DELETE FROM posts WHERE post_id = ?';
  try {
    const [result] = await db.query(query, [post_id]);
    return result;
  } catch (error) {
    throw error;
  }
};

// Xử lý like/bỏ like bài đăng
exports.toggleLikePost = async (userId, postId) => {
  const checkLikeSql = 'SELECT * FROM post_likes WHERE user_id = ? AND post_id = ?';
  try {
    const [results] = await db.query(checkLikeSql, [userId, postId]);

    if (results.length === 0) {
      const insertSql = 'INSERT INTO post_likes (user_id, post_id) VALUES (?, ?)';
      await db.query(insertSql, [userId, postId]);

      const updatePostSql = 'UPDATE posts SET like_count = like_count + 1 WHERE post_id = ?';
      await db.query(updatePostSql, [postId]);

      return { message: 'Đã like bài viết thành công!' };
    } else {
      const deleteSql = 'DELETE FROM post_likes WHERE user_id = ? AND post_id = ?';
      await db.query(deleteSql, [userId, postId]);

      const updatePostSql = 'UPDATE posts SET like_count = like_count - 1 WHERE post_id = ?';
      await db.query(updatePostSql, [postId]);

      return { message: 'Đã bỏ like bài viết thành công!' };
    }
  } catch (error) {
    throw error;
  }
};
