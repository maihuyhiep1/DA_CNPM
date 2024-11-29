import { useContext, useEffect, useState } from "react";
import "./Stories.scss";
import StoryCard from "../storyCard/StoryCard";
import { Users } from "../../data";
import { AuthContext } from "../../context/authContext";
import axios from "axios";

const Stories = () => {
  const { currentUser } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);

  // Check if currentUser is null
  if (!currentUser) {
    return (
      <div className="stories">
        <p>You must be logged in to view stories</p>
      </div>
    );
  }

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8386/api/posts?is_qna=true"
        );
        setPosts(response.data);
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
    };

    fetchPosts();
  }, []);

  // Combine dummy users and fetched posts
  const combinedData = [...posts, ...Users]; // Add API posts to the Users array

  return (
    <div className="stories">
      <div className="storyCard">
        <div className="storyOverlay"></div>
        <img src={currentUser.avatar} alt="User" className="storyProfile" />
        <img
          src={currentUser.avatar}
          alt="Background"
          className="storyBackground"
        />
        <img
          src="./assets/person/upload.png"
          alt="Add Story"
          className="storyAdd"
        />
        <span className="storyText">{currentUser.name}</span>
      </div>

      {combinedData.map((item) => (
        <StoryCard
          key={item.id || item.post_id}
          user={{
            profilePicture: item.author?.avatar || item.profilePicture, // Use post's avatar or user's dummy avatar
            username: item.author?.name || item.username, // Use post's author's name or user's dummy username
            postAvatar: item.avatar || item.profilePicture,
          }}
        />
      ))}
    </div>
  );
};

export default Stories;
