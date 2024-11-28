import React from "react";
import styles from "./style_storyCard.module.css";

const StoryCard = ({ user }) => {
  return (
    <div className={styles.storyCard}>
      <img src={user.profilePicture} alt="Background" className={styles.storyBackground} />
      <img src={user.profilePicture} alt="User" className={styles.storyProfile} />
      <span className={styles.storyText}>{user.username}</span>
    </div>
  );
};

export default StoryCard;
