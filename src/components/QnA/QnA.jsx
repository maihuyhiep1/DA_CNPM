import React from "react";
import styles from "./style_QnA.module.css";

const QnA = ({ avatar, name, title, createdAt }) => {
  console.log("QNA!!!!");
  return (
    <div className={styles.background}>
      <div className={styles.qnaImage}>
        {styles.avt ? <img src={avatar} alt="avatar" className={styles.avt} />:<div className={styles.name}>{name}</div>}
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
