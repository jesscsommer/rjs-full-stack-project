import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { useLocation } from "react-router-dom";

import Post from "./Post";
import PostForm from "./PostForm";
import { ImageList } from "@mui/material";
import { v4 as uuid } from "uuid";

const PostsContainer = ({
  currentUser,
  posts,
  handlePostDelete,
  handleSubmitPost,
  updateProfileUser
}) => {
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
              key={uuid()}
              post={post}
              currentUser={currentUser}
              handlePostDelete={handlePostDelete}
              updateProfileUser={updateProfileUser}
            />
          ))}
        </ImageList>
      </Box>
    </div>
  );
}

export default PostsContainer;
