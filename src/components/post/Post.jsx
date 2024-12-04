import { useState, useContext, useEffect } from "react";
import "./Post.scss";
import { Users } from "../../data";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  ChatBubbleOutline,
  Favorite,
  MoreVert,
  ShareOutlined,
  ThumbUpAltOutlined,
  ThumbUp,
  Reply,
} from "@mui/icons-material";

import { AuthContext } from "../../context/authContext";

import WriteComment from "../writeComment/writeComment";
import axios from "axios";
import CommentContent from "../commentContent/commentContent";
import RepplyCommentContent from "../replyCommentContent/repplycommentContent";

const Post = ({ post: initialPost }) => {
  const [post, setPost] = useState(initialPost);
  const [commentBoxVisible, setCommentBoxVisible] = useState(false);
  const [apiComments, setApiComments] = useState();
  const [error, setError] = useState(null);
  const [like, setLike] = useState(false);
  const navigate = useNavigate();

  const { currentUser } = useContext(AuthContext);

  const handleNavigateToPost = () => {
    navigate(`/post/${post.post_id}`);
  };

  useEffect(() => {
    if (post.isDummy) return; // Skip fetching for dummy posts

    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8386/api/comments/post/${post.post_id}`
        );
        setApiComments(response.data.data); // Store API posts
        console.log(response.data);
      } catch (err) {
        setError(err.message); // Handle any errors
      }
    };

    fetchComments();
  }, [post.post_id]);

  const handleAddComment = async (content) => {
    console.log("NỘI DUNG CONTENT: ", content);
    content.userId = "c8029506-4377-4399-9931-8fe279cb1159";

    try {
      content.user = currentUser;
      console.log(currentUser);
      content.createdAt = "Vừa xong";
      const response = await axios.post(
        `http://localhost:8386/api/comments/post/${post.post_id}`,
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

  // Handle fallback for dummy vs. API posts
  const user = Users.find((u) => u.id === post.userId) || post.author || {};
  const profilePicture = user.profilePicture || user.avatar || "";
  const username = user.username || user.name || "Unknown User";
  const date = post.date || post.createdAt || "Just now";
  const photo = post.photo || post.avatar || "";

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop"
          onClick={handleNavigateToPost}
          style={{ cursor: "pointer" }}>
          <div className="postTopLeft">
            <img src={profilePicture} alt="" className="postProfileImg" />
            <span className="postUsername">{username}</span>
            <span className="postDate">{date}</span>
          </div>
          <div className="postTopRight">
            <IconButton>
              <MoreVert className="postVertButton" />
            </IconButton>
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post.title}</span>
          {photo && <img src={photo} alt="" className="postImg" />}
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <Favorite className="bottomLeftIcon" style={{ color: "red" }} />
            <ThumbUp className="bottomLeftIcon" style={{ color: "#011631" }} />
            <span className="postLikeCounter">
              {post.like || post.like_count}
            </span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">
              {post.comment || apiComments?.length || 0} Comments
            </span>
          </div>
        </div>

        <hr className="footerHr" />
        <div className="postBottomFooter">
          <div className="postBottomFooterItem" onClick={handleLike}>
            <ThumbUpAltOutlined className="footerIcon" />
            <span className="footerText">Like</span>
          </div>
          <div
            className="postBottomFooterItem"
            onClick={() => handleNavigateToPost()}
          >
            <ChatBubbleOutline className="footerIcon" />
            <span className="footerText">Comment</span>
          </div>
          <div className="postBottomFooterItem">
            <ShareOutlined className="footerIcon" />
            <span className="footerText">Share</span>
          </div>
        </div>
      </div>
      {/* {commentBoxVisible && (
        <div className="commentSection">
          <WriteComment
            avatarUrl={currentUser.avatar}
            onSubmit={handleAddComment}
          />
          {console.log("THONG TIN COMMENT TOAN BO:", apiComments)}
          {apiComments && apiComments.length > 0 ? (
            apiComments.map((commentGroup) => (
              <div key={commentGroup[0]?.id} className="commentGroup">
                {commentGroup[0] && (
                  <CommentContent
                    avatarUrl={commentGroup[0].user?.avatar || ""}
                    content={commentGroup[0].content || ""}
                    createdAt={commentGroup[0].createdAt || ""}
                  />
                )}

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
      )} */}
    </div>
  );
};

export default Post;
