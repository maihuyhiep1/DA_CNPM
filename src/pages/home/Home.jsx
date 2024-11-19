import React from "react";
import "./Home.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import QnA from "../../components/QnA";

const Home = () => {
  return (
    <div className="homeContainer">
      <Sidebar />
      <Feed />
      <Rightbar />
    </div>
  );
};

export default Home;
