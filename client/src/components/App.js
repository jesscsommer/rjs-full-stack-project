import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import SignUpForm from "./SignUpForm";
import LogInForm from "./LogInForm";
import Profile from "./Profile";
import PostsContainer from "./PostsContainer";
// import Nav from "./Nav";

const App = () => {
  const [currentUser, setCurrentUser] = useState([]);
  const [isNavVisible, setIsNavVisible] = useState(false);

  useEffect(() => {
    fetch("/check_session")
    .then(res => {
      if (res.ok) {
        res.json()
        .then(setCurrentUser)
      }
    })
  }, [])

  return (
    <div className="app">
      {/* <Nav /> */}
      <Routes>
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/login" element={<LogInForm />} />
        <Route path="/profile" element={<Profile currentUser={currentUser} />} />
        <Route path="/" element={<PostsContainer currentUser={currentUser} />} />
      </Routes>
    </div>
  );
};

export default App;
