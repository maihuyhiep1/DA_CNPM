"use client"
import { useState, useContext, useEffect } from "react";
import "./Post.scss";
import { Users } from "../../data";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import {
  ChatBubbleOutline,
  Favorite,
  MoreVert,
  ShareOutlined,
  ThumbUpAltOutlined,
  ThumbUp,
  Reply,
} from "@mui/icons-material";
import Dropdown from "./dropdown";
import { AuthContext } from "../../context/authContext";

import WriteComment from "../writeComment/writeComment";
import axios from "axios";
import CommentContent from "../commentContent/commentContent";
import RepplyCommentContent from "../replyCommentContent/repplycommentContent";

const Post = ({ post: initialPost }) => {
  const [post, setPost] = useState(initialPost);
  const [commentBoxVisible, setCommentBoxVisible] = useState(false);
  const [apiComments, setApiComments] = useState([]);
  const [error, setError] = useState(null);
  const [like, setLike] = useState(false);

  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // Hàm xử lý chuyển hướng
  const handleNavigateToPost = () => {
    navigate(`/post/${post.post_id}`);
  };

  useEffect(() => {
    if (post.isDummy) return; // Skip fetching for dummy posts

    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8386/api/comments/post/${post.post_id}`,
        );
        console.log(response.data);
        setApiComments(response.data); // Store API posts
      } catch (err) {
        setError(err.message); // Handle any errors
      }
    };

    fetchComments();
  }, [post.post_id]);

  const handleAddComment = async (content) => {
    console.log("NỘI DUNG CONTENT: ", content);
    content.userId = JSON.parse(localStorage.getItem("user")).id;
    try {
      const response = await axios.post(
        `http://localhost:8386/api/comments/post/${post.post_id}`,
        content,
        { withCredentials: true }
      );
      console.log(response);
      const newComment = response.data;
      setApiComments([...apiComments, [newComment]]);
    } catch (err) {
      console.error("Error adding comment:", err.message);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

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
              <Dropdown className="postVertButton" />
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
              {post.comment || apiComments.data?.length || 0} Comments
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
          {apiComments.data.map((commentGroup) => (
            <div key={commentGroup[0].id} className="commentGroup">
              <CommentContent
                key={commentGroup[0].id}
                avatarUrl={commentGroup[0].userAvatar}
                content={commentGroup[0].content}
                createdAt={commentGroup[0].createdAt}
              />
              {commentGroup.slice(1).map((reply) => (
                <div key={reply.id} style={{ marginLeft: "20px" }}>
                  <RepplyCommentContent
                    avatarUrl={reply.userAvatar}
                    content={reply.content}
                    createdAt={reply.createdAt}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      )} */}
    </div>
  );
};

export default Post;
