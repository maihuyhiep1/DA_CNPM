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



    const updateComments = (response) => {
        if (response.success) {
            // Lấy tất cả các comment từ mảng con
            const allComments = response.data.flat();

            // Set lại giá trị cho comments (giả sử là một state trong React)
            setComments(allComments); // Hoặc trực tiếp gán cho biến comments nếu không dùng React
        } else {
            console.error("Lỗi khi lấy comment:", response.message);
        }
    };

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

        getPostById();
        fetchComments();
    }, [id]); // useEffect sẽ chạy lại khi `id` thay đổi

    useEffect(() => {
        console.log(comments); // Giá trị mới của comments sau khi được cập nhật
    }, [comments]);


    const handleAddComment = async (content) => {
        console.log("NỘI DUNG CONTENT: ", content);
        content.userId = "c8029506-4377-4399-9931-8fe279cb1159";

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
      if (post.isDummy) return; // Skip fetching for dummy posts
      try {
        if (!like) {
          await axios.post(
            `http://localhost:8386/api/posts/${post.post_id}/like`,
            {},
            { withCredentials: true }
          );
          setPost((prevPost) => ({
            ...prevPost,
            like: (prevPost.like || prevPost.like_count || 0) + 1,
          }));
        } else {
          await axios.post(
            `http://localhost:8386/api/posts/${post.post_id}/like`,
            {},
            { withCredentials: true }
          );
          setPost((prevPost) => ({
            ...prevPost,
            like: Math.max((prevPost.like || prevPost.like_count || 1) - 1, 0),
          }));
        }
        setLike(!like);
      } catch (error) {
        console.error(
          `Error ${like ? "unliking" : "liking"} post:`,
          error.response?.data || error.message
        );
      }
    };


    if (loading) {
        return (
            <div className="loading">Loading...</div> // Hiển thị thông báo khi đang tải dữ liệu
        );
    }

    // Kiểm tra nếu post là null hoặc không có dữ liệu hợp lệ
    if (!post) {
        return (
            <div className="error">Post not found</div> // Hiển thị thông báo khi không tìm thấy bài viết
        );
    }

    // Sau khi bài viết đã được tải xong, hiển thị nội dung bài viết
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
                <div className="postBottomFooterItem" onClick={handleLike}>
                    <ThumbUpAltOutlined className="footerIcon" />
                    <span className="footerText">Like</span>
                </div>
                <div
                    className="postBottomFooterItem"
                    onClick={() => setCommentBoxVisible(!commentBoxVisible)}
                >
                    <ChatBubbleOutline className="footerIcon" />
                    <span className="footerText">Comment</span>
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
