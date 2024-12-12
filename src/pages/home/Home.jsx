import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./Home.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { AuthContext } from "../../context/authContext";

const Home = ({posts}) => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchUser = async () => {
      const userRes = await axios.get("http://localhost:8386/login-success", {
        withCredentials: true,
      });
      setCurrentUser(userRes.user);
    };

    fetchUser();
  }, []);
  // const { currentUser } = useContext(AuthContext);
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (!currentUser) {
  //     navigate("/login");
  //   }
  // }, [currentUser, navigate]);

  return (
    <div className="homeContainer">
      <Feed posts={posts}/>
    </div>
  );
};

export default Home;
