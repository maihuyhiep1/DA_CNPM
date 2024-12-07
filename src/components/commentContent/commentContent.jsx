import React, { useRef, useEffect, useState, useContext } from "react";
import styles from "./style_commentContent_.module.css"; // Ensure correct CSS filename
import defaultAvatar from "/img_profile/avt.png"; // Fallback avatar
import WriteComment from "../writeComment/writeComment";
import { AuthContext } from "../../context/authContext";
import axios from 'axios';

const CommentContent = ({ avatarUrl, content, createdAt, onReply, parrentId, postId }) => {
  const [showReply, setShowReply] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const onpeReply = () => {
    setShowReply((prev) => !prev);
  }

  const handleReply = () => {
    onReply({content: content, commentId: parrentId, postId: postId}); // Call parent reply logic if needed
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
      <div className={styles.like} onClick={onpeReply}>
        <div className={styles.writeReplyButton}>Phản hồi</div>
        <div className={styles.replyHowLong}>{createdAt}</div>
      </div>
      {showReply && (
        <WriteComment
          avatarUrl={currentUser.avatar}
          onSubmit={handleReply}
        />
      )}
    </div>
  );
};

export default CommentContent;
