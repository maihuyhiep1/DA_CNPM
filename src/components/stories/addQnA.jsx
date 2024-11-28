import React from "react";
import styles from "./style_addQnA.module.css";

const AddQnA = ({ avatar, name }) => {
    return (
      <div className={styles.addQnACard}>
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