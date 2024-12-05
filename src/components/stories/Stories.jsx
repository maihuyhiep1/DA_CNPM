import React, { useContext, useEffect, useState } from "react";
import styles from "./style_stories.module.css";
import StoryCard from "../storyCard/StoryCard";
import { AuthContext } from "../../context/authContext";
import AddQnA from "./addQnA";

const Stories = () => {
  const { currentUser } = useContext(AuthContext);

  // State để lưu danh sách story
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch stories từ API
  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await fetch("http://localhost:8386/api/posts?is_qna=true");
        const data = await response.json();
        console.log(data);
        setStories(data);
      } catch (error) {
        console.error("Error fetching stories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  // Hiển thị thông báo khi chưa đăng nhập
  if (!currentUser) {
    return (
      <div className={styles.container}>
        <p>You must be logged in to view stories</p>
      </div>
    );
  }

  // Hiển thị thông báo khi đang load dữ liệu
  if (loading) {
    return (
      <div className={styles.container}>
        <p>Loading stories...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.item}>
        {/* Add QnA Button */}
        <AddQnA avatar={currentUser.avatar} name={currentUser.name} />

        {/* Render danh sách story */}
        {stories.map((story) => (
          <StoryCard
            key={story.post_id}
            user={{
              profilePicture: story.author.avatar,
              backgroundPicture: story.avatar,
              username: story.author.name,
            }}
            postId={story.post_id} // Truyền postId cho StoryCard
          />
        ))}
      </div>
    </div>
  );
};

export default Stories;
