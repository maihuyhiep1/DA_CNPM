import React from "react";
import styles from "./style_QnAContent.module.css";
import WriteComment from "../writeComment/writeComment";
import ReplyComment from "../writeComment/repplyComment";
import QnAAuthor from "./QnAAuthor";
import Content from "./Content";
import Bar from "./Bar"
import CommentContent from "../commentContent/commentContent";
import RepplyCommentContent from "../commentContent/repplycommentContent";
const QnAContent = () => {
  return (
    <div className={styles.QnAContent}>
        <div className= {styles.img}>  this is img</div>
        <div className= {styles.content}>  
            <QnAAuthor/>
            <Content/>
            <Bar/>
          <div className={styles.comment}>
          <WriteComment/>
          <CommentContent/> 
          <RepplyCommentContent/>         
          </div>

        </div>
    </div>
  );
};

export default QnAContent;
