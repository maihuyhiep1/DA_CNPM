import React from "react";
import styles from "./style_QnAAuthor.module.css";
import WriteComment from "../writeComment/writeComment";
import ReplyComment from "../writeComment/repplyComment";
import Avatar from '@atlaskit/avatar';

const QnAAuthor = () => {
  return (
    <div className={styles.container}>
       <div className={styles.avt}>
        <Avatar/>
        <div className={styles.name}>
            Mai Huy Hiep
        </div>
       </div>
       <div className={styles.time}>
        50 min
       </div>
        <button className={styles.button}> Báo cáo</button>
    </div>
  );
};

export default QnAAuthor;
