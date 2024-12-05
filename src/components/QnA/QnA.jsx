import React from "react";
import styles from "./style_QnA.module.css";

const QnA = ({ avatar, name, title, createdAt }) => {
  return (
    <div className={styles.background}>
      <div className={styles.qnaImage}>
        <img src={avatar} alt="avatar" className={styles.avt} />
        <div>
          <div className={styles.name}>{name}</div>
          <div className={styles.title}>{title}</div>
          <div className={styles.createdAt}>{createdAt}</div>
        </div>
      </div>
    </div>
  );
};

export default QnA;
