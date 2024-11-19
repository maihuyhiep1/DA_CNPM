import React from "react";
import "./StoryCard.scss";

const StoryCard = ({ user }) => {
  return (
    <div className="storyCard">
        <div className="storyOverlay"></div>
      <img src={user.profilePicture} alt="User" className="storyProfile" />
      <img src={user.profilePicture} alt="Background" className="storyBackground" />
      <span className="storyText">{user.username}</span>
    </div>
  );
};

export default StoryCard;
