import React, { useState, useEffect } from "react";
import styles from "./style_feed.module.css";
import Stories from "../stories/Stories";
import Post from "../post/Post";
import { Posts as dummyPosts } from "../../data"; // Dummy data
import axios from "axios";

const Feed = ({ posts }) => {
  const [apiPosts, setApiPosts] = useState([]);
  const [loading, setLoading] = useState(posts.length === 0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8386/api/posts?is_qna=false"
        );
        console.log("LẤY THÔNG TIN POST:", response.data);
        setApiPosts(response.data); // Store API posts
        setLoading(false);
      } catch (err) {
        setError(err.message); // Handle any errors
      } finally {
        setLoading(false); // Stop the loading spinner
      }
    };

    if(posts.length === 0) fetchPosts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Combine dummy posts, API posts, and props posts
  const allPosts = [...posts, ...apiPosts];

  return (
    <div className={styles.feed}>
      <div className={styles.text}> QnA hay phết</div>
      <div className={styles.text2}> Xem tất cả</div>
      <div className={styles.feedWrapper}>
        <div className={styles.str}>
          <Stories />
        </div>
        <div className={styles.pos}>
          {allPosts.map((post) => (
            <Post
              key={post.id || post.post_id} // Ensure unique key
              post={post} // Pass the entire post object
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Feed;
