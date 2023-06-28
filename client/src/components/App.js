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

  useEffect(() => {
    fetch("/check_session").then((res) => {
      if (res.ok) {
        res.json().then(setCurrentUser);
      }
    });
  }, []);

  return (
    <div className="app">
      <HeaderBar currentUser={currentUser} />
      <Routes>
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/login" element={<LogInForm />} />
        <Route
          path="/profile"
          element={<Profile currentUser={currentUser} />}
        />
        <Route
          path="/"
          element={<PostsContainer currentUser={currentUser} />}
        />
      </Routes>
      {/* <RightSideBar /> */}
    </div>
  );
};

export default App;
