import React from "react";
import styles from "./style_repplyCommentContent._.module.css"; // Ensure correct CSS filename
import defaultAvatar from "/img_profile/avt.png"; // Fallback avatar

const RepplyCommentContent = ({ avatarUrl, content, createdAt }) => {
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
      <div className={styles.replyHowLong}>{createdAt}</div>
    </div>
  );
};

export default RepplyCommentContent;
