import { useState, useEffect } from "react";
import Post from "./Post";

function PostsContainer() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("/posts")
      .then((r) => r.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error(err));
  });

  return (
    <div className="posts">
      {posts.map((post) => (
        <Post
          key={post.id}
          content={post.content}
          user={post.user_id}
          post={post}
        />
      ))}
    </div>
  );
}

export default PostsContainer;
