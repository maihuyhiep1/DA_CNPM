import React from "react";
import "./Stories.scss";
import StoryCard from "../storyCard/StoryCard";
import { Users } from "../../data";

const Stories = () => {
  return (
    <div className="stories">
      <div className="storyCard">
        <div className="storyOverlay"></div>
        <img
          src="./assets/person/user.jpg"
          alt="User"
          className="storyProfile"
        />
        <img
          src="./assets/person/user.jpg"
          alt="Background"
          className="storyBackground"
        />
        <img
          src="./assets/person/upload.png"
          alt="Add Story"
          className="storyAdd"
        />
        <span className="storyText">Amber</span>
      </div>

      {Users.map((u) => (
        <StoryCard key={u.id} user={u} />
      ))}
    </div>
  );
};

export default Stories;
