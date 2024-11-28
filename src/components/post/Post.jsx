import { useState, useContext, useEffect } from "react";
import "./Post.scss";
import { Users } from "../../data";
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

import { AuthContext } from "../../context/authContext";

import WriteComment from "../writeComment/writeComment";
import axios from "axios";

const Post = ({ post }) => {
  const [commentBoxVisible, setCommentBoxVisible] = useState(false);
  const [apiComments, setApiComments] = useState([]);
  const [error, setError] = useState(null);
  const [like, setLike] = useState(false);

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (post.isDummy) return; // Skip fetching for dummy posts

    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8386/api/comments/post/${post.post_id}`
        );
        console.log(response.data);
        setApiComments(response.data); // Store API posts
      } catch (err) {
        setError(err.message); // Handle any errors
      }
    };

    fetchComments();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleLike = async () => {
    if (post.isDummy) return; // Skip fetching for dummy posts
    try {
      const response = await axios.post(
        `http://localhost:8386/api/posts/${post.post_id}/like`,
        {}, // Body nếu cần
        { withCredentials: true } // Gửi cookie/session
      );
      console.log("Like successful:", response.data);
      setLike(true);
    } catch (error) {
      console.error(
        "Error liking post:",
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
        <div className="postTop">
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
      </div>
      {commentBoxVisible && (
        <div className="commentSection">
          <WriteComment avatarUrl={currentUser.avatar} />
        </div>
      )}
    </div>
  );
};

export default Post;
