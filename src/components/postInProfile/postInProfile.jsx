import React, { useContext, useState, useEffect } from 'react';
import styles from './style_postInProfile.module.css';
import { AuthContext } from "../../context/authContext";
import Post from "../post/Post";
import axios from 'axios';


const PostInProfile = () => {
  const [allPosts, setAllPosts] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8386/api/users/${currentUser.id}/posts`
        );
        console.log("LẤY THÔNG TIN POST:", response.data);
        setAllPosts(response.data); // Store API posts
      } catch (err) {
        setError(err.message); // Handle any errors
      } 
    };

    fetchPosts();
  }, []);

  return (

    <div className={styles.pos}>
      {allPosts.map((post) => (
        <Post key={post.id || post.post_id} post={post} />
      ))}
    </div>
  );
};

export default PostInProfile;
