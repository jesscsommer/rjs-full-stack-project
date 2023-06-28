import { useState, useEffect } from "react";
import Post from "./Post";
import PostForm from "./PostForm";

function PostsContainer({ currentUser, posts }) {

  return (
    <>
      {currentUser ? <PostForm /> : null}
      <div className="posts">
      {posts?.map(post => 

        <Post
          key={post.id}
          content={post.content}
          user={post.user.username}
          post_likes={post.post_likes}
          post_id={post.post_id}
          post={post}
        />
      )}
    </div>
    </>
  );
}

export default PostsContainer;
