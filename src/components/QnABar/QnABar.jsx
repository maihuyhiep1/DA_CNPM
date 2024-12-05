import React, { useState, useEffect } from "react";
import styles from "./style_QnABar.module.css";
import QnA from "../QnA/QnA";

const QnABar = () => {
  const [qnaList, setQnaList] = useState([]);

  useEffect(() => {
    const fetchQnA = async () => {
      try {
        const response = await fetch("http://localhost:8386/api/posts?is_qna=true");
        const data = await response.json();
        setQnaList(data);
      } catch (error) {
        console.error("Error fetching QnA:", error);
      }
    };

    fetchQnA();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.item}>
        {qnaList.map((qna) => (
          <QnA
            key={qna.post_id}
            avatar={qna.author.avatar}
            name={qna.author.name}
            title={qna.title}
            createdAt={qna.createdAt}
          />
        ))}
      </div>
    </div>
  );
};

export default QnABar;
