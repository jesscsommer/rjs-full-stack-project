import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { useLocation } from "react-router-dom";

import Post from "./Post";
import PostForm from "./PostForm";
import { ImageList } from "@mui/material";

function PostsContainer({
  currentUser,
  posts,
  handlePostDelete,
  handleSubmitPost,
}) {
  const location = useLocation();
  const addMargin = location.pathname === "/profile/:username";

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <ImageList
          className="posts"
          variant="masonry"
          cols={3}
          gap={15}
          sx={{
            marginTop: addMargin ? "305px" : null,
          }}
        >
          {posts?.map((post) => (
            <Post
              key={post.id}
              post={post}
              currentUser={currentUser}
              handlePostDelete={handlePostDelete}
            />
          ))}
        </ImageList>
      </Box>
    </div>
  );
}

export default PostsContainer;
