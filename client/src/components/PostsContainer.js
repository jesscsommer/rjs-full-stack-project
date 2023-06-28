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
          post={post}
          currentUser = {currentUser}
        />
      )}
    </div>
    </>
  );
}

export default PostsContainer;
