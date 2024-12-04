import './fullPost.css';
import '../post/Post.scss';
import WriteComment from "../writeComment/writeComment";
import { useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from "react";
import CommentContent from "../commentContent/commentContent";
import RepplyCommentContent from "../replyCommentContent/repplycommentContent";
import axios from 'axios';
import { AuthContext } from "../../context/authContext";
import {
    ChatBubbleOutline,
    Favorite,
    MoreVert,
    ShareOutlined,
    ThumbUpAltOutlined,
    ThumbUp,
    Reply,
} from "@mui/icons-material";

const FullPost = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState();
    const [loading, setLoading] = useState(true); // Trạng thái loading
    const { currentUser } = useContext(AuthContext);
    const [like, setLike] = useState(false);

    useEffect(() => {
        const getPostById = async () => {
            try {
                const response = await axios.get(`http://localhost:8386/api/posts/${id}`, {
                    withCredentials: true
                });
                setPost(response.data);  // Lưu dữ liệu bài viết
                setLoading(false);        // Dữ liệu đã tải xong
            } catch (err) {
                console.error("Error fetching post:", err.message);
                setLoading(false);        // Dù có lỗi, trạng thái loading cũng sẽ dừng
            }
        };

        const fetchComments = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8386/api/comments/post/${id}`,
                );
                console.log(response.data.data);
                setComments(response.data.data);
            } catch (err) {
                console.error("Error fetching comments:", err.message);
                setComments({ data: [] }); // Set mảng rỗng khi có lỗi
            }
        };

        const checkIfLiked = async () => {
            try {
                const response = await axios.post(
                    `http://localhost:8386/api/posts/${id}/like-status`,
                    {},
                    { withCredentials: true }
                );
                console.log("Kiểm tra like: ", response.data);
                setLike(response.data.data);
            } catch (err) {
                console.error("Error fetching comments:", err.message);
                setComments({ data: [] }); // Set mảng rỗng khi có lỗi
            }
        }

        getPostById();
        fetchComments();
        checkIfLiked();
    }, [id]); // useEffect sẽ chạy lại khi `id` thay đổi

    const handleAddComment = async (content) => {
        console.log("NỘI DUNG CONTENT: ", content);
        content.userId = currentUser.id;

        try {
            content.user = currentUser;
            console.log(currentUser);
            content.createdAt = "Vừa xong";
            const response = await axios.post(
                `http://localhost:8386/api/comments/post/${id}`,
                content,
                { withCredentials: true }
            );
            console.log(response);

            setComments((prevComments) => {
                const updatedComments = [...prevComments];
                updatedComments.push([content]); // Thêm bình luận mới vào mảng
                return updatedComments;
            });
        } catch (err) {
            console.error("Error adding comment:", err.message);
        }
    };

    const handleLike = async () => {
        try {
            const response = await axios.post(
                `http://localhost:8386/api/posts/${id}/like`,
                {},
                { withCredentials: true }
            );
            console.log("Người dùng bấm like", response.message);
            setLike(!like);

            setPost((prevPost) => ({
                ...prevPost,
                like_count: like ? prevPost.like_count - 1 : prevPost.like_count + 1,
            }));
        } catch (error) {
            console.error(
                `Error ${like ? "unliking" : "liking"} post:`,
                error.response?.data || error.message
            );
        }
    };


    if (loading) {
        return (
            <div className="loading">Loading...</div>
        );
    }

    if (!post) {
        return (
            <div className="error">Post not found</div>
        );
    }

    return (
        <div className="post">
            <div className="author-info">
                <img src={post.author.avatar} alt="Author's avatar" className="author-avatar" />
                <div className="author-details">
                    <h3 className="author-name">{post.author.name}</h3>
                    <p className="created-at">{post.createdAt}</p>
                </div>
            </div>
            <h2 className="post-title">{post.title}</h2>
            <div className="post-header">
                <img src={post.avatar} alt="Post image" className="post-image" />
            </div>
            <div className="post-content" dangerouslySetInnerHTML={{ __html: post.content }}></div>

            <div className="post-footer">
                <p className="like-count">{post.like_count} Likes</p>
                <p className="comment-count">{post.cmt_count} Comments</p>
            </div>

            <div className="postBottomFooter">
                <div
                    className={`postBottomFooterItem ${like ? 'liked' : 'notLiked'}`}
                    onClick={handleLike}
                >
                    <ThumbUpAltOutlined
                        className={`footerIcon ${like ? 'likedIcon' : 'notLikedIcon'}`}
                    />
                    <span className={`footerText ${like ? 'likedText' : 'notLikedText'}`}>
                        Like
                    </span>
                </div>
                <div className="postBottomFooterItem">
                    <ShareOutlined className="footerIcon" />
                    <span className="footerText">Share</span>
                </div>
            </div>
            <div className="commentSection">
                {/* Viết bình luận mới */}
                <WriteComment
                    avatarUrl={post.author.avatar}
                    onSubmit={handleAddComment}
                />

                {/* Hiển thị các nhóm bình luận */}
                {comments && comments.length > 0 ? (
                    comments.map((commentGroup) => (
                        <div key={commentGroup[0]?.id} className="commentGroup">
                            {/* Hiển thị bình luận chính */}
                            {commentGroup[0] && (
                                <CommentContent
                                    avatarUrl={commentGroup[0].user?.avatar || ""}
                                    content={commentGroup[0].content || ""}
                                    createdAt={commentGroup[0].createdAt || ""}
                                />
                            )}

                            {/* Hiển thị các bình luận trả lời */}
                            {commentGroup.slice(1).map((reply) => (
                                <div
                                    key={reply.id}
                                    className="replyComment"
                                    style={{ marginLeft: "20px" }}
                                >
                                    <ReplyCommentContent
                                        avatarUrl={reply.user?.avatar || ""}
                                        content={reply.content || ""}
                                        createdAt={reply.createdAt || ""}
                                    />
                                </div>
                            ))}
                        </div>
                    ))
                ) : (
                    <p>Không có bình luận nào.</p>
                )}
            </div>
        </div>
    );

};

export default FullPost;
