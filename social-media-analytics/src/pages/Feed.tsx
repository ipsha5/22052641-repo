import React, { useEffect, useState } from "react";
import axios from "axios";

interface Post {
  id: number;
  userid: number;
  content: string;
}

const Feed: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const usersResponse = await axios.get("/evaluation-service/users"); // Fixed URL
        const users = usersResponse.data.users;
        
        if (!users) throw new Error("No users found");
        
        const postPromises = Object.keys(users).map((userId) =>
          axios.get(`/evaluation-service/users/${userId}/posts`) // Fixed URL
        );

        const postsResponses = await Promise.all(postPromises.map(p => p.catch(() => null))); // Ignore failed requests
        let allPosts: Post[] = [];

        postsResponses.forEach((response) => {
          if (response && response.data.posts) {
            allPosts = [...allPosts, ...response.data.posts];
          }
        });

        setPosts(allPosts.sort((a, b) => b.id - a.id));
        setLoading(false);
      } catch (e) {
        console.error("Error fetching posts:", e);
        setLoading(false);
      }
    };

    fetchPosts();
    const interval = setInterval(fetchPosts, 10000); // Fetch new posts every 10 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h2>Live Feed</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id} style={{ border: "1px solid #ddd", padding: "10px", marginBottom: "10px", borderRadius: "5px" }}>
              <p><strong>User {post.userid}:</strong> {post.content}</p>
            </div>
          ))
        ) : (
          <p>No posts available.</p>
        )
      )}
    </div>
  );
};

export default Feed;
