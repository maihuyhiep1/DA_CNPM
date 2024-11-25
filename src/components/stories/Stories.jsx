import React, { useContext } from "react";
import "./Stories.scss";
import StoryCard from "../storyCard/StoryCard";
import { Users } from "../../data";
import { AuthContext } from "../../context/authContext";

const Stories = () => {
  const { currentUser } = useContext(AuthContext);

  // Check if currentUser is null
  if (!currentUser) {
    return (
      <div className="stories">
        <p>You must be logged in to view stories</p>
      </div>
    );
  }

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

      {Users.map((u) => (
        <StoryCard key={u.id} user={u} />
      ))}
    </div>
  );
};

export default Stories;
