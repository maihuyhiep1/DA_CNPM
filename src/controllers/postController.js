const Post = require('../models/post');
const PostImage = require('../models/postImage');

// Lấy tất cả bài đăng
exports.getAllPosts = async (req, res) => {
    try {
        const results = await Post.findAll();
        res.status(200).json(results);
    } catch (err) {
        res.status(500).json({ message: 'Lỗi khi lấy danh sách bài đăng', error: err.message });
    }
};

// Lấy bài đăng theo ID
exports.getPostById = async (req, res) => {
    try {
        const post_id = req.params.postId;
        const result = await Post.findByPk(post_id);
        if (!result) {
            return res.status(404).json({ message: 'Không tìm thấy bài đăng' });
        }
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: 'Lỗi khi lấy bài đăng', error: err.message });
    }
};

// Tạo bài đăng mới
exports.createPost = async (req, res) => {
    try {
        const { title, avatar, is_qna, content } = req.body;
        const author_id = req.user_id || 1; // Lấy ID người dùng từ middleware

        if (!content || !Array.isArray(content)) {
            return res.status(400).json({ message: 'Nội dung bài đăng phải là một mảng (văn bản và ảnh).' });
        }

        // Xử lý nội dung và ảnh
        const processedContent = [];
        for (let i = 0; i < content.length; i++) {
            const item = content[i];

            if (item.type === 'text') {
                // Nếu là văn bản, giữ nguyên
                processedContent.push(`<p>${item.value}</p>`);
            } else if (item.type === 'image' && req.files && req.files[i]) {
                // Nếu là ảnh, xử lý file tải lên
                const imageUrl = `http://localhost:3000/uploads/${req.files[i].filename}`;
                processedContent.push(`<img src="${imageUrl}" alt="Hình ảnh" />`);

                // Lưu ảnh vào bảng PostImage
                await PostImage.create({
                    post_id: null, // Tạm thời chưa có ID bài viết
                    image_url: imageUrl,
                });
            }
        }

        // Lưu bài viết vào cơ sở dữ liệu
        const newPost = await Post.create({
            title,
            author_id,
            avatar,
            is_qna,
            content: processedContent.join(''), // Ghép nội dung HTML
        });

        // Cập nhật post_id cho các ảnh đã lưu
        if (req.files) {
            await PostImage.update(
                { post_id: newPost.post_id },
                { where: { post_id: null } }
            );
        }

        res.status(201).json({ message: 'Tạo bài viết thành công', postId: newPost.post_id });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi khi tạo bài đăng', error: err.message });
    }
};


// Cập nhật bài đăng
exports.updatePost = async (req, res) => {
    try {
        const { postId } = req.params;

        // Chỉ cho phép cập nhật các thuộc tính cụ thể
        const allowedFields = ['title', 'avatar', 'content'];
        const updatedFields = {};

        // Kiểm tra từng thuộc tính trong req.body để xem có hợp lệ không
        for (const key of Object.keys(req.body)) {
            if (allowedFields.includes(key)) {
                updatedFields[key] = req.body[key];
            }
        }

        // Nếu có file ảnh mới, thay thế đường dẫn trong content
        if (req.file) {
            const imageUrl = `http://localhost:3000/uploads/${req.file.filename}`;
            // Kiểm tra nếu có nội dung và thay thế đường dẫn ảnh cũ
            if (updatedFields.content) {
                // Thay thế tất cả các ảnh trong nội dung
                updatedFields.content = updatedFields.content.replace(/<img src=".*?">/g, `<img src="${imageUrl}">`);
            } else {
                updatedFields.content = `<img src="${imageUrl}" />`; // Nếu không có nội dung, chỉ thay ảnh
            }
        }

        // Kiểm tra nếu không có thuộc tính nào hợp lệ để cập nhật
        if (Object.keys(updatedFields).length === 0) {
            return res.status(400).json({ message: 'Không có thuộc tính hợp lệ để cập nhật' });
        }

        // Thực hiện cập nhật với các trường hợp hợp lệ
        const result = await Post.update(updatedFields, {
            where: {
                post_id: postId
            }
        });

        if (result[0] === 0) {
            return res.status(404).json({ message: 'Không tìm thấy bài đăng để cập nhật' });
        }

        res.status(200).json({ message: 'Cập nhật bài viết thành công' });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi khi cập nhật bài đăng', error: err.message });
    }
};

// Xóa bài đăng
exports.deletePost = async (req, res) => {
    try {
        const post_id = req.params.postId;
        const result = await Post.destroy({
            where: { post_id: post_id }
        });

        if (result === 0) {
            return res.status(404).json({ message: 'Không tìm thấy bài đăng để xóa' });
        }
        res.status(200).json({ message: 'Xóa bài đăng thành công' });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi khi xóa bài đăng', error: err.message });
    }
};

// Like bài đăng (toggle)
exports.likePost = async (req, res) => {
    try {
        const postId = req.params.postId;
        const userId = req.user.user_id; // Giả sử có user_id từ token

        // Kiểm tra xem đã like hay chưa
        const existingLike = await Post.findOne({ where: { post_id: postId, user_id: userId } });

        if (!existingLike) {
            // Tăng like
            await Post.increment('like_count', { by: 1, where: { post_id: postId } });
            return res.json({ message: 'Đã like bài viết thành công!' });
        } else {
            // Giảm like
            await Post.decrement('like_count', { by: 1, where: { post_id: postId } });
            return res.json({ message: 'Đã bỏ like bài viết thành công!' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Lỗi khi xử lý lượt thích', error: err.message });
    }
};
