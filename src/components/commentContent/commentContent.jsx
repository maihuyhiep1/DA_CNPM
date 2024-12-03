import React, { useRef, useEffect, useState } from "react";
import styles from "./style_commentContent_.module.css";
import defaultAvatar from "/img_profile/avt.png";
import WriteComment from "../writeComment/writeComment";
import axios from "axios"; // If you're making API calls to submit the reply

const CommentContent = ({
  avatarUrl,
  content,
  createdAt,
  commentId,
  onReply,
  post_id,
}) => {
  const [showReply, setShowReply] = useState(false);
  const [replies, setReplies] = useState([]); // Track replies locally

  const handleReply = () => {
    setShowReply((prev) => !prev);
    if (onReply) onReply();
  };

  const handleSubmitReply = async (content) => {
    console.log("NOI DUNG CUA REPLY COMMENT", content);
    console.log(`http://localhost:8386/api/comments/post/${post_id}`);
    try {
      const response = await axios.post(
        `http://localhost:8386/api/comments/post/${post_id}`,
        content,
        { withCredentials: true }
      );
      console.log("NOI DUNG CUA REPLY COMMENT", response.data.data);
      const newReply = response.data.data;

      setReplies((prevReplies) => [...prevReplies, newReply]);
      setShowReply(false);
    } catch (err) {
      console.error("Error adding reply:", err.message);
    }
  };
  return (
    <div className={styles.bigContainer}>
      <div className={styles.container}>
        <img
          src={avatarUrl || defaultAvatar}
          alt="Avatar"
          className={styles.avatar}
        />
        <div className={styles.textAreaWrapper}>
          <p className={styles.contentText}>{content}</p>
        </div>
      </div>
      <div className={styles.like} onClick={handleReply}>
        <div className={styles.writeReplyButton}>Phản hồi</div>
        <div className={styles.replyHowLong}>{createdAt}</div>
      </div>
      {showReply && (
        <div className={styles.replySection} style={{ marginLeft: "20px" }}>
          <WriteComment
            onSubmit={handleSubmitReply} // Pass the reply submission handler
            placeholder="Viết phản hồi..." // Customize the placeholder
            avatarUrl={avatarUrl || defaultAvatar} // Pass the avatar URL for the reply
            showCommentResponse={false} // No response section for replies
            commentId={commentId}
          />
        </div>
      )}
      {replies.length > 0 && (
        <div className={styles.repliesSection}>
          {replies.map((reply) => (
            <div key={reply.id} className={styles.replyItem}>
              <img
                src={reply?.user?.avatar || defaultAvatar}
                alt="Reply Avatar"
                className={styles.replyAvatar}
              />
              <p className={styles.replyContent}>{reply.content}</p>
              <div className={styles.replyDate}>{reply.createdAt}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentContent;
