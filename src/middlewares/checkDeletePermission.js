// middleware/checkDeletePermission.js
const postModel = require('../models/Post');

const checkDeletePermission = (req, res, next) => {
    const { postId } = req.params;
    const userRole = req.user.role;
    const userId = req.user.user_id;

    postModel.getPostById(postId, (err, post) => {
        if (err || !post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        // Cho phép xóa nếu là admin/moderator hoặc là người đăng bài
        if (userRole === 'admin' || userRole === 'moderator' || post.author_id === userId) {
            next();
        } else {
            return res.status(403).json({ error: 'Bạn không có quyền xóa bài viết này.' });
        }
    });
};

module.exports = checkDeletePermission;
