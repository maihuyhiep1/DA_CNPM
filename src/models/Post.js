const { v4: uuidv4 } = require('uuid');

class Post {
    constructor(title, author_id, content, avatar, isQnA = false) {
        this.post_id = uuidv4();             // Tạo UUID tự động
        this.title = title;
        this.author_id = author_id;          // Gán tự động từ user_id của người đăng
        this.avatar = avatar;
        this.content = content;
        this.is_qna = isQnA;
        this.like_count = 0;                 // Bắt đầu với giá trị 0
        this.cmt_count = 0;                  // Bắt đầu với giá trị 0
        this.likedUser = [];                 // Danh sách người dùng đã thích bài viết
        this.comments = [];                  // Danh sách bình luận
        // Không cần gán `date`, MySQL sẽ tự động thêm thời gian hiện tại
    }

    // Tăng like_count khi có người like bài viết
    likePost(user) {
        this.likedUser.push(user);
        this.like_count += 1;  // Sửa từ likeCount thành like_count
    }

    // Thêm bình luận mới
    addComment(comment) {
        this.comments.push(comment);
        this.cmt_count += 1;    // Sửa từ cmtCount thành cmt_count
    }
}

module.exports = Post;
