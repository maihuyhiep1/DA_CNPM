import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import styles from "./style_addQnA.module.css";

const AddQnA = ({ avatar, name }) => {
  const navigate = useNavigate(); // Khởi tạo hook

  // Hàm xử lý khi nhấn vào component
  const handleClick = () => {
    navigate("/create-post", { state: { qna: true } });
  };

  return (
    <div className={styles.addQnACard} onClick={handleClick}>
      <div className={styles.storyOverlay}></div>
      <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Background" className={styles.storyBackground} />
      <img
        src="./assets/person/upload.png"
        alt="Add Story"
        className={styles.storyAdd}
      />
    </div>
  );
};

export default AddQnA;
