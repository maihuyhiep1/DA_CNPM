import React, { useState, useEffect } from "react";
import "./Feed.scss";
import Stories from "../stories/Stories";
import Post from "../post/Post";
import { Posts as dummyPosts } from "../../data"; // Dummy data
import axios from "axios";

const Feed = () => {
  const [apiPosts, setApiPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:8386/api/posts");
        console.log(response.data);
        setApiPosts(response.data); // Store API posts
      } catch (err) {
        setError(err.message); // Handle any errors
      } finally {
        setLoading(false); // Stop the loading spinner
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Combine dummy posts and API posts
  const allPosts = [...apiPosts, ...dummyPosts];

  return (
    <div className="feed">
      <div className="feedWrapper">
        <Stories />
        {allPosts.map((post) => (
          <Post key={post.id || post.post_id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
