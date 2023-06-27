import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";
import Profile from "./Profile";
import PostForm from "./PostForm"

const App = () => {
  return(
    <>
      {/* <SignUpForm />
      <SignInForm />
      <Profile /> */}
      <PostForm />
    </>
  )
}

export default App;
