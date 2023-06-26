import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";

const App = () => {
  return (
    <>
      <SignUpForm />
      <SignInForm />
    </>
  )
}

export default App;
