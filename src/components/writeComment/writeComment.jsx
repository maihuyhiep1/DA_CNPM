import React, { useRef, useEffect, useState } from "react";
import styles from "./style_writeComment.module.css"; // Ensure correct file path

const WriteComment = ({
  placeholder = "Nhập nội dung...",
  onSubmit,
  avatarUrl,
  showCommentResponse = false, // Default is false
  responseContent = "Phản hồi", // Default response content
}) => {
  const inputRef = useRef(null);
  const [value, setValue] = useState("");

  const autoResize = () => {
    const input = inputRef.current;
    if (input) {
      input.style.height = "auto"; // Reset height
      input.style.height = `${input.scrollHeight}px`; // Adjust height based on content
    }
  };

  useEffect(() => {
    autoResize(); // Ensure size updates on mount
    console.log("NỘI DUNG COMMENT:", value);
  }, [value]);

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form reload
    if (onSubmit && value.trim()) {
      const commentObject = {
        content: value,
        commentId: null, // Default value
      };
      onSubmit(commentObject); // Pass the comment object to the parent component
      setValue(""); // Clear the input
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <img src={avatarUrl} alt="Avatar" className={styles.avatar} />
      <div className={styles.textAreaWrapper}>
        <textarea
          ref={inputRef}
          className={styles.autoExpandInput}
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)} // Update state on input change
          onInput={autoResize}
        />
        <button type="submit" className={styles.submitButton}>
          <div className={styles.sendLabel}>Gửi</div>
        </button>
      </div>
      {showCommentResponse && ( // Conditional rendering based on prop
        <div className={styles.commentRes}>
          <p>{responseContent}</p>
        </div>
      )}
    </form>
  );
};

export default WriteComment;
