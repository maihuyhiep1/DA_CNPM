import React, { useRef, useEffect, useState } from "react";
import styles from "./style_commentContent_.module.css"; // Ensure correct CSS filename
import defaultAvatar from "/img_profile/avt.png"; // Fallback avatar

const CommentContent = ({ avatarUrl, content, createdAt, onReply }) => {
  const [showReply, setShowReply] = useState(false);

  const handleReply = () => {
    setShowReply((prev) => !prev); // Toggle the reply component
    if (onReply) onReply(); // Call parent reply logic if needed
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
        <div className={styles.replySection}>
          Reply input or component goes here
        </div>
      )}
    </div>
  );
};

export default CommentContent;
