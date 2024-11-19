import React from "react";
import "./Home.scss";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";

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
