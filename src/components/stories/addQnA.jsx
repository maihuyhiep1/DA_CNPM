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
      <img src={avatar} alt="Background" className={styles.storyBackground} />
      <img src={avatar} alt="User" className={styles.storyProfile} />
      <img
        src="./assets/person/upload.png"
        alt="Add Story"
        className={styles.storyAdd}
      />
      <span className={styles.storyText}>{name}</span>
    </div>
  );
};

export default AddQnA;
