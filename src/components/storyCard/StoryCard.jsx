import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./style_storyCard.module.css";

const StoryCard = ({ user, postId }) => {
  const navigate = useNavigate();

  // Hàm xử lý khi người dùng nhấn vào card
  const handleClick = () => {
    navigate(`/post/${postId}`);
  };

  return (
    <div className={styles.storyCard} onClick={handleClick}>
      <img src={user.backgroundPicture} alt="Background" className={styles.storyBackground} />
      <img src={user.profilePicture} alt="User" className={styles.storyProfile} />
      <span className={styles.storyText}>{user.username}</span>
    </div>
  );
};

export default StoryCard;
