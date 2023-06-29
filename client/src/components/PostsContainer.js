import { useState, useEffect } from "react";
import Box from "@mui/material/Box";

import Post from "./Post";
import PostForm from "./PostForm";
import { ImageList } from "@mui/material";

function PostsContainer({ currentUser, posts, handlePostDelete, handleSubmitPost}) {
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {currentUser ? <PostForm handleSubmitPost={handleSubmitPost}/> : null}

        <ImageList className="posts" variant="masonry" cols={3} gap={15}>
          {posts?.map((post) => (
            <Post key={post.id} post={post} currentUser={currentUser} handlePostDelete={handlePostDelete}/>
          ))}
        </ImageList>
      </Box>
    </div>
  );
}

export default PostsContainer;
