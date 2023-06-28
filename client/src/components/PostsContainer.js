import { useState, useEffect } from "react";
import Box from "@mui/material/Box";

import Post from "./Post";
import PostForm from "./PostForm";

function PostsContainer({ currentUser, posts }) {
  return (
    <div>
      <Box sx={{ display: "flex" }}>
        {currentUser ? <PostForm /> : null}
        <div className="posts">
          {posts?.map((post) => (
            <Post key={post.id} post={post} currentUser={currentUser} />
          ))}
        </div>
      </Box>
    </div>
  );
}

export default PostsContainer;
