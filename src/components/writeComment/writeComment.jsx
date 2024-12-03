import React, { useRef, useEffect, useState, useContext } from "react";
import styles from "./style_writeComment.module.css";
import { AuthContext } from "../../context/authContext";

const WriteComment = ({
  placeholder = "Nhập nội dung...",
  onSubmit,
  showCommentResponse = false, // Default is false
  responseContent = "Phản hồi", // Default response content
  commentId
}) => {
  const inputRef = useRef(null);
  const [value, setValue] = useState("");
  const { currentUser } = useContext(AuthContext);

  const autoResize = () => {
    const input = inputRef.current;
    if (input) {
      input.style.height = "auto"; // Reset height
      input.style.height = `${input.scrollHeight}px`; // Adjust height based on content
    }
  };

  useEffect(() => {
    autoResize(); // Ensure size updates on mount
    console.log("NỘI DUNG COMMENT LA:", value);
  }, [value]);

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form reload
    if (onSubmit && value.trim()) {
      const commentObject = {
        content: value,
        commentId: null || commentId, // Default value
        userId: currentUser.id,
      };
      onSubmit(commentObject); // Pass the comment object to the parent component
      setValue(""); // Clear the input
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <img src={currentUser.avatar} alt="Avatar" className={styles.avatar} />
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
