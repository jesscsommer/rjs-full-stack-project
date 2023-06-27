import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import SignUpForm from "./SignUpForm";
import SignInForm from "./LogInForm";
import Profile from "./Profile";
import PostsContainer from "./PostsContainer";
// import Nav from "./Nav";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState([]);
  const [isNavVisible, setIsNavVisible] = useState(false);

  return (
    <div className="app">
      {/* <Nav /> */}
      <Routes>
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/login" element={<SignInForm />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<PostsContainer />} />
      </Routes>
    </div>
  );
};

export default App;
