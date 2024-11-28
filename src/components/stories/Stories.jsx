import React, { useContext } from "react";
import styles from "./style_stories.module.css";
import StoryCard from "../storyCard/StoryCard";
import { Users } from "../../data";
import { AuthContext } from "../../context/authContext";
import AddQnA from "./addQnA";
import QnA from "../Qna/QnA"
const Stories = () => {
  const { currentUser } = useContext(AuthContext);

  // Check if currentUser is null
  if (!currentUser) {
    return (
      <div className={styles.container}>
        <p>You must be logged in to view stories</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
          <div className={styles.item}>
      <AddQnA avatar={currentUser.avatar} name={currentUser.name} />
      {Users.map((u) => (
        <StoryCard key={u.id} user={u} />
      ))}
          </div>

    </div>
  );
};

export default Stories;
