import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import SignUpForm from "./SignUpForm";
import LogInForm from "./LogInForm";
import Profile from "./Profile";
import PostsContainer from "./PostsContainer";
import HeaderBar from "./HeaderBar";
import Error404 from "./Error404";
import PostForm from "./PostForm";
import SuccessfulDelete from "./SuccessfulDelete";

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("/api/v1/check_session").then((res) => {
      if (res.ok) {
        res.json().then(setCurrentUser);
      }
    });
  }, []);

  useEffect(() => {
    fetch("/api/v1/posts")
      .then((r) => r.json())
      .then(setPosts)
      .catch((err) => console.error(err));
  }, []);

  const handleSetPosts = () => {
    fetch("/api/v1/posts")
      .then((r) => r.json())
      .then(setPosts)
      .catch((err) => console.error(err));
  };

  const handlePostDelete = (id) => {
    fetch(`/api/v1/posts/${id}`, {
      method: "DELETE",
    }).then(setPosts((current) => current.filter((item) => item.id !== id)));
  };

  const handleSubmitPost = (data) => {
    setPosts((current) => [data, ...current]);
  };

  const updateCurrentUser = (updated_user) => {
    setCurrentUser(updated_user);
  };

  return (
    <div className="app">
      <HeaderBar
        currentUser={currentUser}
        updateCurrentUser={updateCurrentUser}
      />
      <Routes>
        <Route
          path="/signup"
          element={
            <SignUpForm
              currentUser={currentUser}
              updateCurrentUser={updateCurrentUser}
            />
          }
        />
        <Route
          path="/login"
          element={
            <LogInForm
              currentUser={currentUser}
              updateCurrentUser={updateCurrentUser}
            />
          }
        />
        <Route
          path="/profile/:username"
          element={
            <Profile
              currentUser={currentUser}
              updateCurrentUser={updateCurrentUser}
              handlePostDelete={handlePostDelete}
            />
          }
        />
        <Route path="/account_deletion" element={<SuccessfulDelete />} />
        <Route
          path="/"
          element={
            currentUser ? (
              [
                <PostForm handleSubmitPost={handleSubmitPost} />,
                <PostsContainer
                  currentUser={currentUser}
                  posts={posts}
                  handlePostDelete={handlePostDelete}
                  handleSubmitPost={handleSubmitPost}
                />,
              ]
            ) : (
              <PostsContainer
                currentUser={currentUser}
                posts={posts}
                handlePostDelete={handlePostDelete}
                handleSubmitPost={handleSubmitPost}
              />
            )
          }
        />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </div>
  );
};

export default App;
