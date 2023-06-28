import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import SignUpForm from "./SignUpForm";
import LogInForm from "./LogInForm";
import Profile from "./Profile";
import PostsContainer from "./PostsContainer";
import LeftSideBar from "./HeaderBar";
import RightSideBar from "./RightSideBar";
import HeaderBar from "./HeaderBar";

const App = () => {
    const [currentUser, setCurrentUser] = useState([]);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch("/posts")
        .then((r) => r.json())
        .then(setPosts)
        .catch((err) => console.error(err));
    }, []);

  return (
    <div className="app">
      <HeaderBar currentUser={currentUser} />
      <Routes>
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/login" element={<LogInForm />} />
        <Route path="/profile/:username" element={
                <Profile 
                    currentUser={currentUser} />
                } />
        <Route path="/" element={
                <PostsContainer 
                    currentUser={currentUser} 
                    posts={posts} />
                } />
        />
      </Routes>
      {/* <RightSideBar /> */}
    </div>
  );
};


export default App;
