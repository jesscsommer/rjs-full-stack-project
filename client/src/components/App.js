import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";
import Profile from "./Profile";
import PostsContainer from "./PostsContainer";
import LeftSideBar from "./LeftSideBar";
import RightSideBar from "./RightSideBar";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="app">
      {/* <LeftSideBar isLoggedIn={isLoggedIn}/> */}
      <Routes>
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/login" element={<SignInForm />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<PostsContainer />} />
      </Routes>
      {/* <RightSideBar /> */}
    </div>
  );
};

export default App;
