const Post = require('../models/Post');

// Lấy tất cả bài đăng
exports.getAllPosts = (req, res) => {
  Post.getAllPosts((err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Lỗi khi lấy danh sách bài đăng' });
    }
    res.status(200).json(results);
  });
};

// Lấy bài đăng theo ID
exports.getPostById = (req, res) => {
  const post_id = req.params.postId;
  Post.getPostById(post_id, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Lỗi khi lấy bài đăng' });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: 'Không tìm thấy bài đăng' });
    }
    res.status(200).json(result[0]);
  });
};

// Tạo bài đăng mới
exports.createPost = (req, res) => {
    const { title,  avatar, is_qna, content } = req.body;
    const author_id = req.user_id;
    // Gọi hàm createPost từ model
    Post.createPost(title, author_id, avatar, is_qna, content, (err, result) => {
        if (err) {
            console.error('Error creating post:', err);
            return res.status(500).json({ error: 'An error occurred while creating the post.' });
        }
        return res.status(201).json(result);
    });
};
// Cập nhật bài đăng
exports.updatePost = (req, res) => {
    const { postId } = req.params;  // Lấy postId từ req.params
    const updatedFields = req.body; // Dữ liệu cần cập nhật từ req.body
    const author_id = req.user_id;
    Post.updatePost(postId, updatedFields, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'An error occurred while updating the post.' });
        }
        res.status(200).json(result);
    });
};


// Xóa bài đăng
exports.deletePost = (req, res) => {
  const post_id = req.params.postId;

  Post.deletePost(post_id, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Lỗi khi xóa bài đăng' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Không tìm thấy bài đăng để xóa' });
    }
    res.status(200).json({ message: 'Xóa bài đăng thành công' });
  });
};

exports.likePost = (req, res) => {
  const postId = req.params.postId;
  const userId = req.user.user_id; // Lấy user_id từ token đã được xác thực

  postModel.toggleLikePost(userId, postId, (err, result) => {
      if (err) {
          return res.status(500).json({ error: 'Có lỗi xảy ra khi xử lý lượt thích.' });
      }
      return res.json(result);
  });
};