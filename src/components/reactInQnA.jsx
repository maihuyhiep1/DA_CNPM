import React from "react";
import styles from "./style_reactBarInQnA.module.css"; // Importing CSS module

const ReactBarQnA = () => {
  return (
    <div className={styles.frameContainer}>
      <button className={styles.commentButton}>
        <img
          className={styles.commentIcon}
          alt="Comment Icon"
          src="/img_reactIcon/comment.png"
        />
        <div className={styles.commentText}>Bình luận</div>
      </button>
      <button className={styles.likeButton}>
        <img
          className={styles.likeIcon}
          alt="Like Icon"
          src="/img_reactIcon/like.png"
        />
        <div className={styles.likeText}>Thích</div>
      </button>
      <button className={styles.shareButton}>
        <img
          className={styles.shareIcon}
          alt="Share Icon"
          src="/img_reactIcon/share.png"
        />
        <div className={styles.shareText}>Chia sẻ</div>
      </button>
    </div>
  );
};

export default ReactBarQnA;
