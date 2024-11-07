import { Comment } from "../models/comment.model.js";

const commentController = {
    async create(req, res) {
        try {
            const response = await fetch(`http://localhost:3001/api/posts/${req.body.postId}`);
            if (!response.ok) {
                if (response.status === 404) {
                    console.log("Comment không tồn tại!");
                } else {
                    console.log(`Lỗi: ${response.status} - ${response.statusText}`);
                }
                res.status(response.status).json({ success: false, message: "Lỗi khi thêm comment!", data: null});
            } 
            const data = await response.json();
            req.body.postId = data.postId;
            const comment = await Comment.create(req.body);
            res.status(201).json({ success: true, message: "Tạo comment thành công!", data: comment });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message, data: null });
        }
    },

    async update(req, res) {
        try {
            const [updated] = await Comment.update(req.body, {
                where: { id: req.params.id }
            });
            if (updated) {
                const updatedComment = await Comment.findByPk(req.params.id);
                res.status(200).json({ success: true, message: "Cập nhật comment thành công!", data: updatedComment});
            } else {
                res.status(404).json({ success: false, message: "Comment không tồn tại!", data: null});
            }
        } catch (error) {
            res.status(500).json({ success: false, message: error.message, data: null});
        }
    },

    async delete(req, res) {
        try {
            const comment = await Comment.findOne({
                where: { id: req.params.id } 
            });
            const deleted = await Comment.destroy({
                where: { id: req.params.id }
            });
            if (deleted) {
                res.status(202).json({ success: true, message: "Xoá comment thành công!", data: {comment: comment}});
            } else {
                res.status(404).json({ success: false, message: "Comment không tồn tại!", data: null});
            }
        } catch (error) {
            res.status(500).json({ success: false, message: error.message, data: null});
        }
    },

    async findAll(req, res) {
        try {
            const comments = await Comment.findAll();
            res.status(200).json({ success: true, message: "Lấy tất cả comment thành công!", data: comments});
        } catch (error) {
            res.status(500).json({ success: false, message: error.message, data: null});
        }
    },
    
    async findAllofPostId(req, res) {
        try {
            const response = await fetch(`http://localhost:3001/api/posts/${req.params.id}`);
            if (!response.ok) {
                if (response.status === 404) {
                    console.log("Comment không tồn tại!");
                } else {
                    console.log(`Lỗi: ${response.status} - ${response.statusText}`);
                }
                res.status(response.status).json({ success: false, message: "Lỗi khi thêm comment!", data: null});
            } 
            const comments = await Comment.findAll({
                where: { postId: req.params.id } 
            });
            res.status(200).json({ success: true, message: `Lấy tất cả comment của post ${req.params.id} thành công!`, data: comments });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message, data: null });
        }
    }
};

export default commentController;