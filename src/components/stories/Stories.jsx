import React from "react";
import "./Stories.scss";

const Stories = () => {
  return (
    <div className="stories">
      <div className="storyCard">
        <img src="/asset/person/user.jpg" alt="User" className="storyProfile" />
        <img
          src="/asset/person/user.jpg"
          alt="Background"
          className="storyBackground"
        />
        <img
          src="/asset/person/upload.png"
          alt="Add Story"
          className="storyAdd"
        />
        <span className="storyText">Amber</span>
      </div>
    </div>
  );
};

export default Stories;
