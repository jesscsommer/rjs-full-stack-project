import { useState, useEffect } from "react";
import Post from "./Post";

function PostsContainer() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("/posts")
      .then((r) => r.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error(err));
  }, []);
  // console.log(posts.map(post => console.log(post.content)))
  return (
    <div className="posts">
      {posts.map((post) => (
        <Post
          key={post.id}
          content={post.content}
          user={post.user.username}
          post_likes={post.post_likes}
          post_id={post.post_id}
        />
      ))}
    </div>
  );
}

export default PostsContainer;
