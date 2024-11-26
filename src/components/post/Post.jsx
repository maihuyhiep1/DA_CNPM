import React, { useState } from "react";
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
} from "@mui/icons-material";

const Post = ({ post }) => {
  const [commentBoxVisible, setCommentBoxVisible] = useState(false);

  // Handle fallback for dummy vs. API posts
  const user = Users.find((u) => u.id === post.userId) || post.author || {};
  const profilePicture = user.profilePicture || user.avatar || "";
  const username = user.username || user.name || "Unknown User";
  const date = post.date || post.createdAt || "Just now";

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
          {post.photo && <img src={post.photo} alt="" className="postImg" />}
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <Favorite className="bottomLeftIcon" style={{ color: "red" }} />
            <ThumbUp className="bottomLeftIcon" style={{ color: "#011631" }} />
            <span className="postLikeCounter">{post.like || 0}</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">
              {post.comment || 0} Comments
            </span>
          </div>
        </div>

        <hr className="footerHr" />
        <div className="postBottomFooter">
          <div className="postBottomFooterItem">
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
        <form className="commentBox">
          <textarea
            className="commentInput"
            type="text"
            placeholder="Write a comment ..."
            rows={1}
            style={{ resize: "none" }}
          />
          <button type="submit" className="commentPost">
            Comment
          </button>
        </form>
      )}
    </div>
  );
};

export default Post;
