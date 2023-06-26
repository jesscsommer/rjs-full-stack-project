import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";
import Profile from "./Profile";

const App = () => {
  return(
    <>
      <SignUpForm />
      <SignInForm />
      <Profile />
    </>
  )
}

export default App;
