import React from "react";
import styles from "./style_QnA.module.css"; // Correct import for CSS module

const QnA = () => {
  return (
    <div className={styles.background}>
      <div className={styles.qnaImage}>
        <div className={styles.avt} />
          <div className={styles.name}>Fan Mu</div> 
      </div>
    </div>
  );
};

export default QnA;
