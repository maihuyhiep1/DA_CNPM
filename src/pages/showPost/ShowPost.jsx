import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const ShowPost = () => {
  const location = useLocation(); // Get the location object that includes the state
  const [post, setPost] = useState(location.state?.post || {});
  const [error, setError] = useState(null);

  console.log("THONG TIN POST:", post);

  useEffect(() => {
    // If no post is passed via state, fetch from the API
    if (post.post_id) {
      const fetchPost = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8386/api/posts/${post.post_id}`,
            {},
            { withCredentials: true }
          );
          console.log("RESPONSE:", response);
          setPost(response.data);
        } catch (error) {
          setError("Error fetching post data");
        }
      };

      fetchPost();
    }
  }, [post]);

  if (error) return <div>{error}</div>;
  console.log("THONG TIN CHI TIET POST:", post);

  return (
    <div className="showPost">
      <h1>{post.title}</h1>
      {post.avatar && <img src={post.avatar} alt="Post Avatar" />}
      <div>{post.content}</div>
    </div>
  );
};

export default ShowPost;
